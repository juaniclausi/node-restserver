const express = require('express');

const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

const app = express();

const Producto = require('../models/producto');


// ==============================
// Obtener Productos
// ==============================

app.get('/producto', verificaToken, (req, res) => {
    // trae todos los producto
    // populate: usuario categoria
    // paginado

    let desde = req.query.desde || 0;
    desde = Number(desde);

    Producto.find({ disponible: true })
        .sort('nombre')
        .skip(desde)
        .limit(5)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, producto) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Producto.countDocuments({ disponible: true }, (err, conteo) => {

                Producto.countDocuments({ disponible: false }, (err, conteos) => {
                    res.json({
                        ok: true,
                        message: 'Producto encontrado: ',
                        producto,
                        totalDisponibles: conteo,
                        totalNoDisponibles: conteos


                    });
                });
            });
        });
});

// ==============================
// Obtener Producto por id
// ==============================

app.get('/producto/:id', verificaToken, (req, res) => {
    // trae un producto por id
    // populate: usuario categoria
    let id = req.params.id;

    Producto.findById(id)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productoDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!productoDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'ID no existe'
                    }
                });
            }

            res.json({
                ok: true,
                producto: productoDB,
                message: 'Producto encontrado'
            });

        });
});

// ==============================
// Buscar productos
// ==============================

app.get('/producto/buscar/:termino', verificaToken, (req, res) => {

    let termino = req.params.termino;

    let regex = new RegExp(termino, 'i');

    Producto.find({ nombre: regex })
        .populate('categoria', 'descripcion')
        .exec((err, productos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.status(201).json({
                ok: true,
                producto: productos
            });
        });
});



// ==============================
// Crear un nuevo Producto
// ==============================

app.post('/producto', [verificaToken, verificaAdmin_Role], (req, res) => {
    // grabar el usuario
    // grabar una categoria del listado

    let body = req.body;
    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria,
        usuario: req.usuario._id
    });

    producto.save((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!producto) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Producto no creado'
                }
            });
        }

        res.status(201).json({
            ok: true,
            producto: productoDB,
            message: 'Producto Creado'
        });
    });

});

// ==============================
// Actualizar un Producto
// ==============================

app.put('/producto/:id', verificaToken, (req, res) => {
    // grabar el usuario
    // grabar una categoria del listado
    // paginado

    let id = req.params.id;
    let body = req.body;

    Producto.findById(id, (err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no existe'
                }
            });
        }

        productoDB.nombre = body.nombre;
        productoDB.precioUni = body.precioUni;
        productoDB.categoria = body.categoria;
        productoDB.disponible = body.disponible;
        productoDB.descripcion = body.descripcion;

        productoDB.save((err, productoGuardado) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                producto: productoGuardado,
                message: 'Producto Actualizado'
            });

        });

    });
});

// ==============================
// Eliminar un Producto
// ==============================

app.delete('/producto/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
    // disponible: false
    // grabar una categoria del listado

    let id = req.params.id;

    Producto.findById(id, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El producto no existe'
                }
            });
        }

        productoDB.disponible = false;

        productoDB.save((err, productoBorrado) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                producto: productoBorrado,
                message: 'Producto Borrado'
            });
        });
    });

});

module.exports = app;
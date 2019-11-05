// =========================================
//    PUERTO
// =========================================

process.env.PORT = process.env.PORT || 3000;


// =========================================
//    ENTORNO
// =========================================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// =========================================
//    BASE DE DATOS
// =========================================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    // urlDB = 'Aca va la que url que me de el atlas';
    urlDB = 'mongodb+srv://juaniclausi:SIEZjJa2aIyXMcWZ@cluster0-a7ybc.gcp.mongodb.net/test?retryWrites=true&w=majority';
}

process.env.URLDB = urlDB;
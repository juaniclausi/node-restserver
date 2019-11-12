// =========================================
//    PUERTO
// =========================================

process.env.PORT = process.env.PORT || 3000;


// =========================================
//    ENTORNO
// =========================================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// =========================================
//    Vencimiento del Token
// =========================================

// 60 segundos * 60 minutos * 24 horas * 30 dias

process.env.CADUCIDAD_token = '48h';

// =========================================
//    SEED de autenticación
// =========================================

process.env.SEED = process.env.SEED || 'secret';

// =========================================
//    BASE DE DATOS
// =========================================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    // urlDB = 'Aca va la que url que me de el atlas';
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

// ==============================
// Google Client Id
// ==============================

process.env.CLIENT_ID = process.env.CLIENT_ID || '43151423621-82jnk6qao9aehiq61s4o6k1v33qvhs25.apps.googleusercontent.com';
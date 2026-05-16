//primero necesitamos crear un servidor para la aplicacion y ahi mismo montar nuestra base de datos
const http= require('http'); // este es el modulo nativo para cualquier servidor
//el modulo para leer los archivos del sistema
const fs = require('fs');
//el modulo para la ruta a identificar del archivo
const path = require('path');
//modulo nativo para extraer parametros
const url= require('url');

// este modulo lo tenemos que descargar con el comando npm install mysql2
const mysql = require('mysql2');

// configurar el servidor
const PORT = process.env.PORT || 3000;
// vamos a conectarnos a la base de datos
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Cu4dr0z_@17',
    database: '',
    waitForConnections: true, // esperar si hay conexiones disponibles
    connectionLimit: 10, // maximo de conexiones
    queueLimit: 0
})
const MIME_TYPES = {
    'html':'text/html; charset=utf-8',
    'css': 'text/css; charset= utf-8',
    'js': 'application/javascript; charset= utf-8',
    'json': 'application/json; charset= utf-8',
    'png':'image/png',
    'jpg': 'image/jpg',
    'ico': "image/x-icon"

}
// esta funcion se encarga de leer los archivos en la carpeta publica y los envia al navegador
function servirArchivoEstatico(req,res){
    let filePath = req.url === '/'?'/index.html':req.url;

    const fullPath = path.join(__dirname,'public', filePath);
//obtenemos  la extension del archivo para determinar el 
    const ext = path.extname(fullPath);
    const mimeType = MIME_TYPES[ext];

    if(!mimeType){
        res.writeHead(404,{'Content-Type':'text/plain; charset = utf-8'});
        res.end('Archivo no encontrardo');
        return
    }
    //leemos el archivo cuando si existe
    fs.readFile(fullPath,(error,contenido)=>{
        if(error){
        res.writeHead(404,{'Contenet-Type':'text/plain; charset= utf-8'});
        res.end('Archivo no encontrardo');  
        }
        else{
            res.writeHead(200,{'Contenet-Type': mimeType});
            res.end(contenido);
        }
    });
}
//debo crear una promeda de coneccion
const db = pool.promise();
// esto nos permite escribir codigo asincrino que tendra un tiempo de espera para conectarse, proceesarse y dar una respuesta

//debemos de atender cada una de las peticiones que vengan de la carpeta de public
function LeerBody(req){
    return new Promise((resolve,reject)=>{
        let body = '';
        //nosostros vamos a tener un evento que se dispara cada ves que llega un pedazo de los datos 
        req.on('data',(chunk)=> {
            body += chunk.toString();
            //debo verificar el tamaño del body
            if(body.length >1e6){
                req.destroy();
                reject(new Error ('Body demasiado grande'))
            }
        });
        req.on('end',() =>{
            try{
                resolve(JSON.parse(body));
            }catch(e){
                reject(new Error('JSON invalido'))
            }
        })
        req.on('error',reject);
    })
}

//este elemnto nos sirve para dar respuesta 
function enviarJSON(res,status,data){
    res.writeHead(status, {'Content-Type':'application/json; charset = utf-8'})
    res.end(JSON.stringify(data));
}
//recibir todas las peticiones por parte del servidor, get , post, put, delete

const server = http.createServer(async (req, res) => {
    //tenemos que parsear la url
    const parseUrl = url.parse(req.url, true);
    const pathname = parseUrl.pathname;
    const method = req.method;

    //imprimir en el log cada peticion
    console.log(`[${new Date().toLocaleTimeString()}] ${method} ${pathname}`);

    //aqui tenemos que progar cada peticion que se vaya a realizar por parte del usuario

    //si la url no coincide con ninguna de las rutas de la api intentar servir un archivo estatico
    servirArchivoEstatico(req, res);
});

//inicializamos el servidor
server.listen(PORT, () =>{
    console.log('Servidor inicializado en el puerto: ' + PORT);
    console.log('Para salir presiona crtl + c ');
})

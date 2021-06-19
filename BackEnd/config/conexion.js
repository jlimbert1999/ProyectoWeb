const mysql=require('mysql')
const conection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'1234jose',
    database:'dbproyecto'

})
conection.connect((error)=>{
    if(error){
        console.log('Error de conexion con la Base de datos! : ' +error)
        return;
    }
    console.log('Coneccion a la Base de Datos Exitosa!')
})
module.exports=conection //exportamos el modulo para usarlo en cualquier archivo
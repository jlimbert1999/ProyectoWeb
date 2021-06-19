require('./config/conexion')
const express=require('express')
const port=(process.env.port ||3000) //busca el puerto actual, si no usa el 3000

//espress
const app = express()

//permitir datos jason para el postman
app.use(express.json())

//config
app.set('port', port)

//rutas
app.use('/api', require('./admin'))//rutas


//rutas
app.use('/apis/rutas', require('./rutas'))

//buses
app.use('/apis/buses', require('./buses'))

//iniciar express
app.listen(app.get('port'), (error)=>{
    if(error){
        console.log('error al inicar servidor ' + error)
    }
    else{
        console.log('servidor inicado en  ' + port)
    }
})

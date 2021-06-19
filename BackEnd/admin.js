const router=require('express').Router()
const { Router, text } = require('express')
const conexion=require('./config/conexion') //trameos la conexion
const jwt=require('jsonwebtoken');
const bcryptjs=require('bcryptjs')
const nodemailer =require('nodemailer')
const PDF = require('pdfkit');
const fs=require('fs');
const { dirname } = require('path');

//--------asignamos todas las rutas-----------//

//get todos los admins
router.get('/', (req, res)=> {
    let sql='SELECT * FROM admin'
    conexion.query(sql, (err, rows, fields)=> {
        if (err) {
            console.log(err)
        }
        else{
            // console.log(rows.length)
            //console.log(rows[3].password)
            // for(let i=0;i<rows.length;i++){
            //     rows[i].password=Buffer.from(rows[i].password, 'base64').toString('binary')
            // }                            
            res.json(rows)          
        }       
    })
})

//get un admin
router.get('/:id', (req, res)=> {
    const {id}=req.params
    let sql='SELECT * FROM admin WHERE id = ?'
    conexion.query(sql,[id] ,(err, rows, fields)=> {
        if (err) {
            console.log("No se pudo recuperar los datos de los usuarios"+err)
        }
        else{
            rows[0].password=Buffer.from(rows[0].password, 'base64').toString('binary')
            res.json(rows)
           
            
        }       
    })
})

//agregar
router.post('/', async(req, res)=> {
    const {nombre, apellido, nombreus, correo, password}=req.body
    //let passhash=await bcryptjs.hash(password,8)
    let passhash= Buffer.from(password, 'binary').toString('base64')
    let sql=`INSERT INTO admin(nombre, apellido, nombreus, correo, password) values('${nombre}','${apellido}','${nombreus}','${correo}','${passhash}')`
    conexion.query(sql,(err, rows, fields)=> {
        if (err) {
            console.log("no se pudo registrar al usuario "+err)
        }
        else{
            res.json({status:'Usuario aagregado!'})
        }       
    })
})

//eliminar
router.delete('/:id', (req, res)=> {
    const {id}=req.params
    let sql=`DELETE FROM admin WHERE id = '${id}'`
    conexion.query(sql,(err, rows, fields)=> {
        if (err) {
            console.log("No se pudo eliminar al usuario "+err)
        }
        else{
            res.json({status:'Usuario eliminado!'})
        }       
    })
})

router.delete('/', (req, res)=> {
    let sql=`TRUNCATE TABLE admin`
    conexion.query(sql,(err, rows, fields)=> {
        if (err) {
            console.log("No se pudo eliminar los administradores"+err)
        }
        else{
            res.json({status:'Registro de administradores borrados!'})
        }       
    })
})

//actualizar
router.put('/:id', (req, res)=> {
    const {id}=req.params
    const {nombre, apellido, nombreus, correo, password}=req.body
    let passhash= Buffer.from(password, 'binary').toString('base64')
    let sql=`UPDATE admin set 
            nombre='${nombre}',
            apellido='${apellido}',
            nombreus='${nombreus}',
            correo='${correo}',
            password='${passhash}'
            WHERE id = '${id}'`
    conexion.query(sql,(err, rows, fields)=> {
        if (err) {
            console.log("no se pudo actualizar los datos del usuario "+err)
        }
        else{
            res.json({status:'Usuario actualizado!'})
        }       
    })
})

//login
router.post('/singin', (req, res)=>{
    const {nombreus,password}=req.body
    let passhash= Buffer.from(password, 'binary').toString('base64')
    // console.log(passhash)
    conexion.query('SELECT * FROM admin WHERE nombreus = ? AND password = ?',[nombreus,passhash],
    (err, rows, fields)=>{
        if (err) {
            console.log("no se pudo iniciar "+err)
        }
        else{   
            if(rows.length>0){     
                let data=JSON.stringify(rows[0]);
                const token=jwt.sign(data,'stil');
                res.json({token})
            }
            else{
                res.json("Nombre usuario o Passowrd Incorrectos!")
            }
        }   
    })
})

//----------envio de correo congeneracion de PDF
var doc=new PDF()
router.post('/send-email', async(req,res)=>{
    const {nombre, apellido, telefono,cantidad, correo, ci, fecha}=req.body
    crearPDF(nombre, apellido, telefono,cantidad, correo, ci, fecha)
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: 'jos123limbert@gmail.com', // generated ethereal user
          pass: 'smnyfqmbrkuvklpr', // generated ethereal password
        },
      });
      transporter.verify().then(()=>{
          console.log("Correo enviado correctamente")
      })
      const info=await transporter.sendMail({
          from:'"Remitente: " <jos123limbert@gmail.com>',
          to:correo, //correo a quien va dirigido
          subject: 'Factura Compra de boleto',  
          text: `
            Gracias por comprar! :)
            Su Nombre: ${nombre} ${apellido} 
            Su Telefono: ${telefono}`,
        attachments: [{
            filename: 'file.pdf',
            path: __dirname+'/PDF/example.pdf',
            contentType: 'application/pdf'
        }]
      })
      console.log("mensaje enviado", info.messageId)   
})

crearPDF=(nombre, apellido, telefono,cantidad, correo, ci, fecha)=>{
    doc.pipe(fs.createWriteStream(__dirname+'/PDF/example.pdf'))
      doc.text('Factura: Compra de boleto',{
          align:'center'
      })
      var parrafo=`
      Nombre: ${nombre}
      Apellido: ${apellido}
      Numero de CI: ${ci}
      Fecha de nacimiento: ${fecha}
      Numero de Telefono: ${telefono}
      Correo: ${correo}
      Cantidad de boletos Comprados: ${cantidad}
      `
      doc.text(parrafo)
      doc.fontSize(25)
      doc.end()
      console.log("archivo generado")
}

module.exports=router

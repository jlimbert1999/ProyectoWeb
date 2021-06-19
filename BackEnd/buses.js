const router = require('express').Router()
const { Router } = require('express')
const conexion = require('./config/conexion') //trameos la conexion
    //get
router.get('/', (req, res) => {
    let sql = 'SELECT * FROM buses'
    conexion.query(sql, (err, rows, fields) => {
        if (err) {
            console.log(err)
        } else {
            res.json(rows)
        }
    })
})


//get un equipo
router.get('/:id', (req, res) => {
    const { id } = req.params
    let sql = 'SELECT * FROM buses WHERE id_bus = ?'
    conexion.query(sql, [id], (err, rows, fields) => {
        if (err) {
            console.log("No se pudo recuperar los datos de las rutas" + err)
        } else {
            res.json(rows)
        }
    })
})

//agregar
router.post('/', async(req, res) => {
    const { origenbus, destinobus, fecha, hora, nombrebus, tipobus, precio } = req.body
    let sql = `INSERT INTO buses(origenbus, destinobus,fecha,hora,nombrebus,tipobus,precio) values('${origenbus}',
    '${destinobus}','${fecha}','${hora}','${nombrebus}','${tipobus}','${precio}')`
    conexion.query(sql, (err, rows, fields) => {
        if (err) {
            console.log("no se pudo registrar la ruta" + err)
        } else {
            res.json({ status: 'Ruta Registrada' })
        }
    })
})

//eliminar
router.delete('/:id', (req, res) => {
    const { id } = req.params
    let sql = `DELETE FROM buses WHERE id_bus = '${id}'`
    conexion.query(sql, (err, rows, fields) => {
        if (err) {
            console.log("No se pudo eliminar la ruta " + err)
        } else {
            res.json({ status: 'ruta eliminada' })
        }
    })
})

//actualizar
router.put('/:id', (req, res) => {
    const { id } = req.params
    const { origenbus, destinobus, fecha, hora, nombrebus, tipobus, precio } = req.body
    let sql = `update buses set 
            origenbus='${origenbus}',
            destinobus='${destinobus}',
            fecha='${fecha}',
            hora='${hora}',
            nombrebus='${nombrebus}',
            tipobus='${tipobus}',
            precio='${precio}'
            WHERE id_bus = '${id}'`
    conexion.query(sql, (err, rows, fields) => {
        if (err) {
            console.log("no se pudo actualizar la ruta " + err)
        } else {
            res.json({ status: 'ruta actualizado!' })
        }
    })
})
module.exports = router
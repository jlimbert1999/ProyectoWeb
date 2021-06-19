const router = require('express').Router()
const { Router } = require('express')
const conexion = require('./config/conexion') //trameos la conexion
    //const jwt = require('jsonwebtoken');
    //const bcryptjs = require('bcryptjs')

//--------asignamos todas las rutas-----------//

//get
router.get('/', (req, res) => {
    let sql = 'SELECT * FROM rutas'
    conexion.query(sql, (err, rows, fields) => {
        if (err) {
            console.log(err)
        } else {
            // console.log(rows.length)
            // console.log(rows[1].id)
            res.json(rows)
        }
    })
})


//get un equipo
router.get('/:id', (req, res) => {
    const { id } = req.params
    let sql = 'SELECT * FROM rutas WHERE id_ruta = ?'
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
    const { origen, destino } = req.body
    let sql = `INSERT INTO rutas(origen, destino) values('${origen}','${destino}')`
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
    let sql = `DELETE FROM rutas WHERE id_ruta = '${id}'`
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
    const { origen, destino } = req.body
    let sql = `update rutas set 
            origen='${origen}',
            destino='${destino}'
            WHERE id_ruta = '${id}'`
    conexion.query(sql, (err, rows, fields) => {
        if (err) {
            console.log("no se pudo actualizar la ruta " + err)
        } else {
            res.json({ status: 'ruta actualizado!' })
        }
    })
})

module.exports = router
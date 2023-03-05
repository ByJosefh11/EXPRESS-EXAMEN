"use strict"

const express = require('express');
const router = express.Router();
const Marca = require('../models/marca');

router.get('/crear', (req, res) => {
    res.render('crear')
})

router.get('/', async (req, res) => {

    try{

        const arrayVintageDB = await Marca.find();
        console.log(arrayVintageDB);
        res.render("vintage", {
            arrayVintage: arrayVintageDB
        })
    } catch (error) {
        console.error(error)
    }
})

router.post('/', async (req, res) => {
    const body = req.body 

    console.log(body)
    try {

        const vintageDB = new Marca(body)

        await vintageDB.save()
        res.redirect('/vintage')

    } catch (error) {
        console.log('error', error)
    }
})

router.get('/:id', async(req, res) => {
    const id = req.params.id

    try {
        const vintageDB = await Marca.findOne({ _id: id })

        console.log(vintageDB)
        res.render('detalle', {
            marca: vintageDB,
            error: false
        })
    } catch (error) {
        console.log('Se ha producido un error', error)
        res.render('detalle', {
            error: true,
            mensaje: 'Marca no encontrada!'
        })
    }
})

router.delete('/:id', async(req, res) => {
    const id = req.params.id
    console.log('_id desde backend', id)
    try {
        const vintageDB = await Marca.findByIdAndDelete({ _id: id });


        console.log(vintageDB)

        if (!vintageDB){
            res.json({
                estado:false,
                mensaje: 'No se puede eliminar la marca'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'Marca eliminada.'
            })
        }
    } catch (error) {
        console.log(error)
    }
})


router.put('/:id', async(req, res) => {
    const id = req.params.id
    const body = req.body;
    console.log(id)
    console.log('body', body)
    try {
        const vintageDB = await Marca.findByIdAndUpdate(
            id, body, { useFindAndModify:false }
            )
            console.log(vintageDB)
            res.json({
                estado: true,
                mensaje: 'Marca editada'
            })

        } catch (error) {
        console.log(error)
        res.json({
            estado:false,
            mensaje: 'Problema al editar la marca'
        })
    }
})

module.exports = router;




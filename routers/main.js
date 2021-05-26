const express = require('express')
const notes = require('../src/notes')
const router = new express.Router()
const validate = require('./validators')
const {check, validationResult} = require('express-validator')
const { errorMsg } = require('./validators')

/*

*/
params = validate.params
paramstitle = validate.paramstitle
errorMsghere = validate.errorMsg

router.get('', (req, res) => {
    try{
    res.send({
        Project: 'Note Taking Application',
        Operations: ['Add note', 'Remove note', 'Modify Note', 'List Note', 'Read Note']
    })
    } catch(e){
        console.log(e)
    }
})

router.post('/add', params, errorMsghere, async(req, res) => {
    try {
    const note = await notes.addNote(req.body.title, req.body.body)
    res.status(note.status).send({
        Operation: note.Message
    })
    console.log(note)
    } catch (e){
        console.log(e)
    }

})

router.put('/remove' , paramstitle, errorMsghere ,async(req, res, next) => {
    try {
    const note = await notes.removeNote(req.body.title)
    res.status(note.status).send({
        Operation: note.Message
    })
    console.log(note)
    } catch (e){
        console.log(e)
    }
})

router.get('/list', async(req, res) => {
    try{
    const note = await notes.listNotes()
    res.status(note.status).send({
        note: note.notes
    })
    }catch(e)
    {
        console.log(e)
    }
})


router.put('/modify' , params, errorMsghere,async(req, res) => {
    try{
    const note = await notes.modifyNote(req.body.title,req.body.body)
    res.status(note.status).send({
        Operation: note.Message
    })
    } catch(e){
        console.log(e)
    }
})

router.all('*', (req, res) => {
    res.status(404).send({
        title: '404',
        errorMessage: 'Page Not Found'
    })
})

module.exports = router
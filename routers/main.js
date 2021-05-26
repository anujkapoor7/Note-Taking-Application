const express = require('express')
const notes = require('../src/notes')
const router = new express.Router()
const validate = require('./validators')
const {check, validationResult} = require('express-validator')
const { errorMsg } = require('./validators')

params = validate.params
paramstitle = validate.paramstitle
errorMsghere = validate.errorMsg

router.get('', (req, res) => {
    
    res.send({
        Project: 'Note Taking Application',
        Operations: ['Add note', 'Remove note', 'Modify Note', 'List Note', 'Read Note']
    })
})

router.post('/add', params, errorMsghere, async(req, res) => {
    const note = await notes.addNote(req.body.title, req.body.body)
    res.send({
        Operation: note
    })

})

router.delete('/remove' , paramstitle, errorMsghere ,async(req, res, next) => {
    // next()
    try {
    const note = await notes.removeNote(req.body.title)
    res.send({
        Operation: note
    })
    } catch (e){
        console.log(e)
    }
})

router.get('/list', async(req, res) => {
    const note = await notes.listNotes()
    res.status(200).send({
        note: note
    })
})


router.put('/modify' , params, errorMsghere,async(req, res) => {
    
    const note = await notes.modifyNote(req.body.title,req.body.body)
    res.send({
        Operation: note
    })
})


router.all('*', (req, res) => {
    res.status(404).send({
        title: '404',
        errorMessage: 'Page Not Found'
    })
})



module.exports = router
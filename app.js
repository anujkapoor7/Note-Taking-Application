const express = require('express')
const notes = require('./notes.js')

const app = express()

app.get('', (req, res) => {
    res.send({
        Project: 'Note Taking Application',
        Operations: ['Add note', 'Remove note', 'Modify Note', 'List Note', 'Read Note']
    })
})

app.get('/add', (req,res) => {
    if(!req.query.title){
        return res.send({
            error: 'Please enter the title'
        })
    }
    if(!req.query.body){
        return res.send({
            error: 'Please enter the body'
        })
    }
    notes.addNote(req.query.title, req.query.body, (note) => {
        res.send({
            Operation: note
        })
    })
})

app.get('/remove', (req, res) => {
    if(!req.query.title){
        return res.send({
            error: 'Please enter the title of the note to delete'
        })
    }

    notes.removeNote(req.query.title, (note) => {
        res.send({
            Operation: note
        })
    })
})

app.get('/list', (req, res) => {
    notes.listNotes((note) => {
        res.send({
            YourNotes: note
        })
    })
})

app.get('/read', (req, res) => {
    if(!req.query.title){
        return res.send({
            error: 'Please enter the title of the note to read its body'
        })
    }
    notes.readNode(req.query.title, (Note, error) => {
        if(error){
            return res.send({error})
        }
        res.send({Note})
    })
})

app.get('/modify' ,(req, res) => {
    if(!req.query.title){
        return res.send({
            error: 'Please enter the title'
        })
    }
    if(!req.query.body){
        return res.send({
            error: 'Please enter the body'
        })
    }

    notes.modifyNote(req.query.title, req.query.body, (note) => {
        res.send({
            Operation: note
        })
    })
})


app.get(['/add/*','/remove/*','/read/*','/modify/*','/list/*'], (req, res) => {
    res.send({
        title: '404',
        errorMessage: 'Operation does not exist'
    })
})

app.get('*', (req, res) => {
    res.send({
        title: '404',
        errorMessage: 'Page Not Found'
    })
})

app.listen(3001, () => {
    console.log('Server is up on port 3001')
})

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
    const note = notes.addNote(req.query.title, req.query.body)
    return res.send({
    Operation: note
    })
})

app.get('/remove', (req, res) => {
    if(!req.query.title){
        return res.send({
            error: 'Please enter the title of the note to delete'
        })
    }

    const note = notes.removeNote(req.query.title)
    return res.send({
        Operation: note
    })
})

app.get('/list', (req, res) => {
    const note = notes.listNotes()
        res.send({
            YourNotes: note
        })
})

app.get('/read', (req, res) => {
    if(!req.query.title){
        return res.send({
            error: 'Please enter the title of the note to read its body'
        })
    }
    const Note = notes.readNode(req.query.title)
    return res.send({Note})
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

    const note = notes.modifyNote(req.query.title, req.query.body)
    return res.send({
        Operation: note
    })
})

app.get('/add/*', (req, res) => {
    res.send({
        title: '404',
        errorMessage: 'Operation does not exist'
    })
})

app.get('/remove/*', (req, res) => {
    res.send({
        title: '404',
        errorMessage: 'Operation does not exist'
    })
})

app.get('/list/*', (req, res) => {
    res.send({
        title: '404',
        errorMessage: 'Operation does not exist'
    })
})

app.get('/modify/*', (req, res) => {
    res.send({
        title: '404',
        errorMessage: 'Operation does not exist'
    })
})

app.get('/read/*', (req, res) => {
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

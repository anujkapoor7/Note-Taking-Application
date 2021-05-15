const express = require('express')
const notes = require('./notes.js')


const app = express()

app.get('', (req, res) => {
    res.send({
        Project: 'Note Taking Application',
        Operations: ['Add note', 'Remove note', 'Modify Note', 'List Note', 'Read Note']
    })
})

app.get('/note', (req, res) => {
    if(req.query.op === 'add'){
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
    } else if (req.query.op == 'remove'){
        if(!req.query.title){
            return res.send({
                error: 'Please enter the title of the note to delete'
            })
        }

        const note = notes.removeNote(req.query.title)
        return res.send({
            Operation: note
        })
    } else if (req.query.op === 'list'){
        const note = notes.listNotes()
        res.send({
            YourNotes: note
        })
    } else if (req.query.op === 'read'){
        if(!req.query.title){
            return res.send({
                error: 'Please enter the title of the note to read its body'
            })
        }
        const Note = notes.readNode(req.query.title)
        return res.send({Note})
    } else if (req.query.op === 'modify'){
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
    } else {
        res.send({
            error: 'The operation entered does not exist'
        })
    }
    // res.send({
    //     Operation: req.query.op,
    //     Title: req.query.title,
    //     Body: req.query.body
    // })
})

app.get('/note/*', (req, res)=> {
    res.send({
        title: '404',
        errorMessage: 'Note operation does not exist'
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

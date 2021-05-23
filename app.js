const express = require('express')
const notes = require('./notes.js')

const app = express()

app.use(express.urlencoded({extended : false}))


app.get('', (req, res) => {
    res.send({
        Project: 'Note Taking Application',
        Operations: ['Add note', 'Remove note', 'Modify Note', 'List Note', 'Read Note']
    })
})

app.post('/add', async(req,res) => {
    if(!req.body.title){
        return res.send({
            error: 'Please enter the title'
        })
    }
    if(!req.body.body){
        return res.send({
            error: 'Please enter the body'
        })
    }
    const note = await notes.addNote(req.body.title, req.body.body)
    res.send({
        Operation: note
    })
})

app.post('/remove', async(req, res) => {
    if(!req.body.title){
        return res.send({
            error: 'Please enter the title of the note to delete'
        })
    }

    const note = await notes.removeNote(req.body.title)
    res.send({
        Operation: note
    })
})

app.get('/list', async(req, res) => {
    const note = await notes.listNotes()
    res.send({
        YourNotes: note
    })
})

app.get('/read', async(req, res) => {
    if(!req.query.title){
        return res.send({
            error: 'Please enter the title of the note to read its body'
        })
    }

    const note = await notes.readNode(req.query.title)
    if(note === undefined)
    {
        return res.send({
            error: 'This note does not found, try again'
        })
    }
    return res.send({
        YourNotes: note
    })
    // await notes.readNode(req.query.title, (Note, error) => {
    //     if(error){
    //         return res.send({error})
    //     }
    //     res.send({Note})
    // })
})

app.post('/modify' , async(req, res) => {
    if(!req.body.title){
        return res.send({
            error: 'Please enter the title'
        })
    }
    if(!req.body.body){
        return res.send({
            error: 'Please enter the body'
        })
    }

    const note = await notes.modifyNote(req.body.title,req.body.body)
    res.send({
        Operation: note
    })
})


app.get('*', (req, res) => {
    res.send({
        title: '404',
        errorMessage: 'Page Not Found'
    })
})

app.post('*', (req, res) => {
    res.send({
        title: '404',
        errorMessage: 'Page Not Found'
    })
})

app.listen(3001, () => {
    console.log('Server is up on port 3001')
})

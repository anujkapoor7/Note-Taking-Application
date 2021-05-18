const fs = require('fs')

const addNote = (title, body, callback) => {
    const notes = loadNotes()
    const duplicatenote = notes.find((note) => note.title  === title)

    if(!duplicatenote){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        callback ('Note Added Successfully')
    }else{
        callback ('Note Title Taken')
    }    
    
}

const removeNote = (title, callback) => {
    const notes = loadNotes()
    const notesTokeep = notes.filter((note) => note.title !== title)

    if (notes.length>notesTokeep.length){
            saveNotes(notesTokeep)
            callback ('Note removed!')
    }else{
            callback ('No note exist with this name, try again')
    }
}

const listNotes = (callback) => {
    const  notes = loadNotes()
    const notelist = []
    notes.forEach((note) => {
        notelist.push(note.title)
    })
    callback (notelist)
}

const readNode = (title, callback) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if(note){
        callback (note, undefined)
    }else{
        callback (undefined, 'This note does not exist, Try Another note')
    }

}

const modifyNote = (title, body, callback) => {
    const notes = loadNotes()
    const notesTokeep = notes.filter((note) => note.title !== title)
    const note = notes.find((note) => note.title === title)

    if(note){
        notesTokeep.push({
            title: title,
            body: body
        })
        saveNotes(notesTokeep)
        callback ('Note Modified Successfully')
    }else {
        callback ('Note not found, try again')
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }catch (e){
        return[]
    }   
}
module.exports = {
    addNote: addNote,  
    removeNote: removeNote,
    listNotes: listNotes,
    readNode: readNode,
    modifyNote: modifyNote
}
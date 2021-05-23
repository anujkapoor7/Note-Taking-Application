const fs = require('fs')
const { promisify } = require('util')
const readFileAsync = promisify(fs.readFile)
const writeFileASync = promisify(fs.writeFile)


const addNote = async(title, body) => {
    const notes = await loadNotes()
    const duplicatenote = notes.find((note) => note.title  === title)

    if(!duplicatenote){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        return ('Note Added Successfully')
    }else{
        return ('Note Title Taken')
    }    
    
}

const removeNote = async(title) => {
    const notes = await loadNotes()
    const notesTokeep = notes.filter((note) => note.title !== title)

    if (notes.length>notesTokeep.length){
            saveNotes(notesTokeep)
            return 'Note removed!'
    }else{
            return 'No note exist with this name, try again'
    }
}

const listNotes = async() => {
    const  notes = await loadNotes()
    const notelist = []
    notes.forEach((note) => {
        notelist.push(note.title)
    })
    return notelist
}

const readNode = async(title) => {
    const notes = await loadNotes()
    const note = notes.find((note) => note.title === title)

    if(note){
        return (note)
    }else{
        return (undefined)
    }

}

const modifyNote = async(title, body) => {
    const notes = await loadNotes()
    const notesTokeep = notes.filter((note) => note.title !== title)
    const note = notes.find((note) => note.title === title)

    if(note){
        notesTokeep.push({
            title: title,
            body: body
        })
        await saveNotes(notesTokeep)
        return ('Note Modified Successfully')
    }else {
        return ('Note not found, try again')
    }
}

const saveNotes = async(notes) => {
    const dataJSON = JSON.stringify(notes)
    await writeFileASync('notes.json',dataJSON)
}

const loadNotes = async() => {
    try{
        const dataBuffer = await readFileAsync('notes.json')
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
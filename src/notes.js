const fs = require('fs')
const { promisify } = require('util')
const readFileAsync = promisify(fs.readFile)
const writeFileASync = promisify(fs.writeFile)


const addNote = async(title, body) => {
    try{
    const notes = await loadNotes()
    const duplicatenote = notes.find((note) => note.title  === title)

    if(!duplicatenote){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        return ({
            status: 200,
            Message: 'Note Added Successfully'
        })
    }else{
        return ({
            status: 501,
            Message: 'Note Title Taken'
        })
    }   
    }catch(e){
        console.log(e)
    } 
    
}

const removeNote = async(title) => {
    try{
    const notes = await loadNotes()
    const notesTokeep = notes.filter((note) => note.title !== title)

    if (notes.length>notesTokeep.length){
            saveNotes(notesTokeep)
            return ({
                status: 200,
                Message: 'Note Removed Successfully'
            })
    }else{
            return ({
                status: 501,
                Message: 'No note exist with this name, try another note'
            })
    }
    } catch(e){
        console.log(e)
    }
}

const listNotes = async() => {
    try{
    const  notes = await loadNotes()
    return ({
        status: 200,
        notes: notes
    })
    } catch(e){
        return ({
            status: 20,
            notes: notes
        })
    }
}

const readNode = async(title) => {
    try{
    const notes = await loadNotes()
    const note = notes.find((note) => note.title === title)

    if(note){
        return (note)
    }else{
        return (undefined)
    }
    } catch(e){
        console.log(e)
    }

}

const modifyNote = async(title, body) => {
    try{
    const notes = await loadNotes()
    const notesTokeep = notes.filter((note) => note.title !== title)
    const note = notes.find((note) => note.title === title)

    if(note){
        notesTokeep.push({
            title: title,
            body: body
        })
        await saveNotes(notesTokeep)
        return ({
            status: 200,
            Message: 'Note Modified Successfully'
        })
    }else {
        return ({
            status: 501,
            Message: 'No note exist with this name, try another note'
        })
    }
    } catch(e){
        console.log(e)
    }
}

const saveNotes = async(notes) => {
    try{
    const dataJSON = JSON.stringify(notes)
    await writeFileASync('notes.json',dataJSON)
    } catch(e){
        console.log(e)
    }
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
const fs = require("fs");
const path = require("path");

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({notes: notesArray}, null, 2)
    );
    return note;
}  

function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
  }

function deleteById(id, notesArray) {
    const result = notesArray.splice(note => note.id, 1);
    return result;
}

function validateNote(note) {
    if(!note.title || typeof note.title !== 'string') {
        return false;
    }
    if(!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;
}




module.exports = {createNewNote, findById, validateNote, deleteById};
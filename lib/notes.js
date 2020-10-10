const fs = require("fs");
const path = require("path");

function createNewNote(body, notesArray) {
    console.log(body);
  
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        // null in the JSON line means we do not want to change existing data
        JSON.stringify({notes: notesArray}, null, 2)
    );
    return note;
}  

module.exports = {createNewNote};
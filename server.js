const express = require('express');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001;

const app = express();
//middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());


const { notes } = require('./db/db.json');

function filterByQuery(query, notesArray) {
    let filteredResults = notesArray;
    if(query.title) {
        filteredResults = filteredResults.filter(note => note.title === query.title);
    }
    if(query.text) {
        filteredResults = filteredResults.filter(note => note.text === query.text);
    }
    return filteredResults;    
}
//not working
function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
  }

function createNewNote(body, notesArray) {
    console.log(body);
    //main code
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        // null in the JSON line means we do not want to change existing data
        JSON.stringify({notes: notesArray}, null, 2)
    );
    //return finished code
    return note;
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

//filtered notes by query
app.get("/api/notes", (req, res) => {
    let results = notes;
    if(req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

// filter by id parameter - not working right now
app.get('/api/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    res.json(result);
});

app.post('/api/notes', (req, res) => {
    //set id
    req.body.id = notes.length.toString();
    //validate data
    if(!validateNote(req.body)) {
        res.status(400).send('Please enter a title and note!');
    } else {
    //add note
        const note = createNewNote(req.body, notes);
        res.json(note);
    }   
});
//static folder that points to public
app.use(express.static(path.join(__dirname, 'public')));

//port listener - runs webserver
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
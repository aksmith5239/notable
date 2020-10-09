const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3001;
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
//static folder that points to public
app.use(express.static(path.join(__dirname, 'public')));

//port listener - runs webserver
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
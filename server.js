const express = require('express');
const app = express();
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
    // console.log(filteredResults);
    return filteredResults;
    
}



app.get("/api/notes", (req, res) => {
    let results = notes;
    // console.log(req.query)
    if(req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});
//port listener
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
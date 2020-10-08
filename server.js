const express = require('express');
const app = express();
const PORT = 3001;
const { notes } = require('./db/db.json');





app.get("/api/notes", (req, res) => {
    let results = notes;
    console.log(req.query)
    res.json(notes);
})
//port listener
app.listen(3001, () => {
    console.log(`API server now on port 3001`);
});
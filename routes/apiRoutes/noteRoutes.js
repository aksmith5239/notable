const router = require('express').Router();
const {createNewNote, findById, validateNote} = require('../../lib/notes');
const { notes } = require('../../db/db.json');

router.get("/notes", (req, res) => {
    let results = notes;
   
    res.json(results);
});

// filter by id parameter 
router.get('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    res.json(result);
});

router.post('/notes', (req, res) => {
    //set id
    req.body.id = notes.length.toString(); 
   
    if (!validateNote(req.body)) {
        res.status(400).send("Please add a title and a note!");
      } else {
        const note = createNewNote(req.body, notes);
        res.json(note);
      }    
});
module.exports = router;
const router = require('express').Router();
const {createNewNote} = require('../../lib/notes');
const { notes } = require('../../db/db.json');



router.get("/notes", (req, res) => {
    let results = notes;
   
    res.json(results);
});

// // filter by id parameter 
// router.get('/notes/:id', (req, res) => {
//     const result = findById(req.params.id, notes);
//     res.json(result);
// });

router.post('/notes', (req, res) => {
    //set id
    req.body.id = notes.length.toString(); 
    //add note
        const note = createNewNote(req.body, notes);
        res.json(note);
    
});
module.exports = router;
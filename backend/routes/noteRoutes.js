const express = require('express');
const router = express.Router();

const noteController = require('../controllers/noteController');


router.route('/teaching/:id')
    .get(noteController.getAllNotesByTeaching);

router.route('/:id')
    .patch(noteController.updateNote);


module.exports = router;
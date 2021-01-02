const express = require('express');
const router = express.Router();

const noteController = require('../controllers/noteController');


router.route('/teaching/:id')
    .get(noteController.getAllNotesByTeaching);

/*router.route('/:id')
    .get(lectureController.getLecture)
    .patch(lectureController.updateLecture)
    .delete(lectureController.deleteLecture);*/

module.exports = router;
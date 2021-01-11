const express = require('express');
const router = express.Router();

const lectureController = require('../controllers/lectureController');


router.route('/')
    .get(lectureController.getAllLectures)
    .post(lectureController.createLecture);

/*router.route('/:id')
    .get(lectureController.getLecture)
    .patch(lectureController.updateLecture)
    .delete(lectureController.deleteLecture);*/

router.route('/lecture/:teaching')
    .get(lectureController.getLectureByTeaching);

module.exports = router;
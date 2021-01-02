const express = require('express');
const router = express.Router();

const teachingController = require('../controllers/teachingController');


router.route('/')
    .get(teachingController.getAllTeachings)
    .post(teachingController.createTeaching);

router.route('/:id')
    .get(teachingController.getTeaching)
    .patch(teachingController.updateTeaching)
    .delete(teachingController.deleteTeaching);

router.route('/teacher/:id')
    .get(teachingController.getAllTeachingsByTeacher);

module.exports = router;
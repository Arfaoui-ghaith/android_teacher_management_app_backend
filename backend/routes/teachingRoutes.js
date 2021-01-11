const express = require('express');
const router = express.Router();

const teachingController = require('../controllers/teachingController');
const authController = require('./../controllers/authController');

router.route('/')
    .get(teachingController.getAllTeachings)
    .post(teachingController.createTeaching);

router.route('/:id')
    .get(teachingController.getTeaching)
    .patch(teachingController.updateTeaching)
    .delete(teachingController.deleteTeaching);

router.route('/teacher/teachings')
    .get(authController.protect, authController.restrictTo('teacher') , teachingController.getAllTeachingsByTeacher);

module.exports = router;
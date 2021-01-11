const express = require('express');
const router = express.Router();

const classeController = require('./../controllers/classeController');
const authController = require('./../controllers/authController');

router.route('/teacher')
    .get(authController.protect, authController.restrictTo('teacher') ,classeController.getAllClassesByTeacher);

router.route('/:name/teacher/courses')
    .get(authController.protect, authController.restrictTo('teacher') ,classeController.getAllCoursesByTeacher);

router.route('/')
    .get(classeController.getAllClasses)
    .post(classeController.createClasse);

router.route('/:id')
    .get(classeController.getClasse)
    .patch(classeController.updateClasse)
    .delete(classeController.deleteClasse);

module.exports = router;
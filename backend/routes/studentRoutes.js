const express = require('express');
const router = express.Router();

const studentController = require('./../controllers/studentController');
const authController = require('./../controllers/authController');

router.route('/')
    .post(studentController.createStudent);


router.route('/:id')
    .get(studentController.getStudent);
    //.patch(studentController.updateStudent)
    //.delete(studentController.deleteStudent);

router.route('/classe/:classe')
    .get(studentController.getAllStudentsByclasseName);

router.route('/note/:student/:course')
    .get(authController.protect, authController.restrictTo('teacher') , studentController.getStudentNoteByCourse);

module.exports = router;
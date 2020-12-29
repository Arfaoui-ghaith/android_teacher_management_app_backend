const express = require('express');
const router = express.Router();

const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.route('/teachers')
    .get(userController.getAllTeachers);

router.route('/teachers/:id')
    .get(userController.getTeacher);

router.route('/')
    .get(authController.protect, authController.restrictTo('admin') , userController.getAllUsers)
    .post(userController.createUser);

router.route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;
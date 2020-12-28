const express = require('express');
const router = express.Router();

const classeController = require('./../controllers/classeController');


router.route('/')
    .get(classeController.getAllClasses)
    .post(classeController.createClasse);

router.route('/:id')
    .get(classeController.getClasse)
    .patch(classeController.updateClasse)
    .delete(classeController.deleteClasse);

module.exports = router;
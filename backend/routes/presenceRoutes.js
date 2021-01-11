const express = require('express');
const router = express.Router();

const presenceController = require('../controllers/presenceController');


router.route('/lecture/:id')
    .get(presenceController.getAllLecturePresences);

router.route('/:id')
    .get(presenceController.getPresence)
    .patch(presenceController.updatePresence);

module.exports = router;
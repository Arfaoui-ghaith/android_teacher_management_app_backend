const mongoose = require('mongoose');
const validator = require('validator');

const teachingSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.ObjectId,
        ref: 'Course',
        required: [true, 'Please provide a course.']
    },
    teacher: {
        type: mongoose.Schema.ObjectId,
        ref: 'Teacher',
        required: [true, 'Please provide a teacher.']
    },
    classe: {
        type: mongoose.Schema.ObjectId,
        ref: 'Classe',
        required: [true, 'Please provide a classe.']
    },
    lectures: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Lecture',
        }
    ]

});

const Teaching = mongoose.model('Teaching', teachingSchema);

module.exports = Teaching;
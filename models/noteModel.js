const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.ObjectId,
        ref: 'Course',
        required: [true, 'A "note" must have a "Course"'],
    },
    student: {
        type: mongoose.Schema.ObjectId,
        ref: 'Student',
        required: [true, 'A "note" must belong to a "Student"'],
    },
    tnp: {
        type: Double,
        min: 0,
        max: 20
    },
    ds: {
        type: Double,
        min: 0,
        max: 20
    },
    exam: {
        type: Double,
        min: 0,
        max: 20
    },
    tp: {
        type: Double,
        min: 0,
        max: 20
    }
      
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
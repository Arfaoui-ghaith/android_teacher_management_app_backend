const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    teaching: {
        type: mongoose.Schema.ObjectId,
        ref: 'Teaching',
        //required: [true, 'A "note" must have a "Teaching"'],
    },
    student: {
        type: mongoose.Schema.ObjectId,
        ref: 'Student',
        required: [true, 'A "note" must belong to a "Student"'],
    },
    tnp: {
        type: Number,
        min: -1,
        max: 20,
        default: -1
    },
    ds: {
        type: Number,
        min: -1,
        max: 20,
        default: -1
    },
    exam: {
        type: Number,
        min: -1,
        max: 20,
        default: -1
    },
    tp: {
        type: Number,
        min: -1,
        max: 20,
        default: -1
    }
      
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
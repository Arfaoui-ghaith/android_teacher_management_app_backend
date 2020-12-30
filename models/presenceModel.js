const mongoose = require('mongoose');
const validator = require('validator');

const presenceSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.ObjectId,
        ref: 'Student',
        required: [true, 'A presence must have a Student'],
    },
    lecture: {
        type: mongoose.Schema.ObjectId,
        ref: 'Lecture',
        required: [true, 'A presence must have a Lecture'],
    },
    state: {
        type: String,
        enum: ['absent', 'present'],
        default: 'present'
    }
  

});

const Presence = mongoose.model('Presence', presenceSchema);

module.exports = Presence;
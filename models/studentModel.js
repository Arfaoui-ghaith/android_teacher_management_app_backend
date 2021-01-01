const mongoose = require('mongoose');
const validator = require('validator');

const studentSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, 'A Student must have a first name']
    },
    last_name: {
        type: String,
        required: [true, 'A Student must have a last name']
    },
    cin: {
        type: String,
        validate : [validator.isNumeric, '{VALUE} is not a cin'],
        required: [true, 'A Student must have a national identity code'],
        unique: [true, 'we found the same identity code in our database, Please provide a different one!']
    },
    classe: {
        type: mongoose.Schema.ObjectId,
        ref: 'Classe',
    },
    notes: [
        {
        type: mongoose.Schema.ObjectId,
        ref: 'Note',
        }
    ],
    presences: [
        {
        type: mongoose.Schema.ObjectId,
        ref: 'Presence',
        }
    ]

});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
const mongoose = require('mongoose');
const validator = require('validator');

const lectureSchema = new mongoose.Schema({
    teaching: {
        type: mongoose.Schema.ObjectId,
        ref: 'Teaching',
        required: [true, 'A Lecture must have a teaching Object'],
    },
    duration: {
        type: Double,
        min: 1,
        max: 3,
        required: [true, 'A lecture must have a duration']
    },
    date: {
        type: Date,
        required: [true, 'A lecture must have a date']
    },
    room: {
        type: String,
        required: [this.state === 'offline', 'lecture must have a room']
    },
    state: {
        type: String,
        enum: ['online','offline'],
        required: [true, 'Please define the state of the lecture: "online" or "offline"']
    }

});

const Lecture = mongoose.model('Lecture', lectureSchema);

module.exports = Lecture;
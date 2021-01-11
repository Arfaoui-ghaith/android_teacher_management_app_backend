const mongoose = require('mongoose');
const validator = require('validator');
const AppError = require('./../utils/appError');

const lectureSchema = new mongoose.Schema({
    teaching: {
        type: mongoose.Schema.ObjectId,
        ref: 'Teaching',
        required: [true, 'A Lecture must have a teaching Object'],
    },
    duration: {
        type: Number,
        min: 60,
        max: 180,
        required: [true, 'A lecture must have a duration in minutes']
    },
    date: {
        type: Date,
        required: [true, 'A lecture must have a date']
    },
    state: {
        type: String,
        enum: ['online','offline'],
        required: [true, 'Please define the state of the lecture: "online" or "offline"']
    },
    room: {
        type: String,
    },
    presences: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Presence',
    }]

});

lectureSchema.pre('save', async function(next){
    if(this.state === 'offline') {
        if(!this.room) next(new AppError('This is a offline lecture. Please provide a room.',400));
    }
    next();
});

const Lecture = mongoose.model('Lecture', lectureSchema);

module.exports = Lecture;
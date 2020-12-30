const mongoose = require('mongoose');
const validator = require('validator');

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A Student must have a first name']
    },
    volume: {
        type: Number,
        min: 1,
        required: [true, 'A Course must have a number of hours']
    },
    coef: {
        type: Number,
        validate : {
            validator: function(el){
                return this.el > 0 && this.el < 6;
            }, 
            message: 'Coef must be greater than 0 and less than 6.'},
        required: [true, 'A Course must have a coef']
    },
    state: {
        type: String,
        enum: ['tp','course'],
        required: [true, 'Course must have a state: "TP" or "Lesson"']
    }

});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
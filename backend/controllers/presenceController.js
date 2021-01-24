const Presence = require('./../models/presenceModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const axios = require('axios');

exports.getAllLecturePresences = catchAsync(async (req, res, next) => {
   
    const presences = await Presence.find({lecture: req.params.id}).populate('student');

    if(!presences){
       return next(new AppError('No presences found.', 404));
    }

    res.status(200).json({
        status: 'success',
        results: presences.length,
        presences
    });

});

exports.createPresence = catchAsync(async (req, res, next) => {
    
    const newPresence = await Presence.create(req.body).catch(err => {
        return next(new AppError('Invalid class to create.',400));
    });

    res.status(201).json({
        status: 'success',
        presence: newPresence
    });
    
});

exports.getPresence = catchAsync(async (req, res, next) => {

    const presnece = await Presence.findById(req.params.id);

    if(!presnece){
        return next(new AppError('No presence with this ID.',404));
    }

    res.status(200).json({
        status: 'success',
        presence
    });

});


Date.prototype.addHours= function(h){
    this.setHours(this.getHours()+h);
    return this;
}

Date.prototype.addMinutes= function(m){
    this.setMinutes(this.getMinutes()+m);
    return this;
}


exports.updatePresence = catchAsync(async (req, res, next) => {
    
    const presenceLecture = await Presence.findById(req.params.id).populate('lecture');
    
    if(!presenceLecture){
        return next(new AppError('No presence with this ID.',404));
    }

    let date = presenceLecture.lecture.date;
    let startDate = date;
    let dateContainer = new Date(startDate.toString());
    let endDate = dateContainer.addMinutes(presenceLecture.lecture.duration);
    let dateNow = new Date().addHours(1);

    console.log(presenceLecture);
    console.log('---------------------------');
    console.log('lecture id: '+presenceLecture.lecture._id);
    console.log("startDate: "+presenceLecture.lecture.date);
    console.log("endtDate: "+endDate);
    console.log("dateNow: "+dateNow);
    
    
    if( !(startDate <= dateNow && dateNow <= endDate) ){
        return next(new AppError('Your out of the time needed to this action. your date now : '+dateNow,400));
    }
    
    const presence = await Presence.findByIdAndUpdate(req.params.id, req.body);

    if(!presence){
        return next(new AppError('No presence with this ID OR Invalid fields to update.',404));
    }

    res.status(201).json({
        status: 'success'
    });


});

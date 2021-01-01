const Presence = require('./../models/presenceModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllLecturePresences = catchAsync(async (req, res, next) => {
   
    const presences = await Presence.find({lecture: req.params.id});

    if(!presences){
       return next(new AppError('No presences found.', 404));
    }

    res.status(200).json({
        status: 'success',
        results: presences.length,
        data: {
            presences
        }
    });

});



exports.createPresence = catchAsync(async (req, res, next) => {
    
    const newPresence = await Presence.create(req.body).catch(err => {
        return next(new AppError('Invalid class to create.',400));
    });

    res.status(201).json({
        status: 'success',
        data: {
            classe: newPresence
        }
    });
    
});

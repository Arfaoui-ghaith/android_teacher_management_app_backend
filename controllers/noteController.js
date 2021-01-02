const Teaching = require('./../models/teachingModel');
const Note = require('./../models/noteModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllNotesByTeaching = catchAsync(async (req, res, next) => {
   

    const notes = await Note.find({teaching: req.params.id}).populate('student');

    if(!notes){
       return next(new AppError('No notes found.', 404));
    }

    res.status(200).json({
        status: 'success',
        results: notes.length,
        data: {
            notes
        }
    });

});

exports.updateNote = catchAsync(async (req, res, next) => {
    

    const note = await Note.findByIdAndUpdate(req.params.id, req.body);

    if(!note){
        return next(new AppError('No note with this ID OR Invalid fields to update.',404));
    }

    res.status(201).json({
        status: 'success'
    });


});
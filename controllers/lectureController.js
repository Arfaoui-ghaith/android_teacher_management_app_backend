const Lecture = require('./../models/lectureModel');
const Presence = require('./../models/presenceModel');
const Student = require('./../models/studentModel');
const Classe = require('./../models/classeModel');
const Teaching = require('./../models/teachingModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');


exports.getAllLectures = catchAsync(async (req, res, next) => {
   
    const lectures = await Lecture.find().populate('teaching');

    if(!lectures){
       return next(new AppError('No lectures found.', 404));
    }

    res.status(200).json({
        status: 'success',
        results: lectures.length,
        data: {
            lectures
        }
    });

});


exports.createLecture = catchAsync(async (req, res, next) => {

    const teaching = await Teaching.findById(req.body.teaching);

    if(!teaching){
        return next(new AppError('No teaching found with id ' + req.body.teaching,404));
    }
    
    const newLecture = await Lecture.create(req.body);
    teaching.lectures.push(newLecture._id);
    await teaching.save();

    const classe = await Classe.findById(teaching.classe).populate('students'); 
    const students = classe.students;

    students.forEach(async student => {
        const presence = await Presence.create({ student: student._id, lecture: newLecture});

        const s = await Student.findById(student._id);
        s.presences.push(presence._id);
        await s.save();

        console.log(presence);
        newLecture.presences.push(presence._id);
        await newLecture.save();

    });

    res.status(201).json({
        status: 'success',
        data: {
            classe: newLecture
        }
    });
    
});


const Course = require('./../models/courseModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');


exports.getAllCourses = catchAsync(async (req, res, next) => {
   
    const courses = await Course.find().populate('teachings');

    if(!courses){
       return next(new AppError('No courses found.', 404));
    }

    res.status(200).json({
        status: 'success',
        results: courses.length,
        data: {
            courses
        }
    });

});

exports.getCourse = catchAsync(async (req, res, next) => {
   
    const course = await Course.findById(req.params.id).populate('teachings');

    if(!course){
       return next(new AppError('No course with this ID.',404));
    }
    
    res.status(200).json({
        status: 'success',
        data: {
            course
        }
    });
   
});

exports.createCourse= catchAsync(async (req, res) => {
    
    const newCourse = await Course.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            classe: newCourse
        }
    });
    
});


exports.updateCourse = catchAsync(async (req, res, next) => {
    
    console.log('im here');
    const course = await Course.findByIdAndUpdate(req.params.id, req.body);

    if(!course){
        return next(new AppError('No class with this ID OR Invalid fields to update.',404));
    }

    res.status(201).json({
        status: 'success'
    });


});

exports.deleteCourse = catchAsync(async (req, res, next) => {

    const course = await Course.findByIdAndDelete(req.params.id);

    if(!course){
        return next(new AppError('No classe with this ID.',404));
    }

    res.status(204).json({
        status: 'success',
        data: null
    });

});
const Classe = require('./../models/classeModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Teaching = require('./../models/teachingModel');


exports.getAllClassesByTeacher = catchAsync(async (req, res, next) => {

    const teachings = await Teaching.find({ teacher: req.user.id }).populate('classe');

    if(!teachings){
        return next(new AppError('You have zero classes.',404));
    }

    const classes = new Set();

    teachings.forEach( e => {
        classes.add(e.classe.name);
        
    });
    

    res.status(200).json({
        status: 'success',
        results: classes.length,
        classes: [...classes]
    });
});


exports.getAllCoursesByTeacher = catchAsync(async (req, res, next) => {

    const classe = await Classe.findOne({ name: req.params.name });
    const teachings = await Teaching.find({ teacher: req.user.id, classe: classe._id }).populate('course');

    if(!teachings){
        return next(new AppError('You have zero courses.',404));
    }

    const courses = new Set();

    teachings.forEach( e => {
        courses.add(e.course.name);
    });

    res.status(200).json({
        status: 'success',
        results: courses.length,
        courses: [...courses]
    });

});


exports.getAllClasses = catchAsync(async (req, res, next) => {
   
        const classes = await Classe.find().populate('students');

        if(!classes){
           return next(new AppError('No classes found.', 404));
        }
    
        res.status(200).json({
            status: 'success',
            results: classes.length,
            classes
        });

});

exports.getClasse = catchAsync(async (req, res, next) => {
   
        const classe = await Classe.findById(req.params.id).populate('students');

        if(!classe){
           return next(new AppError('No class with this ID.',404));
        }
        
        res.status(200).json({
            status: 'success',
            classe
        });
       
});

exports.createClasse = catchAsync(async (req, res, next) => {
    
    const newClasse = await Classe.create(req.body).catch(err => {
        return next(new AppError('Invalid class to create.',400));
    });

    res.status(201).json({
        status: 'success',
        classe: newClasse
    });
    
});

exports.updateClasse = catchAsync(async (req, res, next) => {
    

        const classe = await Classe.findByIdAndUpdate(req.params.id, req.body);

        if(!classe){
            return next(new AppError('No class with this ID OR Invalid fields to update.',404));
        }

        res.status(201).json({
            status: 'success'
        });

    
});

exports.deleteClasse = catchAsync(async (req, res, next) => {
   
        const classe = await Classe.findByIdAndDelete(req.params.id);

        if(!classe){
            return next(new AppError('No classe with this ID.',404));
        }

        res.status(204).json({
            status: 'success',
        });

});
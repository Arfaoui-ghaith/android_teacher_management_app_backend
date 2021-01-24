const Teaching = require('./../models/teachingModel');
const Course = require('./../models/courseModel');
const User = require('./../models/userModel');
const Classe = require('./../models/classeModel');
const Note = require('./../models/noteModel');
const Student = require('./../models/studentModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');




exports.getAllTeachings = catchAsync(async (req, res, next) => {
   
    const teachings = await Teaching.find().populate('lectures').populate("teacher").populate("course").populate("classe");

    if(!teachings){
       return next(new AppError('No teachings found.', 404));
    }

    res.status(200).json({
        status: 'success',
        results: teachings.length,
        teachings
    });

});


exports.getAllTeachingsByTeacher = catchAsync(async (req, res, next) => {
    
    console.log(req.user.id);
    const teachings = await Teaching.find({ teacher: req.user.id }).populate('classe').populate('course');

    if(!teachings){
       return next(new AppError('No teachings found.', 404));
    }

    res.status(200).json({
        status: 'success',
        results: teachings.length,
        teachings
    });

});

exports.getTeaching = catchAsync(async (req, res, next) => {
   
    const teaching = await Teaching.findById(req.params.id).populate('lectures');

    if(!teaching){
       return next(new AppError('No teaching with this ID.',404));
    }
    
    res.status(200).json({
        status: 'success',
        teaching
    });
   
});

exports.createTeaching = catchAsync(async (req, res, next) => {

    const course = await Course.findById(req.body.course);
    const classe = await Classe.findById(req.body.classe);
    const teacher = await User.findById(req.body.teacher);

    if(!course){
        return next(new AppError('No course found with this ID',404));
    }

    if(!classe){
        return next(new AppError('No classe found with this ID',404));
    }

    if(!teacher){
        return next(new AppError('No classe found with this ID',404));
    }
    else {
        if(teacher.role !== 'teacher'){
            return next(new AppError('this is not a teacher. Please provide a teacher',400));
        }
    }
    
    const newTeaching = await Teaching.create(req.body);
    classe.teachings.push(newTeaching._id);
    await classe.save();

    course.teachings.push(newTeaching._id);
    await course.save();

    teacher.teachings.push(newTeaching._id);
    await teacher.save();

    
    
    const l = classe.students.length;

    classe.students.map(async (el) => {
        const note = await Note.create({ teaching: newTeaching._id, student: el._id });
        

        const student = await Student.findById(el._id);
        student.notes.push(note._id);
        await student.save();
        
       try{
        newTeaching.notes.push(note._id);
       }catch(err){
        console.log(err.message);
       }
        
        if(newTeaching.notes.length === l)
        {
            try{
                await newTeaching.save();
            }catch(err){
                console.log(err.message);
            }
            
        }
        
        
    });

    res.status(201).json({
        status: 'success',
        teaching: newTeaching
    });
    
});

exports.updateTeaching = catchAsync(async (req, res, next) => {
    
    console.log('im here');
    const teaching = await Teaching.findByIdAndUpdate(req.params.id, req.body);

    if(!teaching){
        return next(new AppError('No class with this ID OR Invalid fields to update.',404));
    }

    res.status(201).json({
        status: 'success'
    });


});

exports.deleteTeaching = catchAsync(async (req, res, next) => {

    const teaching = await Teaching.findByIdAndDelete(req.params.id);

    if(!teaching){
        return next(new AppError('No classe with this ID.',404));
    }

    res.status(204).json({
        status: 'success',
    });

});
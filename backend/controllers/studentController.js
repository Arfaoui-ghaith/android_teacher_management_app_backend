const Student = require('./../models/studentModel');
const Classe = require('./../models/classeModel');
const Course = require('./../models/courseModel');
const Note = require('./../models/noteModel');
const Teaching = require('./../models/teachingModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');


exports.getStudentNoteByCourse = catchAsync(async (req, res, next) => {

    const course = await Course.findOne({ name: req.params.course });

    if(!course){
        return next(new AppError('Course not found.', 404));
    }

    const student = await Student.findById(req.params.student).populate('classe');

    if(!student){
        return next(new AppError('Student not found.', 404));
    }

    console.log(student.classe._id);

    const teaching = await Teaching.findOne({ teacher: req.user.id, course: course._id, classe: student.classe._id });

    if(!teaching){
        return next(new AppError('Teaching not found.', 404));
    }

    const note = await Note.findOne({ student: req.params.student,  teaching: teaching._id});

    if(!note){
        return next(new AppError('Notes not found.', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            note
        }
    });

});

exports.getAllStudentsByclasseName = catchAsync(async (req, res, next) => {
    
    const classe = await Classe.findOne({ name: req.params.classe }).populate('students');

    if(!classe){
        return next(new AppError('No students for this classe name.',404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            students: classe.students
        }
    });
})


exports.createStudent = catchAsync(async (req, res, next) => {

    const classe = await Classe.findById(req.body.classe);

    if(!classe){
        return next(new AppError('No classe found with this ID.', 404));
     }

    const newStudent = await Student.create(req.body);
    classe.students.push(newStudent._id);
    await classe.save();
    


    res.status(201).json({
        status: 'success',
        data: {
            student: newStudent
        }
    });
  });


exports.getStudent = catchAsync(async (req, res, next) => {
    const student = await Student.findById(req.params.id).populate('classe');
  
    if(!student){
      return next(new AppError('No Student with this ID.',404));
   }
   
   res.status(200).json({
       status: 'success',
       data: {
            student
       }
   });
  });
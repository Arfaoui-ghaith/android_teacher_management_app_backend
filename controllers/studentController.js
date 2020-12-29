const Student = require('./../models/studentModel');
const Classe = require('./../models/classeModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');


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
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');


exports.getAllTeachers = catchAsync(async (req, res, next) => {
  const users = await User.find({role: 'teacher'});

  if(!users){
     return next(new AppError('No users found.', 404));
  }

  res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
          users
      }
  });
});

exports.getTeacher = catchAsync(async (req, res, next) => {
  const teacher = await User.findById(req.params.id).populate('classes');

  if(!teacher){
    return next(new AppError('No teacher with this ID.',404));
 }
 
 res.status(200).json({
     status: 'success',
     data: {
         teacher
     }
 });
});


exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.find();

    if(!users){
       return next(new AppError('No users found.', 404));
    }

    res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
            users
        }
    });
  });

  exports.getUser = (req, res) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined!'
    });
  };
  exports.createUser = (req, res) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined!'
    });
  };
  exports.updateUser = (req, res) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined!'
    });
  };
  exports.deleteUser = (req, res) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined!'
    });
  };
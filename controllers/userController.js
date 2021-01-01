const User = require('./../models/userModel');
const Teaching = require('./../models/teachingModel');
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
  const teacher = await User.findById(req.params.id);

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


exports.getTodayLectures = catchAsync(async (req, res, next) => {
  const teachings = await Teaching.find({ teacher: req.params.id }).populate('lectures');

  if(!teachings){
     return next(new AppError('User either not found or has no classes to teach.', 404));
  }

  const todayLectures = [];

  teachings.forEach(e => {
    if(e.lectures){
    e.lectures.forEach(el => {
      console.log(new Date().toISOString().substr(0,10)+" "+el.date.toString().substr(0,10));
        if(new Date().toISOString().substr(0,10) == el.date.toISOString().substr(0,10)){
          todayLectures.push(el);
          console.log(todayLectures);
        }
    });
    }
  });

  if(todayLectures.length === 0){
    return next(new AppError('Get Some Rest you have zero lectures today.', 404));
  }

  res.status(200).json({
      status: 'success',
      results: todayLectures.length,
      data: {
        todayLectures
      }
  });
});
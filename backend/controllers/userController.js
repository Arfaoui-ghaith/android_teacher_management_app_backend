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
      users
  });
});

exports.getTeacher = catchAsync(async (req, res, next) => {
  const teacher = await User.findById(req.params.id);

  if(!teacher){
    return next(new AppError('No teacher with this ID.',404));
 }
 
 res.status(200).json({
    status: 'success',
    teacher
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
        users
    });
});

exports.getUser = (req, res) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined!'
    });
};

exports.createUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  if(!newUser){
     return next(new AppError('Invalid fields or duplicate user', 401));
  }

  res.status(201).json({
      status: 'success',
      newUser
  });
});
exports.updateUser = catchAsync(async(req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body);

  if(!user){
     return next(new AppError('Invalid fields or No user found with this ID', 404));
  }

  res.status(203).json({
      status: 'success',

  });
});


exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if(!user){
     return next(new AppError('No user found with this ID', 404));
  }

  res.status(203).json({
      status: 'success',
  });
});

Date.prototype.addHours= function(h){
  this.setHours(this.getHours()+h);
  return this;
}

exports.getTodayLectures = catchAsync(async (req, res, next) => {
  console.log(Date.now());
  const teachings = await Teaching.find({ teacher: req.user.id }).populate('lectures').populate("classe").populate("course");

  if(!teachings){
     return next(new AppError('User either not found or has no classes to teach.', 404));
  }

  const todayLectures = [];
 

  teachings.forEach(e => {

    if(e.lectures){
    e.lectures.forEach( el => {
      const classe = e.classe.name;
      const course = e.course.name;
      console.log(new Date().toISOString().substr(0,10)+" "+el.date.toString().substr(0,10));
        if(new Date().addHours(1).toISOString().substr(0,10) == el.date.toISOString().substr(0,10)){
          
          todayLectures.push({
            presences: el.presences,
            id: el._id,
            teaching: el.teaching,
            duration: el.duration,
            date: el.date,
            state: el.state,
            room: el.room,
            classe,
            course
          });
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
      todayLectures
  });
});
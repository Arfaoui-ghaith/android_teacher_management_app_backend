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
        lectures
    });

});


exports.getLectureByTeaching = catchAsync(async (req, res, next) => {

    const lectures = await Lecture.find({ teaching: req.params.teaching}).populate('teaching').populate('presences');

    if(!lectures){
       return next(new AppError('No lecture found.', 404));
    }

    res.status(200).json({
        status: 'success',
        resultat: lectures.length,
        lectures
    });
});

exports.getLecturesByTeacher = catchAsync(async (req, res, next) => {
    const teachings = await Teaching.find({ teacher: req.user.id }).populate('lectures').populate("classe").populate("course");
  
    if(!teachings){
       return next(new AppError('User either not found or has no teachings.', 404));
    }
  
    const todayLectures = [];
   
  
    teachings.forEach(e => {
  
      if(e.lectures){
      e.lectures.forEach( el => {
        const classe = e.classe.name;
        const course = e.course.name;
            
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
  
      });
      
      }
  
    });
  
    if(todayLectures.length === 0){
      return next(new AppError('No Lectures Found.', 404));
    }
  
    res.status(200).json({
        status: 'success',
        results: todayLectures.length,
        todayLectures
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

    
    const l = classe.students.length;
    
    students.map(async (student) => {
        
        const presence = await Presence.create({ student: student._id, lecture: newLecture._id});

        const s = await Student.findById(student._id);
        s.presences.push(presence._id);
        await s.save();

        try{
            newLecture.presences.push(presence._id);
        }catch(err){
            console.log("tab ligne 74");
            console.log(err.message);
        }

        if(newLecture.presences.length == l){
            
            try{
                await newLecture.save();
            }catch(err){
                console.log(err.message);
            }
        }

        
    });
    
    res.status(201).json({
        status: 'success',
        lecture: newLecture
    });
    
});

exports.getLecture = catchAsync(async (req, res, next) => {
   
    const lecture = await Lecture.findById(req.params.id).populate('teaching').populate('presences');

    if(!lecture){
       return next(new AppError('No class with this ID.',404));
    }
    
    res.status(200).json({
        status: 'success',
        lecture
    });
   
});

exports.updateLecture = catchAsync(async (req, res, next) => {
    

    const lecture = await Lecture.findByIdAndUpdate(req.params.id, req.body);

    if(!lecture){
        return next(new AppError('No lecture with this ID OR Invalid fields to update.',404));
    }

    res.status(201).json({
        status: 'success'
    });


});

exports.deleteLecture = catchAsync(async (req, res, next) => {

    const lecture = await Lecture.findByIdAndDelete(req.params.id);

    if(!lecture){
        return next(new AppError('No lecture with this ID.',404));
    }

    res.status(204).json({
        status: 'success',
    });

});
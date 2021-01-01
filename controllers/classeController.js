const Classe = require('./../models/classeModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllClasses = catchAsync(async (req, res, next) => {
   
        const classes = await Classe.find();

        if(!classes){
           return next(new AppError('No classes found.', 404));
        }
    
        res.status(200).json({
            status: 'success',
            results: classes.length,
            data: {
                classes
            }
        });

});

exports.getClasse = catchAsync(async (req, res, next) => {
   
        const classe = await Classe.findById(req.params.id).populate('students');

        if(!classe){
           return next(new AppError('No class with this ID.',404));
        }
        
        res.status(200).json({
            status: 'success',
            data: {
                classe
            }
        });
       
});

exports.createClasse = catchAsync(async (req, res, next) => {
    
    const newClasse = await Classe.create(req.body).catch(err => {
        return next(new AppError('Invalid class to create.',400));
    });

    res.status(201).json({
        status: 'success',
        data: {
            classe: newClasse
        }
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
            data: null
        });

});
const mongoose = require('mongoose');

const classeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A "classe" must have a name'],
        unique: true
    },
    students: [
        {
          type: mongoose.Schema.ObjectId,
          ref: 'Student',
        },
      ],
    teachings: [
        {
          type: mongoose.Schema.ObjectId,
          ref: 'Teaching',
          unique: true
        },
      ]
});

const Classe = mongoose.model('Classe', classeSchema);

module.exports = Classe;
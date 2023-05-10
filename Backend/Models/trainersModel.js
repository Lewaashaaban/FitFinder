const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//schema for the trainers in the gym
const TrainerSchema = new Schema({
    trainerName: {
        type: String,
        ref: 'User',
    },
    specialty: {
        type: String
    },
    classes: [{
        type: Schema.Types.ObjectId,
        ref: 'Class'
    }],
    gyms_selected: [{
        type: Schema.Types.ObjectId,
        rel: 'Gym',
    }]
},
    { timestamps: true }
);


module.exports = mongoose.model('Trainer', TrainerSchema);
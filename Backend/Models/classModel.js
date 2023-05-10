const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//schema for the classes in the gym
const ClassSchema = new Schema({

    className: {
        type: String,
        required: true,

    },
    description: {
        type: String
    },
    duration: {
        type: String,
        required: true,
    },
    gym: [{
        type: Schema.Types.ObjectId,
        ref: 'Gym',
    }],
    instructor: {
        type: String,
        ref: 'Trainer',
    },
    capacity: {
        type: String,
    },
    classMembers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Member',
        }
    ]
},
    { timestamps: true }
);

module.exports = mongoose.model('Class', ClassSchema);


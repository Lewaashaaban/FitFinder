const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//schema of the members in the gym
const MemberSchema = new Schema({
    MemberName: {
        type: String,
        ref: 'User'
    },
    gym_selected: {
        type: Schema.Types.ObjectId,
        ref: 'Gym'
    },
    classes: [{
        type: Schema.Types.ObjectId,
        ref: 'Class'
    }],
    location: {
        type: String,
    },
    body_weight: {
        type: String,
        trim: true,
    },
    height: {
        type: String,
        trim: true,
    }
},
    { timestamps: true });


module.exports = mongoose.model('Member', MemberSchema);
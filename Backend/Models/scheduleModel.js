const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scheduleSchema = new mongoose.Schema({
    gymID: {
        type: Schema.Types.ObjectId,
        ref: 'Gym',
        required: true,
    },
    day: {
        type: String,
        required: true,
        lowercase: true,
    },
    classes: [{
        classId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Class', required: true
        },
        start_time: {
            type: String,
            required: true
        },
        end_time: {
            type: String,
            required: true
        }
    }]
});

module.exports = mongoose.model('Schedule', scheduleSchema);

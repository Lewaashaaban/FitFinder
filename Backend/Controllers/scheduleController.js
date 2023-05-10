const Class = require('../Models/classModel');
const Schedule = require('../Models/scheduleModel');
const gym = require('../Models/gymModel');


// Create a new schedule for a day of the week
exports.createSchedule = async (req, res) => {
    try {
        const { day, classes } = req.body;

        // Check if classes exist in the database
        for (let i = 0; i < classes.length; i++) {
            const gymClass = await Class.findById(classes[i].classId);
            if (!gymClass) {
                return res.status(404).json({
                    message: `Class '${classes[i].classId}' not found`
                });
            }
        }
        // check if the gym is found
        const gymID = await gym.findById(req.body.gymID);
        if (!gymID) {
            res.status(404).json({ message: 'There is no gym with this ID' });
        }
        // check if the gym includes all the class found in the schedule
        for (let i = 0; i < classes.length; i++) {
            const gymClass = await Class.findById(classes[i].classId);

            if (!gymID.gymClasses.includes(gymClass._id)) {
                return res.status(404).json({
                    message: `The class ${classes[i].classId} is not found in this gym`
                });
            }
        }
        // check if there is already a schedule for this day 
        const existingSchedule = await Schedule.findOne({ day });
        if (existingSchedule) {
            return res.status(400).json({
                message: `Schedule already exists for gym '${gymID._id}' on '${day}'`
            });
        }
        const newSchedule = await Schedule.create({
            gymID: gymID._id,
            day,
            classes
        });
        // add the schedule of the correspoding day to the selected gym 
        await gymID.updateOne({ $push: { schedules: newSchedule._id } });

        res.status(201).json({ message: 'scehdule created successfully', data: newSchedule });

    } catch (err) {
        console.error(err);

    }
};


exports.updateSchedule = async (req, res) => {
    const { id } = req.params;
    const { classes, day } = req.body;


    try {
        const updatedSchedule = await Schedule.findByIdAndUpdate(id, { classes, day }, { new: true }
        );

        if (!updatedSchedule) {
            return res.status(404).json({ error: 'Schedule not found' });
        }

        res.json({ message: 'schedule updates successfully', data: updatedSchedule });

    } catch (error) {
        console.error(error);
    }
};

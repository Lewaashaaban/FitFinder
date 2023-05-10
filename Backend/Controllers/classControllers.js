const Class = require('../Models/classModel');
const member = require('../Models/memberModel');
const trainer = require('../Models/trainersModel');
const user = require('../Models/UserModels');
const gym = require('../Models/gymModel');


// function to create a gym class
exports.createClass = async (req, res) => {
    try {
        const gymID = await gym.findById(req.body.gymID);

        const classNAME = await Class.findOne({ className: req.body.className });

        if (classNAME) {
            return res.status(400).json({ message: `Class already exists with this name` });
        }

        // 2-check if the trainer with this id is found
        const trainerID = await trainer.findOne({ trainerName: req.body.instructor });

        if (!trainerID) {
            return res.status(400).json({ message: `Check the instructor Username` });
        }

        const newClass = await Class.create({
            className: req.body.className,
            instructor: req.body.instructor,
            duration: req.body.duration,
            capacity: req.body.capacity,
            gym: req.body.gymID,

        });
        // Add class to the gym 
        await newClass.updateOne({ $push: { gym: gymID._id } });
        await gymID.updateOne({ $push: { gymClasses: newClass._id } });

        return res.status(201).json({
            message: `class ${newClass.className} created successfully and added to ${gymID.gymName}`, data: newClass
        });

    } catch (error) {
        console.log(error);
    }
};

// // add a  class to a specific gym
// exports.addClassToGym = async (req, res) => {
//     try {
//         //check if the class is already found in the gym
//         const gymID = await gym.findById(req.body.gymID);
//         const classID = await Class.findById(req.body.classID);
//         console.log(gymID);

//         if (!classID) {
//             return res.status(404).json({ message: 'Class is not found' });

//         } else {
//             if ((classID.gym.includes(gymID._id))) {
//                 return res.status(404).json({ message: `${classID.className} is already added to ${gymID.gymName}` });
//             }
//         }

//         // Add class to the gym 
//         await classID.updateOne({ $push: { gym: gymID._id } });
//         await gymID.updateOne({ $push: { gymClasses: classID._id } });

//         return res.status(200).json({ message: `${classID.className} is  added to ${gymID.gymName} successfully` });


//     } catch (err) {
//         console.log(err);
//     }
// }


// get all the classes 
exports.getAllClasses = async (req, res) => {
    try {
        const classes = await Class.find();
        const classesCount = classes.length

        return res.status(201).json({ classesCount, data: classes });

    } catch (error) {
    }
};

// getting a specified class
exports.getClassById = async (req, res) => {
    try {

        const cls = await Class.findById(req.params.id);

        if (!cls) {
            return res.status(404).json({ message: 'Class not found' });
        }
        return res(201).json(cls);

    } catch (error) {
        console.log(error);
    }
};
// function to update the class
exports.updateClass = async (req, res) => {
    try {

        const classId = req.params.id;

        const { name, instructor, time, capacity } = req.body;

        const cls = await Class.findByIdAndUpdate(
            classId,
            { name, instructor, time, capacity },
            { new: true }
        );

        if (!cls) {
            return res.status(404).json({ message: 'Class not found' });
        }

        return res(201).json(cls);

    } catch (error) {
        console.log(error);
    }
};


// function to delete a class from the gym
exports.deleteClass = async (req, res) => {
    try {

        const classId = req.params.id;
        const cls = await Class.findByIdAndDelete(classId);

        if (!cls) {
            return res.status(404).json({ message: 'Class not found' });
        }

        res.json(cls);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const trainer = require('../Models/trainersModel');
const user = require('../Models/UserModels');
const gym = require('../Models/gymModel');


exports.addTrainers = async (req, res) => {
    try {
        const userID = await user.findOne({ userName: req.body.trainerName });

        if (!userID) {
            res.status(400).json({ message: 'Please login to have access to the membership, or make sure that the trainerName you have entered is a valid userName  ' });
        }
        const userName = await trainer.findOne({ trainerName: req.body.trainerName });

        if (userName) {

            return res.status(400).json({ message: `There is already a trainer with name ${userName.trainerName}` });
        }

        const gymID = await gym.findById(req.body.gymID);

        if (!gymID) {
            return res.status(400).json({ message: 'Gym is not found' });
        }

        if (gymID.gymTrainers.includes(userID)) {
            return res.status(400).json({ message: 'you are already a member in this gym' });
        }
        const newTrainer = await trainer.create({
            _id: userID._id,
            trainerName: userID.userName,
            gyms_selected: gymID,
            specialty: req.body.specialty,
            classes: req.body.classes,
        });
       
        await gymID.updateOne({ $push: { gymTrainers: newTrainer._id } });
        await newTrainer.updateOne({ $push: { gyms_selected: gymID } });

        return res.status(401).json({ message: 'You are now a trainer in this gym', data: newTrainer });

    } catch (err) {
        console.log(err);
    }
};

exports.removeTrainer = async (req, res) => {
    try {
        const userID = await trainer.findById(req.body.trainerID);


        if (!userID) {
            res.status(400).json({ message: `please login first` })
        }

        const gymID = await gym.findById(req.body.gym_selected);

        if (!gymID) {
            res.status(400).json({ message: `gym is not found` });
        }

        if (!(gymID.gymTrainers.includes(userID._id)) && !(userID.gyms_selected.includes(gymID._id))) {
            res.status(401).json({ message: `trainer is not in this gym` });
        }

        else {
            await gymID.updateOne({ $pull: { gymTrainers: userID._id } });
            await userID.updateOne({ $pull: { gyms_selected: gymID._id } });
            res.status(201).json({ message: `operation completed, trainer has left the gym` });
        }



    } catch (err) {
        console.log(err);
    }
};
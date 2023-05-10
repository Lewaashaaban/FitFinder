const member = require('../Models/memberModel');
const gym = require('../Models/gymModel');
const user = require('../Models/UserModels');
const Class = require('../Models/classModel');



// To add a member to a specific gym
exports.addMembers = async (req, res) => {
    try {
        const userID = await user.findById(req.body.userID);

        if (!userID) {
            res.status(400).json({ message: 'Please login to have access to the membership  ' });
        }

        const gymID = await gym.findById(req.body.gym_selected);

        if (!gymID) {
            res.status(400).json({ message: 'Gym is not found' });
        }
        console.log(gymID);
        if (gymID.gymMembers.includes(userID._id)) {
            res.status(400).json({ message: 'you are already a member in this gym' });
        }
        else {
            await gymID.updateOne({ $push: { gymMembers: userID } });
            await userID.updateOne({ $push: { gym_selected: gymID } });

        }
        const newMember = await member.create({
            _id: userID,
            MemberName: userID.userName,
            gym_selected: gymID._id,
            body_weight: req.body.body_weight,
            height: req.body.height,
        });
        res.status(401).json({ message: 'You are now a member of the gym', data: newMember });
    } catch (err) {
        console.log(err);
    }
}


// to remove a member
exports.removeMembers = async (req, res) => {
    try {
        const currentMemberId = await user.findById(req.body.MemberID);


        if (!currentMemberId) {
            res.status(400).json({ message: 'please login before you start this request' });
        }

        const gymID = await gym.findById(req.body.gym_selected);

        if (!gymID) {
            res.status(400).json({ message: 'Gym is not found' });
        }
        console.log(gymID.gymMembers)

        if ((!gymID.gymMembers.includes(currentMemberId._id)) && !(currentMemberId.gym_selected.includes(gymID._id))) {
            res.status(401).json({ message: 'you are not a member of this gym ,or the gym is no longer available' });
        }

        else {
            await gymID.updateOne({ $pull: { gymMembers: currentMemberId._id } });
            await currentMemberId.updateOne({ $pull: { gym_selected: gymID._id } });
            res.status(201).json({ message: `operation completed, ${currentMemberId.fullName} has left the gym` });
        }

    } catch (err) {
        console.log(err);
    }
}

// to add a member to a specific class in a specific gym
exports.addMemberToClass = async (req, res) => {
    try {
        // check if the loggedin user is already a member in this gym 
        const userID = await member.findOne({ MemberName: req.body.currentMemberId });
        console.log('userID', userID);
        if (!userID) {
            res.status(404).json({ message: 'We cannot find a member with this ID' });
        }
        //check if the class is found in the gym
        const gymID = await gym.findById(req.body.gymID);
        const classID = await Class.findById(req.body.classID);
        if (!(gymID.gymClasses.includes(classID._id))) {
            res.status(404).json({ message: ` There is no ${classID.className} class in this gym` });

        }

        // check if there is a call with this id
        if (!classID) {
            res.status(404).json({ message: 'Class is not found' });
        }
        // check if the user is already a member in the class
        if ((classID.classMembers.includes(userID._id)) || (userID.classes.includes(classID._id))) {
            res.status(404).json({ message: 'you already participated in this class' });
        }
        //  check if the class memebers did not exceed the class capacity

        const classMembers = { Class: classID };
        const memberCount = await Class.countDocuments(classMembers);
        console.log(`The class has ${memberCount} members.`);

        if (memberCount == classID.capacity) {
            res.status(400).json({ message: 'Class is full' });
        }
        // 5- add member to class
        else {
            await classID.updateOne({ $push: { classMembers: userID._id } });
            await userID.updateOne({ $push: { classes: classID._id } });
            res.status(201).json({ message: 'member added successfully' });
        }


    } catch (err) {
        console.log(err);
    }
}
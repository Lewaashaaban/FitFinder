const gym = require('../Models/gymModel');
// get all the gyms
exports.getGym = async (req, res) => {
    try {

        const gyms = await gym.find();
        if (gyms == 0) {
            res.status(404).json({ message: ' no gyms found' });

        }
        res.status(200).json({ success: true, data: gyms });

    } catch (err) {
        console.log(err);
    }
};

// create a gym
exports.createGym = async (req, res) => {

    try {
        const checkGym = await gym.findOne({ gymName: req.body.gymName });

        if (checkGym) {
            return res.status(404).json({ message: 'gym with this name already exists' });
        }

        const newGym = await gym.create({
            gymName: req.body.gymName,
            region: req.body.region,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
            gymClasses:req.body.gymClasses,
            image:req.body.image,
            description:req.body.description,

        });
        return res.status(201).json({ message: 'Gym Created successfully', data: newGym });

    } catch (err) {
        console.log(err);
    }
};

// update gym
exports.updateGym = async (req, res) => {

    try {
        const Gym = await gym.findByIdAndUpdate(req.params.id, req.body, { new: true });
        console.log(Gym);

        if (!Gym) {
            return res.status(400).json({ message: 'recheck the gymid please' })
        }

        res.json(Gym);

    } catch (err) {
        console.log(err);
    }


}

// deletegym
exports.deleteGym = async (req, res) => {

    try {
        const Gym = await gym.findByIdAndDelete(req.params.id);

        if (!Gym) {
            res.status(400).json({ message: 'recheck the gymID' });
        }

        res.status(200).json({ message: 'Gym deleted successfully' });

    } catch (err) {

        console.log(err);
    }
};

exports.countGymsByRegion = async (req, res) => {

    try {
        const gyms = await gym.find({ region: req.params.region });

        const count = gyms.length;

        res.status(201).json({ count, gyms: gyms });

    } catch (err) {
        console.log(err);
    }
}



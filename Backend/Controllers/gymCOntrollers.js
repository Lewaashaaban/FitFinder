const gym = require("../Models/gymModel");
const User = require("../Models/UserModels");
require("dotenv").config();

// get all the gyms
exports.getAllGyms = async (req, res) => {
  try {
    const gyms = await gym.find();
    // if (gyms == 0) {
    //   return res.status(404).json({ message: "no gyms found" });
    // }
    res.status(200).json(gyms);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error", err });
  }
};

// create a gym
exports.createGym = async (req, res) => {
  try {
    const checkGym = await gym.findOne({ gymName: req.body.gymName });

    const creator = req.body.creator;
    if (checkGym) {
      return res
        .status(404)
        .json({ message: "gym with this name already exists" });
    }
    const user = await User.findOne({ _id: creator });
    // if (!user) {
    //   return res.status(404).json({ message: "gym owner is not found" });
    // }

    const newGym = await gym.create({
      gymName: req.body.gymName,
      region: req.body.region,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      gymClasses: req.body.gymClasses,
      image: req.body.image,
      description: req.body.description,
      creator: creator,
    });

    return res
      .status(200)
      .json( newGym );
  } catch (err) {
    console.log(err);
  }
};

// update gym
exports.updateGym = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const {
      gymName,
      region,
      address,
      gymTrainers,
      description,
      gymClasses,
      image,
    } = req.body;
    // const Gym = await gym.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    // });
    const photoUrl = "demo";

    const selectedGym = await gym.findByIdAndUpdate(
      { _id: id },
      {
        gymName,
        description,
        gymClasses,
        address,
        region,
        gymTrainers,
        image: photoUrl,
      }
    );
    if (!selectedGym) {
      return res.status(400).json({ message: "recheck the gymid please" });
    }
    return res.status(200).json({ message: "Property updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

// deletegym
exports.deleteGym = async (req, res) => {
  try {
    const Gym = await gym.findByIdAndDelete(req.params.id);

    if (!Gym) {
      return res.status(400).json({ message: "recheck the gymID" });
    }

    await User.updateOne({ _id: Gym.creator }, { $pull: { allGyms: gym._id } });
    return res.status(200).json({ message: "Gym deleted successfully" });
  } catch (err) {
    console.log(err);
  }
};

exports.countGymsByRegion = async (req, res) => {
  try {
    const gyms = await gym.find({ region: req.params.region });

    // const count = gyms.length;

    res.status(200).json(gyms);
  } catch (err) {
    console.log(err);
  }
};

exports.getGymDetails = async (req, res) => {
 
  try {
    const GymExists = await gym.findOne({ _id: req.params.id });
    
    if (GymExists) {
      return res.status(200).json(GymExists);
    } else {
      return res.status(404).json({ message: "Property not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

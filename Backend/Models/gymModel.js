const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GymSchema = new mongoose.Schema(
  {
    gymName: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: [true, "Please add your Region"],
      lowercase: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
    },
    gymTrainers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Trainer",
      },
    ],
    gymMembers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Member",
      },
    ],
    gymClasses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Class",
      },
    ],
    schedules: [
      {
        type: Schema.Types.ObjectId,
        ref: "Schedule",
      },
    ],
    phoneNumber: {
      type: String,
    },
    // website: {
    //   type: String,
    // },
    image: {
      type: String,
      required:true,
    },
    description: {
      type: String,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gym", GymSchema);

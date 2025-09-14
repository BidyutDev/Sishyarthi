import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true,
    trim: true,
  },
  personalDetails: {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    middleName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ["obc", "sc", "st", "general", "other"],
      required: true,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    email : {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/.+\@.+\..+/, "Please fill a valid email address"]
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
  },
  familyDetails: {
    fatherName: {
      type: String,
      trim: true,
      required: true,
    },
    motherName: {
      type: String,
      trim: true,
      required: true,
    },
    fatherOccupation: {
      type: String,
      trim: true,
    },
    motherOccupation: {
      type: String,
      trim: true,
    },
    siblings: {
      type: Number,
      required: true,
      min: 0,
    },
    familyIncome: {
      type: Number,
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Student = mongoose.model("Student", studentSchema);

export default Student;

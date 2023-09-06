const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    address: String,
    nationality: String,
    enrollmentDate: {
        type: Date,
        required: true
    },
    graduationDate: Date,
    program: {
        type: String,
        required: true
    },
    gpa: Number,
    status: String,
    emergencyContact: {
        name: String,
        phoneNumber: String
    },
    fees: {
        tuition: Number,
        scholarships: Number,
        financialAid: Number
    },
    added_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    }
}, {timestamps: true});

const Student = mongoose.model("Students", studentSchema);

module.exports = Student;
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Student = require("../models/Student");
const ErrorHandler = require("../utils/errorHandler");

exports.createStudent = catchAsyncErrors(async (req, res, next) => {
    const { name, dob, gender, email, phone, address, nationality, enrollmentDate, program } = req.body;

    try {
        const student = await Student.create({
            name, dob, gender, email, phone, address, nationality, enrollmentDate, program, added_by: req.user.id
        });

        res.status(201).json({
            success: true,
            message: "Student Registration Successful"
        })
    } catch (error) {
        // Check if the error is a duplicate key error (MongoDB 11000 error)
        if (error.code === 11000 && error.keyPattern && error.keyValue) {
            // Handle the duplicate key error here
            res.status(400).json({
                success: false,
                message: "Duplicate key error. This student may already exists.",
            });
        } else {
            // Handle other errors, such as validation errors or unexpected errors
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
            });
        }
    }
})

exports.getStudents = catchAsyncErrors(async (req, res, next) => {
    const desiredAttributes = ['name', 'dob', 'gender', 'address', 'nationality', 'program'];
    if (req.user == undefined) {
        const students = await Student.find({}, desiredAttributes);
        res.status(200).json({
            success: true,
            message: "Student List",
            data: students
        })
    } else {
        if (req.user.role == "admin") {
            const students = await Student.find();
            res.status(200).json({
                success: true,
                message: "Student List",
                data: students
            })
        } else {
            const students = await Student.find({}, desiredAttributes);
            res.status(200).json({
                success: true,
                message: "Student List",
                data: students
            })
        }
    }
})

exports.getStudentById = catchAsyncErrors(async (req, res, next) => {
    const desiredAttributes = ['name', 'dob', 'gender', 'address', 'nationality', 'program'];
    if (req.user == undefined) {
        const student = await Student.findById(req.params.id, desiredAttributes);

        if (!student) {
            return next(new ErrorHandler("Student not found", 401));
        }

        res.status(200).json({
            success: true,
            message: "Detail of a student",
            data: student
        })
    } else {
        if (req.user.role == "admin") {
            const student = await Student.findById(req.params.id);

            if (!student) {
                return next(new ErrorHandler("Student not found", 401));
            }

            res.status(200).json({
                success: true,
                message: "Detail of a student",
                data: student
            })
        } else {
            const student = await Student.findById(req.params.id, desiredAttributes);

            if (!student) {
                return next(new ErrorHandler("Student not found", 401));
            }

            res.status(200).json({
                success: true,
                message: "Detail of a student",
                data: student
            })
        }
    }
})

exports.updateStudent = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    const updateFields = {};
    const { name, dob, gender, email, phone, address, nationality, enrollmentDate, program } = req.body;

    if (name) updateFields.name = name;
    if (dob) updateFields.dob = dob;
    if (gender) updateFields.gender = gender;
    if (email) updateFields.email = email;
    if (phone) updateFields.phone = phone;
    if (address) updateFields.address = address;
    if (nationality) updateFields.nationality = nationality;
    if (enrollmentDate) updateFields.enrollmentDate = enrollmentDate;
    if (program) updateFields.program = program;

    // console.log(updateFields);
    // console.log(id);

    const student = await Student.findByIdAndUpdate(id, {
        $set: {
            ...updateFields
        }
    }, { new: true })

    if (!student) {
        return next(new ErrorHandler("Student not found", 404));
    }

    res.status(200).json({
        success: true,
        message: "Student updated successfully"
    })
})

exports.deleteStudent = catchAsyncErrors(async (req, res, next) => {
    console.log("Trying to delete")
    const student = await Student.findById(req.params.id);

    if (!student) {
        return next(new ErrorHandler("Student not found", 404));
    }

    await student.deleteOne();

    res.status(200).json({
        success: true,
        message: "Student Deleted Successfully"
    });
})

exports.searchStudent = catchAsyncErrors(async (req, res, next) => {
    // console.log("trying to search student")
    try {
        const searchName = req.query.keyword;
        // console.log("Search Keyword:", searchName);

        const regex = new RegExp(searchName, 'i');

        const students = await Student.find({ name: regex });

        if (students.length == 0) {
            res.status(200).json({
                success: false,
                message: "No Results Found"
            })
        } else {
            res.status(200).json({
                success: true,
                message: "Result for search query: " + searchName,
                data: students
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
})
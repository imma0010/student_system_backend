const express = require("express");
const { isAuthenticatedUser, authorizedRole } = require("../middlewares/auth");
const { createStudent, getStudents, getStudentById, updateStudent, deleteStudent, searchStudent } = require("../controllers/studentController");

const router = express.Router();

router.route("/student/registration").post(isAuthenticatedUser, authorizedRole("admin"), createStudent);
router.route("/students").get(isAuthenticatedUser, getStudents);
router.route("/student/search").get(searchStudent);
router.route("/student/:id").get(isAuthenticatedUser, getStudentById);
router.route("/student/:id").put(isAuthenticatedUser, authorizedRole("admin"), updateStudent);
router.route("/student/:id").delete(isAuthenticatedUser, authorizedRole("admin"), deleteStudent);
// router.route("/student/search").get(searchStudent);

module.exports = router;
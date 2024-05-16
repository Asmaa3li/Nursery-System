const express = require("express");
const controller = require("./../Controller/teacherController");
const { isAdmin, isTeacher } = require("./../MiddleWares/authenticationMW");
const router = express.Router();


router.route("/teachers/supervisors").get(isAdmin, controller.getTeacherSupervisors);

router
  .route("/teachers")
  .get(isAdmin, controller.getAllTeachers)
  .post(isAdmin, controller.addTeacher);

router
  .route("/teachers/:id")
  .get(isAdmin, controller.getTeacher)
  .delete(isAdmin, controller.deleteTeacher)
  .patch(isAdmin, isTeacher, controller.updateTeacher);


module.exports = router;

// CORS which domain should access backend it provides the concepts
// "ACCESSING" in general and with configuration





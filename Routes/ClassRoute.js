const express = require("express");
const controller = require("./../Controller/classController");
const { isAdmin, isTeacher } = require("./../MiddleWares/authenticationMW");
const router = express.Router();


router.route("/class/teacher/:id").get(isAdmin, controller.getTeacherInfo);
router.route("/class/child/:id").get(isAdmin, controller.getChildrenInfo);

router
  .route("/class")
  .get(isAdmin, controller.getAllClasses)
  .post(isAdmin, controller.addClass);

router
  .route("/class/:id")
  .get(isAdmin, isTeacher, controller.getClass)
  .delete(isAdmin, controller.deleteClass)
  .patch(isAdmin, controller.updateClass);

module.exports = router;


const express = require("express");
const controller = require("./../Controller/childController");
const { isAdmin, isChild } = require("./../MiddleWares/authenticationMW.js");
const router = express.Router();

router
  .route("/child")
  .get(isAdmin, controller.getAllChildren)
  .post(isAdmin, controller.addChild);

router
  .route("/child/:id")
  .get(isAdmin, controller.getChild)
  .delete(isAdmin, controller.deleteChild)
  .patch(isAdmin, isChild, controller.updateChild);

  //PATCH updates single field such as where cond
  // but PUT updates the whole schema 

module.exports = router;



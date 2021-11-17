const express = require("express");
const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} = require("../controller/courses");

const Course = require("../models/Course");
const advancedResults = require("../middleware/advancedResults");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(advancedResults(Course, {path: "bootcamp",
      select:  "name description",
    }), 
    getCourses
  )
  .post(addCourse); // getCourse in mounted on bootcamp router

router.route("/:id").get(getCourse).put(updateCourse).delete(deleteCourse);

module.exports = router;

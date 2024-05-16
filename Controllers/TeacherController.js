const teacherSchema = require("./../Models/TeacherModel");
const classSchema = require("./../Models/ClassModel");

// Get All Teachers
exports.getAllTeachers = (request, response, next) => {
  teacherSchema.find({})
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => next(error));
};


// Get single Teacher
exports.getTeacher = (request, response, next) => {
  teacherSchema.findOne({ _id: request.params.id })
    .then((object) => {
      if (!object) throw new Error("Teacher does not exist");

      response.status(200).json({ object });
    })
    .catch((error) => next(error));
};


// Add a Teacher
exports.addTeacher = (request, response, next) => {
  let object = new teacherSchema(request.body);
  object
    .save()
    .then((data) => {
      response.status(201).json({ data });
    })
    .catch((error) => next(error));
};


// Update a Teacher
exports.updateTeacher = (request, response, next) => {
  if (request.params.id == request.token._id || request.token.role == "admin"){
    const { id } = request.params;
    const newData = request.body;
    teacherSchema.findByIdAndUpdate(id, newData, { new: true }) 
      .then((updatedTeacher) => {
        if (!updatedTeacher) {
          return response.status(404).json({ message: "Teacher not found" });
        }
        response.status(200).json({ message: "Teacher updated successfully", data: updatedTeacher });
      })
      .catch((error) => next(error));
  }
  response.status(500).json({ message: "Not allowed"});
};


// Delete a Teacher
exports.deleteTeacher = (request, response, next) => {
  teacherSchema.deleteOne({ _id: request.params.id })
    .then((object) => {
      if (!object) throw new Error("Student does not exist");
      response.status(200).json({ object });
    })
    .catch((error) => next(error));
};


//  Get all class supervisors
exports.getTeacherSupervisors = (request, response, next) => {
  classSchema.find()
    .populate({ path: "supervisor", select: {fullName: 1, email: 1} })
    // Executes piece of code if there is error 
    .exec((err, classes) => {
      if (err) {
        return next(err);
      }
      // check first if the id exists if it exists display the data
      // map is a loop but somehow a quick one which returns a new array
      const supervisors = classes.map(classData => ({
        class: classData.name,
        supervisor: classData.supervisor ? {
          fullName: classData.supervisor.fullName,
          email: classData.supervisor.email
        } : null
      }));
      response.status(200).json({ data: supervisors });
    });
};
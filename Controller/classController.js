const classSchema = require("./../Model/classModel");

// Get All Classes 
exports.getAllClasses = (request, response, next) => {
  classSchema.find({})
    .then((data) => {
      //check condition
      response.status(200).json({ data });
    })
    .catch((error) => next(error));
};


// Get single Class
exports.getClass = (request, response, next) => {
  classSchema.findOne({ _id: request.params.id })
    .then((object) => {
      if (!object) throw new Error("Class does not exist");

      response.status(200).json({ object });
    })
    .catch((error) => next(error));
};


// Add a Class 
exports.addClass = (request, response, next) => {
  let object = new classSchema(request.body);
  object
    .save()
    .then((data) => {
      response.status(201).json({ data });
    })
    .catch((error) => next(error));
};

// Update a Class 
exports.updateClass = (request, response, next) => {
    const { id } = request.params;
    const newData = request.body;
    classSchema.findByIdAndUpdate(id, newData, { new: true }) 
      .then((updatedClass) => {
        if (!updatedClass) {
          return response.status(404).json({ message: "Class not found" });
        }
        response.status(200).json({ message: "Class updated successfully", data: updatedClass });
      })
      .catch((error) => next(error));
};


// Delete a Class 
exports.deleteClass = (request, respone, next) => {
  classSchema.deleteOne({ _id: request.params.id })
    .then((object) => {
      if (!object) throw new Error("Class does not exist");
      response.status(200).json({ object });
    })
    .catch((error) => next(error));
};



// Get all class children - admin / supervisors
exports.getChildrenInfo = (request, response, next) => {
  classSchema
    .findOne({ _id: request.params.id })
    .populate({ path: "children", model: "child" })
    .then((object) => {
      if (!object) throw new Error("This class doesn't have children yet!");
      response
        .status(200)
        .json({ message: "Class child fetched info successfully", object });
    })
    .catch((error) => next(error));
};


// Get all class supervisors - admin
exports.getTeacherInfo = (request, response, next) => {
  classSchema
    .findOne({ _id: request.params.id })
    .populate({ path: "supervisor", model: "teacher" })
    .then((object) => {
      if (!object) throw new Error("This class doesn't have a supervisor!");
      response
        .status(200)
        .json({ message: "Class supervisor info fetched successfully", object });
    })
    .catch((error) => next(error));
};
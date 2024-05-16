const childSchema = require("./../Model/childModel");

// Get All Children
exports.getAllChildren = (request, response, next) => {
  childSchema.find({})
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => next(error));
};


// Get single Child
exports.getChild = (request, response, next) => {
  childSchema.findOne({ _id: request.params.id })
    .then((object) => {
      if (!object) throw new Error("Child does not exist");

      response.status(200).json({ object });
    })
    .catch((error) => next(error));
};


// Add a Child
exports.addChild = (request, respone, next) => {
  let object = new childSchema(request.body);
  object
    .save()
    .then((data) => {
      respone.status(201).json({ data });
    })
    .catch((error) => next(error));
};


// Update a Child
exports.updateChild = (request, response, next) => {
  if (request.params.id == request.token._id || request.token.role == "admin") {
  const { id } = request.params;
  const newData = request.body;
  childSchema.findByIdAndUpdate(id, newData, { new: true }) 
    .then((updatedTeacher) => {
      if (!updatedTeacher) {
        return response.status(404).json({ message: "Child not found" });
      }
      response.status(200).json({ message: "Child updated successfully", data: updatedTeacher });
    })
    .catch((error) => next(error));
    response.status(500).json({ message: "Not allowed"});
  }
};


// Delete a Child
exports.deleteChild = (request, respone, next) => {
  childSchema.deleteOne({ _id: request.params.id })
    .then((object) => {
      if (!object) throw new Error("Child does not exist");
      respone.status(200).json({ object });
    })
    .catch((error) => next(error));
};



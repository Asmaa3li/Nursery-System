const jwt = require("jsonwebtoken");

//default export
module.exports = (req, res, next) => {
  // make sure that header has token
  try {
    // split by space in order tp get rid of the word "bearer"
    const token = req.get("authorization").split(" ")[1];
    // verfication
    let decodedToken = jwt.verify(token, "nurseryApp");
    req.token = decodedToken;
    next();
  } catch (error) {
    error.message = "Not Authenticated";
    error.status = 401;
    next(error);
  }
};

module.exports.isAdmin = (req, res, next) => {
  if (req.token.role == "admin") next();
  else {
    let error = new Error("You don't have permission to access this resource");
    error.status = 403;
    next(error);
  }
};

module.exports.isTeacher = (req, res, next) => {
  if (req.token.role == "teacher") next();
  else {
    let error = new Error("You don't have permission to access this resource");
    error.status = 403;
    next(error);
  }
};

module.exports.isChild = (req, res, next) => {
if (req.token.role == "child") next();
else {
    let error = new Error("You don't have permission to access this resource");
    error.status = 403;
    next(error);
}
};

// module.exports.isAdminOrTeacher = (req, res, next) => {
//   if (req.token.role == "student" || req.token.role == "admin") next();
//   else {
//     let error = new Error("Not Authorized");
//     error.status = 403;
//     next(error);
//   }
// };

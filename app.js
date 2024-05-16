const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const teacherRouter = require("./Routes/TeacherRoute");
const childRouter = require("./Routes/ChildRoute");
const classRouter = require("./Routes/ClassRoute");

const loginRouter = require("./Routes/AuthenticationRoute");
const authMW = require("./Middlewares/authenticationMW");

// Initializing the server
const server = express();

// server.use(morgan('dev'));

// Connecting to the Database and Server
const mongoURL = process.env.MONGO_URL || "mongodb://localhost:27017/nodeDB";

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("Database Connected Successfully");
    server.listen(3000, () => {
      console.log("The server is listening on port 3000");
    });
  })
  .catch((error) => {
    console.log("Database Connection Problem: " + error);
  });

// First MW logging values
server.use((request, response, next) => {
  console.log("Hello from first MW", request.url, request.method);
  next();
});

// Using JSON
server.use(express.json());

// Authentication
server.use(loginRouter);
server.use(authMW);

// Using Routers
server.use(teacherRouter);
server.use(childRouter);
server.use(classRouter);

// Not Found Middleware
server.use((request, response) => {
  response.status(404).json({ message: "Not Found" });
});

// Error Middleware
server.use((error, request, response, next) => {
  response.status(500).json({ Error: "Error: " + error });
});


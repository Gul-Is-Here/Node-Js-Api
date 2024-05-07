const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Course = require("./model/course.model.js"); // Import the Mongoose model

app.use(bodyParser.json()); // Middleware to parse JSON bodies

// Connection to the database
mongoose
  .connect(
    "mongodb+srv://urduliterature59:qEkd9P8ISG1iDfDF@backenddb.t2dw75r.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB"
  )

  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((error) => {
    console.log("Connection failed", error);
  });

// Get Api Method
app.get("/", (req, res) => {
  res.send("Hello World!!");
});

// Using Get Method to get all the courses
app.get("/api/courses", async (req, res) => {
  try {
    const courses = await Course.find();
    res.send(courses);
  } catch (error) {
    res.status(500).send("Error retrieving courses");
  }
});

// Using Get method to get a single item in the api list

// Using Get method to get a single item in the API list by index
app.get("/api/courses/index/:index", async (req, res) => {
  try {
    const courses = await Course.find();
    const index = parseInt(req.params.index);
    if (index >= 0 && index < courses.length) {
      res.send(courses[index]);
    } else {
      res.status(404).send("Index out of range");
    }
  } catch (error) {
    res.status(500).send("Error retrieving course");
  }
});

// Get API Method by ID or index
app.get("/api/courses/:idOrIndex", async (req, res) => {
  try {
    const idOrIndex = req.params.idOrIndex;
    let course;
    if (!isNaN(idOrIndex)) {
      // If it's a number, treat it as an index
      const courses = await Course.find();
      const index = parseInt(idOrIndex);
      if (index >= 0 && index < courses.length) {
        course = courses[index];
      }
    } else {
      // Otherwise, treat it as an ID
      course = await Course.findById(idOrIndex);
    }

    if (!course) {
      return res.status(404).send("Course not found");
    }
    res.send(course);
  } catch (error) {
    res.status(500).send("Error retrieving course");
  }
});

// Post Method
app.post("/api/courses", async (req, res) => {
  const { name, course, time_slot, other_properties } = req.body;

  try {
    const newCourse = new Course({
      name,
      course,
      time_slot,
      other_properties,
    });
    const savedCourse = await newCourse.save();
    res.status(201).send(savedCourse);
  } catch (error) {
    res.status(400).send("Error creating course");
  }
});

// Put Method
app.put("/api/courses/:id", async (req, res) => {
  const { name, course, time_slot, other_properties } = req.body;

  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      {
        name,
        course,
        time_slot,
        other_properties,
      },
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).send("The course with the given ID was not found");
    }

    res.send(updatedCourse);
  } catch (error) {
    res.status(400).send("Error updating course");
  }
});

// Delete Method
app.delete("/api/courses/:id", async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse) {
      return res.status(404).send("The course with the given ID was not found");
    }
    res.send(deletedCourse);
  } catch (error) {
    res.status(400).send("Error deleting course");
  }
});

// PORT
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

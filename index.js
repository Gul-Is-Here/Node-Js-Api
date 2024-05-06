const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json()); // Middleware to parse JSON bodies

// Sample data
let courses = {
  users: [
    {
      id: 1,
      name: "John Doe",
      course: "Mathematics",
      time_slot: "Morning",
      other_properties: {
        age: 25,
        email: "john@example.com",
        location: "New York",
      },
    },
    {
      id: 2,
      name: "Jane Smith",
      course: "Computer Science",
      time_slot: "Afternoon",
      other_properties: {
        age: 30,
        email: "jane@example.com",
        location: "San Francisco",
      },
    },
  ],
};

// Get Api Method
app.get("/", (req, res) => {
  res.send("Hello World!!");
});

// Using Get Method to get all the courses
app.get("/api/courses", (req, res) => {
  res.send(courses);
});

// Using Get method to get the single item in the api list
app.get("/api/courses/:id", (req, res) => {
  const course = courses.users.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send("The course with the given ID was not found");
  }
  res.send(course);
});

// Post Method 
app.post('/api/courses', (req, res) => {
  const { name, course, time_slot, other_properties } = req.body;

  // Check if all required fields are provided
  if (!name || !course || !time_slot || !other_properties) {
    return res.status(400).send("All fields are required");
  }

  // Generate a unique ID
  const id = courses.users.length + 1;

  // Construct the new course object
  const newCourse = {
    id,
    name,
    course,
    time_slot,
    other_properties
  };

  // Add the new course to the courses array
  courses.users.push(newCourse);

  // Return the newly created course
  res.status(201).send(newCourse);
});

// Put Method
app.put('/api/courses/:id', (req, res) => {
  const { name, course, time_slot, other_properties } = req.body;
  const courseIndex = courses.users.findIndex((c) => c.id === parseInt(req.params.id));

  // Check if course exists
  if (courseIndex === -1) {
    return res.status(404).send("The course with the given ID was not found");
  }

  // Check if all required fields are provided
  if (!name || !course || !time_slot || !other_properties) {
    return res.status(400).send("All fields are required");
  }

  // Update the course
  courses.users[courseIndex] = {
    id: parseInt(req.params.id),
    name,
    course,
    time_slot,
    other_properties
  };

  res.send(courses.users[courseIndex]);
});

// Delete Method
app.delete('/api/courses/:id', (req, res) => {
  const courseId = parseInt(req.params.id);
  const courseIndex = courses.users.findIndex((c) => c.id === courseId);

  // Check if course exists
  if (courseIndex === -1) {
    return res.status(404).send("The course with the given ID was not found");
  }

  // Remove the course from the array
  const deletedCourse = courses.users.splice(courseIndex, 1)[0];

  // Shift IDs of remaining courses if necessary
  for (let i = courseIndex; i < courses.users.length; i++) {
    courses.users[i].id--;
  }

  res.send(deletedCourse);
});

// PORT
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

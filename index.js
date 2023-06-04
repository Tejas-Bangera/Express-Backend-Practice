const express = require('express')
const app = express()
const port = 3000

// Add middleware to the application, to parse JSON data
// in request body and make it available on req.body
app.use(express.json());

const users = [];
let userId = 1;
const questions = [{
  title: "Two states",
  description: "Given an array, return the max of the array",
  testCases: [{
    input: "[1, 2, 3, 4, 5]",
    output: "5"
  }]
}];

const submissions = [];

function findUser(email) {
  return users.find((user) => user.email === email);
}

app.get('/', (req, res) => {
  res.sendFile('E:/VS Workspace/express-backend-app/html/index.html');
})

app.post('/signup', (req, res) => {
  const data = req.body;
  // Check if user already exists
  const user = findUser(data.email);
  // If user exists, return 
  if(user) {
    return res.status(409).send('User already exists!');
  }

  users.push({userId, ...data});
  userId++;
  // res.send(users);
  res.send("Signup successful!");
})

app.post('/login', (req, res) => {
  // Add logic to decode body
  // body should have email and password
  const data = req.body;
  // Check if the user with the given email exists in the USERS array
  const user = users.find((u) => u.email === data.email);
  // If user does not exist
  if(!user) {
    res.status(404).send(`User ${data.email} not found!`);
  }
  // Also ensure that the password is the same

  // If the password is the same, return 200 status code to the client
  // If the password doesn't match, return 401 unauthorized to the client
  res.send('Login here!')
})

app.get('/questions', (req, res) => {
  // Return the user all the questions in the questions array
  res.send('List of questions')
})

app.get('/submissions', (req, res) => {
  // Return the users submissions for this  problem
  res.send('List of submissions')
})

app.post('/submissions', (req, res) => {
  // Let the user submit a problem, randomly accept or reject the solution
  // Store the submission in the submission array
  res.send('List of submissions')
})

// Hard to dos
// Create a route that lets an admin add a new problem
// Ensure that only admins can do that.

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
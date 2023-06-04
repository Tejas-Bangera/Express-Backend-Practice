const express = require('express')
const app = express()
const port = 3000

// Add middleware to the application, to parse JSON data
// in request body and make it available on req.body
app.use(express.json());

const users = [];
let userId = 1;
const questions = [{
  id: 1,
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

/**
 * Main page
 */
app.get('/', (req, res) => {
  res.sendFile('E:/VS Workspace/express-backend-app/leetcode-clone/html/index.html');
})

/**
 * Signup route
 */
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

/**
 * Login route
 */
app.post('/login', (req, res) => {
  const data = req.body;
  const user = users.find((u) => u.email === data.email);
  // If user does not exist
  if(!user) {
    return res.status(404).send(`User ${data.email} not found!`);
  }

  // Match password
  return (data.password === user.password) ? res.send("Login successful!") : res.status(403).send("Invalid login credentials!");
})

/**
 * Get questions route
 */
app.get('/questions', (req, res) => {
  // Return the user all the questions in the questions array
  res.send(questions);
})

/**
 * Get user submissions route
 */
app.get('/submissions', (req, res) => {
  // Return the users submissions for this problem

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
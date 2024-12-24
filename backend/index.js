const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { verifyCode } = require('./codeVerifier');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Sample Problem
const problem = {
  prompt: 'Write me a variable named "shawn" and assign it the value 1.',
  language: 'javascript',
  solution: {
    code: 'let shawn = 1;',
    variableName: 'shawn',
    expectedValue: 1,
  },
};

// Routes
app.get('/', (req, res) => {
  res.send('Questions App Backend is Running');
});

// Get Problem Endpoint
app.get('/api/problem', (req, res) => {
  res.json({ prompt: problem.prompt });
});

// Verify Code Endpoint
app.post('/api/verify', (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ valid: false, error: 'No code provided.' });
  }

  const { variableName, expectedValue } = problem.solution;
  const result = verifyCode(code, variableName, expectedValue);

  res.json(result);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

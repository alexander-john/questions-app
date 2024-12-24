// frontend/script.js

const API_BASE_URL = 'http://localhost:5000/api'; // Update if backend is hosted elsewhere

document.addEventListener('DOMContentLoaded', () => {
  fetchProblem();
  document.getElementById('submit-btn').addEventListener('click', submitCode);
});

/**
 * Fetches the current problem from the backend.
 */
function fetchProblem() {
  fetch(`${API_BASE_URL}/problem`)
    .then(response => response.json())
    .then(data => {
      document.getElementById('problem-prompt').innerText = data.prompt;
    })
    .catch(err => {
      console.error('Error fetching problem:', err);
      document.getElementById('problem-prompt').innerText = 'Failed to load problem.';
    });
}

/**
 * Submits the user's code to the backend for verification.
 */
function submitCode() {
  const code = document.getElementById('code-input').value.trim();

  if (!code) {
    displayResult('Please enter your code before submitting.', false);
    return;
  }

  fetch(`${API_BASE_URL}/verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ code })
  })
    .then(response => response.json())
    .then(data => {
      if (data.valid) {
        displayResult('✅ Correct! Your code is valid.', true);
      } else {
        displayResult(`❌ ${data.error}`, false);
      }
    })
    .catch(err => {
      console.error('Error submitting code:', err);
      displayResult('An error occurred while verifying your code.', false);
    });
}

/**
 * Displays the verification result to the user.
 * @param {string} message - The message to display.
 * @param {boolean} isSuccess - Indicates if the result is success or failure.
 */
function displayResult(message, isSuccess) {
  const resultMessage = document.getElementById('result-message');
  resultMessage.innerText = message;
  resultMessage.style.color = isSuccess ? 'green' : 'red';
}

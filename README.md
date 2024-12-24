# Questions App

This is a simple web application that presents a coding problem to the user and verifies their solution. The frontend is built with HTML, CSS, and JavaScript, while the backend is built with Node.js and Express.

## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/questions-app.git
    cd questions-app
    ```

2. Install backend dependencies:
    ```sh
    cd backend
    npm install
    ```

### Running the Application

1. Start the backend server:
    ```sh
    npm start
    ```

    ## API Endpoints

- `GET /api/problem`: Fetches the current problem.
- `POST /api/verify`: Verifies the submitted code.
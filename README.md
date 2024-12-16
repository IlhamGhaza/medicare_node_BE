# Medicare Node.js Backend

This is the backend for the Medicare application, built using Node.js and Express, integrated with a MySQL database.

<!-- table of content -->
## Table of Contents

- [Medicare Node.js Backend](#medicare-nodejs-backend)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Features](#features)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
    - [Using Node.js](#using-nodejs)
    - [Using Docker](#using-docker)
  - [Project Structure](#project-structure)
  - [Replacing Database Package with `mysql`](#replacing-database-package-with-mysql)
  - [Contribution](#contribution)
  - [License](#license)
  - [Contact](#contact)

## Overview

The Medicare Node.js Backend is a RESTful API built using Node.js and Express, designed to handle requests from the frontend and interact with a MySQL database. The backend is structured to provide endpoints for user authentication, data retrieval, and manipulation.

## Features

- User authentication and authorization
- CRUD operations for patient and doctor data

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (latest version recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) (if you plan to run the application using Docker)

## Installation

1. **Clone this repository:**

   ```bash
   git clone https://github.com/IlhamGhaza/medicare_node_BE.git
   cd medicare_node_BE
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**

   Create a `.env` file in the root directory and add the following configurations:

   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=medicare_db
   DB_PORT=3306
   PORT=3000
   ```

   Replace `your_password` with your MySQL password.

## Running the Application

### Using Node.js

1. **Ensure MySQL Server is running:**

   Make sure you have a running MySQL instance configured according to the settings in the `.env` file.

2. **Run database migrations (if applicable):**

   ```bash
   npm run migrate
   ```

3. **Start the server:**

   ```bash
   npm start
   ```

   The server will run at `http://localhost:3000`.

### Using Docker

1. **Create a `.env` file for Docker:**

   Create a `.env` file in the root directory with the following configurations:

   ```env
   MYSQL_ROOT_PASSWORD=your_password
   MYSQL_DATABASE=medicare_db
   NODE_PORT=3000
   ```

   Replace `your_password` with your desired MySQL password.

2. **Run Docker Compose:**

   ```bash
   docker-compose up --build
   ```

   This command will build and start containers for the Node.js application and MySQL.

3. **Access the application:**

   Once the containers are running, you can access the application at `http://localhost:3000`.

## Project Structure

```
medicare_node_BE/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── app.js
├── .env
├── docker-compose.yml
├── Dockerfile
├── package.json
└── README.md
```

- `src/controllers/`: Contains logic for handling requests.
- `src/models/`: Contains database model definitions.
- `src/routes/`: Contains API route definitions.
- `src/app.js`: Entry point of the application.

## Replacing Database Package with `mysql`

If you previously used a different database package and wish to switch to the `mysql` package, follow these steps:

1. **Uninstall the previous database package:**

   ```bash
   npm uninstall previous_package_name
   ```

2. **Install the `mysql` package:**

   ```bash
   npm install mysql
   ```

3. **Update the database connection code:**

   In the file managing your database connection, update the code to:

   ```javascript
   const mysql = require('mysql');

   const connection = mysql.createConnection({
     host: process.env.DB_HOST,
     user: process.env.DB_USER,
     password: process.env.DB_PASSWORD,
     database: process.env.DB_NAME,
     port: process.env.DB_PORT
   });

   connection.connect((err) => {
     if (err) {
       console.error('Error connecting to MySQL:', err.stack);
       return;
     }
     console.log('Connected to MySQL as id ' + connection.threadId);
   });
   ```

   Ensure you import environment variables from the `.env` file using a package like `dotenv`:

   ```javascript
   require('dotenv').config();
   ```

## Contribution

If you'd like to contribute to this project, please fork the repository, create a feature branch, and submit a pull request. Your contributions are appreciated!

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 International Public License - see the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or suggestions, feel free to contact us at [email](mailto:cb7ezeur@selenakuyang.anonaddy.com).

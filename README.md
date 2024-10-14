
# MERN Chat App

A real-time chat application built using the **MERN** stack (MongoDB, Express.js, React, Node.js), with real-time messaging powered by **Socket.IO** and Dockerized for easy deployment.

## Table of Contents

- [About](#about)
- [Features](#features)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Docker Setup](#docker-setup)
- [Some Screenshots]
- [Usage](#usage)
- [Technologies](#technologies)

---

## About

The MERN Chat App is a real-time messaging platform where users can sign up, log in, and communicate in private chats. The app uses **MongoDB** as the database to store user data and messages, **Express.js** and **Node.js** to handle the backend server, and **React** to create a responsive frontend interface. **Socket.IO** is used for real-time communication between users.

### Key Features:
- Real-time messaging between users
- User authentication (sign up, login)
- Dockerized for containerized deployment
- MongoDB as the NoSQL database
- Profile picture/avatar support

---

## Features

- **User Authentication**: Sign up and log in.
- **Real-Time Messaging**: Chat with other users in real-time using WebSockets.
- **Socket.IO Integration**: Seamless two-way communication between the client and server for instant message delivery.
- **Avatar Setup**: Users can set up a profile picture after signing up.
- **Docker Support**: Both backend and frontend are Dockerized for simple and scalable deployment.
  
---

## Installation

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14.x or later)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Yarn](https://yarnpkg.com/) (Optional: If you prefer Yarn over npm)

### Clone the Repository

```bash
https://github.com/Harsh112233445566/Chat_app.git
```

### Install Dependencies

You can use either **npm** or **yarn** to install the required packages.

#### Using npm:
For backend (Node.js/Express):

```bash
cd public/chatapp
npm install
```

For frontend (React):

```bash
cd server
npm install
```

#### Using Yarn:
For backend:

```bash
cd public/chatapp
yarn install
```

For frontend:

```bash
cd server
yarn install
```

### MongoDB Setup

Make sure you have MongoDB installed locally or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) to set up a cloud database.

---

## Environment Variables

Create a `.env` file in the root directories of both backend and frontend to store environment variables.

### Backend `.env`:

```bash
PORT = 3002
MONGO_URI = "mongodb://localhost:27017/school"
```

### Frontend `.env`:

```bash
host = 'http://localhost:3002';
register_route = `${host}/api/auth/register`;
login_route = `${host}/api/auth/login`;
avatar_route = `${host}/api/auth/avatar`
chat_route = `${host}/api/auth/chat`;
alluser = `${host}/api/auth/alluser`;
addmsg = `${host}/api/msg/addmsg`;
getmsg = `${host}/api/msg/getmsg`;
```

---

## Docker Setup

### Build and Run the Application with Docker:

The application is Dockerized for easy deployment. To run the backend, frontend, and MongoDB in containers:

1. **Build and start the containers**:

```bash
docker-compose up --build
```

This will start:

- Backend on `http://localhost:3002`
- Frontend on `http://localhost:3000`
- MongoDB instance

2. **Stop the containers**:

To stop the running containers, press `Ctrl+C` or run:

```bash
docker-compose down
```

---
Here’s an additional section where you can showcase UI images in your `README.md`:

---

## Some Screenshots

Here are some screenshots of the application's user interface.

### Login Page
<img width="1440" alt="image" src="https://github.com/user-attachments/assets/58ac1cbc-2871-40f9-9779-19581f17ab76">


### Chat Interface
<img width="1439" alt="image" src="https://github.com/user-attachments/assets/ee1f3cb2-b476-42df-acc1-994d9ea70031">

---

## Usage

After setting up the environment and starting the app:

- Navigate to `http://localhost:3000` in your browser to access the frontend.
- Sign up with a new account or log in to chat with other users in real-time.
- Open multiple browser windows or tabs to simulate conversations between users.

---

## Technologies

- **Frontend**: React.js, Styled-components, Socket.IO-client
- **Backend**: Node.js, Express.js, Socket.IO
- **Database**: MongoDB
- **Real-Time Communication**: Socket.IO
- **Docker**: Docker and Docker Compose for containerized services
- **Package Management**: npm or Yarn

---

Feel free to use either **npm** or **Yarn** for managing your dependencies based on your preference.


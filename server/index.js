// Desc: Entry point of the server
const userrouter = require('./routes/userroutes');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const msgrouter = require('./routes/msgroute');
const socket = require('socket.io');

//initializing the app
const app = express();
require('dotenv').config();
app.use(cors());
app.use(express.json());
app.use("/api/auth", userrouter);
app.use("/api/msg", msgrouter);

//configuring the database

mongoose.connect("mongodb://mongodb/data", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => console.log(err.message));

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT}`);
});

// Socket.io setup
const io = socket(server, {
    cors: {
        origin: 'http://localhost:3000',
        credentials: true, 
    },
});

global.onlineUsers = new Map();

// Socket.io events
io.on('connection', (socket) => {
    socket.on('join', (userId) => {
        global.onlineUsers.set(userId, socket.id);
        // console.log(global.onlineUsers);
    });

    socket.on('disconnect', () => {
        global.onlineUsers.forEach((value, key) => {
            if (value === socket.id) {
                global.onlineUsers.delete(key);
                //  console.log(`User ${key} disconnected`);
            }
        });
    });

    socket.on('send-message', ({ senderId, receiverId, message }) => {
        // console.log(senderId, receiverId, message);
    
        if (global.onlineUsers.get(senderId)) {
            io.to(global.onlineUsers.get(senderId)).emit('receive-message', {
                senderId,
                message,
            });
        } else {
            // console.log(`User  ${receiverId}  not online`);
        }
    });
});

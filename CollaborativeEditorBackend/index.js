import express from "express";
import http from "http"; // Import the http module
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app); // Create an HTTP server instance

const PORT = process.env.PORT || 3500

// Create a socket server and attach it to the http server
const io = new Server(server ,{
    cors:true,
})

let users = []


// Whenever someone connects to this server, do this
io.on("connection", (socket) => {
    // Add user to list of connected users
    socket.on("addUser", (username) => {
        if (users.includes(username)) return;
        users.push(username);
        // Send back the updated list of users to all clients
        io.emit("getUsers", users)
        // Notify client that they have successfully joined
        socket.broadcast.emit("receiveMessage", `${username} has joined!`)
        socket.emit("receiveMessage", `You are now known as ${username}. Welcome!`);
    })

    socket.on("room:join" , (data)=>{
        console.log(data.name,"joined room ",data.roomId);
        socket.join(data.roomId);
        // const message=usersInRoom(roomId).map(user=>user+ " has entered the chat").join(' ');
        // io.to(roomId).emit("message","notification",message);
        
    });
    
    socket.on("sendMessage", (data) => {
        let { username, text, room } = data;
        text = `${username}: ${text}`;
        // Emit the message to the entire room
        io.to(room).emit("getMessage", username, text);
    });

    
  

    // A client has disconnected. Remove them from our list of users
    socket.on('disconnect', () => {
        const username = users.find(user => user === socket.id);
        users = users.filter((user) => user !== username);
        io.emit("getUsers", users);
        io.emit("receiveMessage", `${username} has left.`);
    });
});     


app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

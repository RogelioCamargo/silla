import express from 'express'; 
import mongoose from 'mongoose'; 
import * as http from 'http';
import { Server } from 'socket.io'; 

// import models 
import Conversation from './models/conversationModel.js'; 

// import routes
import listingRouter from './routers/listingRouter.js';
import userRouter from './routers/userRouter.js';
import conversationRouter from './routers/conversationRouter.js'; 
import messageRouter from './routers/messageRouter.js'; 

//initialize server
const port = process.env.PORT || 5000; 
const app = express(); 
const server = http.createServer(app); 
const io = new Server(server); 

// enable json
app.use(express.json()); 

// database connnection
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true, 
    useFindAndModify: false, 
    function (err) {
        if (err) throw err; 
        console.log('Successfully Connected.');    
    }
}); 

// routes
app.use('/users', userRouter); 
app.use('/listings', listingRouter); 
app.use('/conversations', conversationRouter); 
app.use('/messages', messageRouter); 

// development 
app.get('/', (req, res) => {
    res.send('Server is ready'); 
}); 

/* Socket Declaration(s) */
io.on("connection", socket => {
    console.log("New User Connected."); 
    console.log(socket.id); 

    // find room 
    socket.on("join room", conversation => {
        socket.join(conversation);
        console.log("Joined " + conversation + " Room" ) 
    }); 
 
    // starting a conversation 
    socket.on("new conversation", conversation => {
        socket.join(conversation); 
        console.log("Joined " + conversation + " Room" ) 
        socket.emit("new conversation"); 
    });  

    // starting a conversation 
    socket.on("delete conversation", conversation => {
        socket.leave(conversation); 
        console.log("Left " + conversation + " Room" ) 
        socket.emit("delete conversation"); 
    }); 

    // sending a message 
    socket.on("new message", ({ msg, to }) => {
        io.in(to).emit("new message", msg); 
        socket.emit("new conversation")
    });

    // perhaps there is more to be done here? 
    socket.on("disconnect", ()=> {
        console.log("Disconnected.")
    }); 
})

/**
 * This is error-catching middleware. If there 
 * is an error in any of the routes, it
 * will be redirected here.
 */
app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });  
}); 

server.listen(port, () => {
    console.log(`Serving at port ${port}.`)
}); 
import express from 'express'; 
import expressAsyncHandler from 'express-async-handler'; 

// import types
import Message from '../models/messageModel.js';

const messageRouter = express.Router(); 

// query by conversation id
messageRouter.get('/search/conversation/:id', 
    expressAsyncHandler(async (req, res) => {
        const messages = await Message.find({ conversation: req.params.id }); // get all listings
        res.send(messages);
    })
); 

// delete
messageRouter.delete('/delete/:id', 
    expressAsyncHandler(async (req, res) => {
        const result = await Message.findByIdAndDelete(req.params.id);
        res.send(result); 
    })
);

// create
messageRouter.post('/create', 
    expressAsyncHandler(async (req, res) => {
        const newMessage = new Message(req.body); // create new document
        const result = await newMessage.save(); // save to db
        res.send(result);
    })
);

export default messageRouter; 
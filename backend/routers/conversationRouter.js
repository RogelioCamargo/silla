import express from 'express'; 
import expressAsyncHandler from 'express-async-handler'; 

// import types
import Conversation from '../models/conversationModel.js';

const conversationRouter = express.Router(); 

// determine if conversation exist
conversationRouter.get('/search/:buyer/:seller/:listing', async (req, res) => {
    try {
        const conversation = await Conversation.findOne({
            "buyer.id": req.params.buyer, 
            "seller.id": req.params.seller,
            "listing.id": req.params.listing
        });
        res.send( 
            {
            success: true, 
            conversation: {
                ...conversation.toObject()
            }
        });
    }
    catch (error) {
        res.send({
            success: false, 
            error: error.message
        })
    }
}); 

// query by user id
conversationRouter.get('/search/user/:id', 
    expressAsyncHandler(async (req, res) => {
        const conversations = await Conversation.find({
            $or: [ { "buyer.id": req.params.id }, { "seller.id": req.params.id } ]
        });
        res.send(conversations);
    })
); 

// delete
conversationRouter.delete('/delete/:id', 
    expressAsyncHandler(async (req, res) => {
        let result = await Conversation.findByIdAndDelete(req.params.id);
        res.send(result); 
    })
);

// update
conversationRouter.put('/update/:id', 
    expressAsyncHandler(async (req, res) => {
        const conversation = await Conversation.findByIdAndUpdate(req.params.id, req.body, { new: true }); 
        res.send(conversation); 
    })
);

// create
conversationRouter.post('/create', async (req, res) => {
    try {
        const newConversation = new Conversation(req.body); // create new document
        const conversation = await newConversation.save(); // save to db
        res.send({
            success: true, 
            conversation: {
                ...conversation.toObject()
            }
        }); 
    }
    catch (error) {
        res.send({
            success: false, 
            error: error.message
        })
    }
}); 
export default conversationRouter; 
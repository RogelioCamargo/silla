import mongoose from 'mongoose'; 
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
    // always sender
    buyer: {
        id: {
            type: Schema.Types.ObjectId, 
            ref: 'User'
        },
        username: String, 
        url: String
    },
    // always receiver
    seller: {
        id: {
            type: Schema.Types.ObjectId, 
            ref: 'User'
        },
        username: String, 
        url: String
    },
    listing: { 
        id: String,
        url: String
    }, 
    // the latest message
    latestMessage: String
}, {
    timestamps: true
}); 

const Conversation = mongoose.model('Conversation', conversationSchema); 

export default Conversation; 
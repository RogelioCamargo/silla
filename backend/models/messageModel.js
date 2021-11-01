import mongoose from 'mongoose'; 
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    author: { 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    }, 
    content: String, 
    conversation: {
        type: Schema.Types.ObjectId, 
        ref: 'Conversation'
    }, 
}, {
    timestamps: true
}); 

const Message = mongoose.model('Message', messageSchema); 

export default Message; 
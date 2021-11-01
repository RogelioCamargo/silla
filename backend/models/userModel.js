import mongoose from 'mongoose'; 
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: String,
    displayName: String, 
    username: String,  
    email: String,  
    bio: String, 
    location: {
        city: String,
        stateCode: String,
    },
    photoURL: String, 
    rating: Number,
    reviews: Number
}, {
    timestamps: true
}); 

const User = mongoose.model('User', userSchema); 

export default User; 
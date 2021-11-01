import mongoose from 'mongoose'; 

const Schema = mongoose.Schema;

const listingSchema = Schema({
    // primary
    _id: String,
    images: [String], 
    description: String, 
    price: String, 
    // details
    category: String, 
    type: String, 
    condition: String, 
    color: String, 
    material: String, 
    // specifics
    style: String, 
    period: String,  
    // other
    status: String,
    location: {
        city: String, 
        stateCode: String, 
        type: {
          type: String, 
          enum: ['Point']  
        },
        coordinates: [Number]
    }, 
    seller: String,
    buyer: String
}, {
    timestamps: true
}); 

listingSchema.index({ location: '2dsphere' }); 

const Listing = mongoose.model('Listing', listingSchema); 

export default Listing; 
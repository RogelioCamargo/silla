import express from 'express'; 
import expressAsyncHandler from 'express-async-handler'; 

// import types
import Listing from '../models/listingModel.js';

const listingRouter = express.Router(); 

/** QUERIES */
// get latest listings
listingRouter.get('/', 
    expressAsyncHandler(async (req, res) => {
        const listings = await Listing.find({}).limit(20); // get all listings
        res.send(listings);
    })
); 

// query by search
listingRouter.get('/search', 
    expressAsyncHandler(async (req, res) => {
        const { q, lng, lat, radius, ...filters } = req.query; 

        const listings = await Listing.find({
            $and: [
                { description: { $regex: q, $options: 'i' } }, 
                filters, 
            ],
            location: { 
                $near: { 
                    $geometry:  {
                        type: "Point", 
                        coordinates: [ lng, lat ]
                    }, 
                    $maxDistance: (radius * 1609.344)
                } 
            } 
        }).limit(20); 

        res.send(listings); 
    })
); 

// query by user id
listingRouter.get('/search/uid/:id', 
    expressAsyncHandler(async (req, res) => {
        const listings = await Listing.find({ seller: req.params.id}).limit(20); // get all listings belonging to the user
        res.send(listings);
    })
);

/** DELETE */
listingRouter.delete('/delete/:id', 
    expressAsyncHandler(async (req, res) => {
        let result = await Listing.findByIdAndDelete(req.params.id);
        res.send(result); 
    })
);

/** UPDATE */
listingRouter.put('/update/:id', 
    expressAsyncHandler(async (req, res) => {
        const listing = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true }); 
        res.send(listing); 
    })
);

/** CREATE */
listingRouter.post('/create', 
    expressAsyncHandler(async (req, res) => {
        const newListing = new Listing(req.body); // create new document
        const result = await newListing.save(); // save to db
        res.send(result);
    })
);

export default listingRouter; 
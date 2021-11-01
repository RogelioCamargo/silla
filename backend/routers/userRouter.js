import express from 'express'; 
import expressAsyncHandler from 'express-async-handler'; 

// import types
import User from '../models/userModel.js';

const userRouter = express.Router(); 

// query by user id
userRouter.get('/search/profile/:id',
    expressAsyncHandler(async (req, res) => {
        const user = await User.findById(req.params.id); // get all users
        res.send(user);
    })
); 

// delete
userRouter.delete('/delete/:id', 
    expressAsyncHandler(async (req, res) => {
        let result = await User.findByIdAndDelete(req.params.id);
        res.send(result); 
    })
);

// update
userRouter.put('/update/:id', 
    expressAsyncHandler(async (req, res) => {
        // new: true - returns updated object
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }); 
        res.send(user); 
    })
);

// create
userRouter.post('/create',
    expressAsyncHandler(async (req, res) => {
        const newUser = new User(req.body); // create new document
        const user = await newUser.save(); // save to db
        res.send(user);
    })
);

export default userRouter;  

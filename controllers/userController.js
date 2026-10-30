import asyncHandler from 'express-async-handler';
import generateToken from '../helpers/generateToken.js';
import User from '../models/user.js';

const authenticate = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if(user && (await user.validatePassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        });
    }else{
        res.status(401);
        throw new Error('Invalid credentials');
    }
});

const register = asyncHandler(async (req, res) => {
    const { name, email, password, phoneNumber, isAdmin } = req.body;

    const userQuery = await User.findOne({ email });

    if(userQuery){
        res.status(400);
        throw new Error('User exists');
    }
    
    const user = await User.create({
        name,
        email,
        password,
        phoneNumber,
        isAdmin: isAdmin ?? false
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        });
    }else{
        res.status(400);
        throw new Error('Invalid Data');
    }
});

const update = asyncHandler(async (req, res) => {
    const { id, name, email, password, phoneNumber, isAdmin } = req.body;

    const userQuery = await User.findById(id);

    if(!userQuery){
        res.status(404);
        throw new Error('User not found');
    }

    
    userQuery.name = name ?? userQuery.name;
    userQuery.email = email ?? userQuery.email;
    userQuery.phoneNumber = phoneNumber ?? userQuery.phoneNumber;
    userQuery.isAdmin = isAdmin ?? userQuery.isAdmin;
    if(password){
        userQuery.password = password;
    }
    
    const saved = await userQuery.save(); 

    if(saved){
        res.status(200).json({
            _id: saved._id,
            name: saved.name,
            email: saved.email,
            isAdmin: saved.isAdmin
        });
    }else{
        res.status(400);
        throw new Error('Unable to update user');
    }
});

const fetchDetails = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            isAdmin: user.isAdmin,
        });
    }else{
        res.status(404);
        throw new Error('User not found');
    }
});

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

const deletetUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if(user){
        await user.remove();
        res.json({ message: 'User removed successfully' });
    }else{
        res.status(404);
        throw new Error('User not found');
    }
});

export {
    authenticate,
    register,
    update,
    fetchDetails,
    getUsers,
    deletetUser
}
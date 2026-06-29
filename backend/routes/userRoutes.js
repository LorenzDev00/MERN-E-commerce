import express from 'express';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import { isAuth, isAdmin, generateToken } from '../utils.js';

// create a new router instance
const userRouter = express.Router();

// GET all users if the user is authenticated and an admin
userRouter.get(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.send(users);
  })
);

// UPDATE user profile if the user is authenticated
userRouter.put(
  '/profile',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    // find the user by ID
    const user = await User.findById(req.user._id);
    if (user) {
      // update the user's name, surname, and email
      user.name = req.body.name || user.name;
      user.surname = req.body.surname || user.surname;
      user.email = req.body.email || user.email;
      // update the user's password if a new password is provided
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      // save the updated user data
      const updatedUser = await user.save();
      // return the updated user data and a new token
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        surname: updatedUser.surname,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
    } else {
      // send an error message if the user is not found
      res.status(404).send({ message: 'User not found' });
    }
  })
);

// USER sign in router 
userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    // find the user by email
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      // compare the provided password with the stored password hash
      if (bcrypt.compareSync(req.body.password, user.password)) {
        // return the user data and a new token if the passwords match
        res.send({
          _id: user._id,
          name: user.name,
          surname: user.surname,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    // send an error message if the email or password is incorrect
    res.status(401).send({ message: 'Invalid email or password' });
  })
);

// USER sign up router
userRouter.post('/signup', expressAsyncHandler(async (req, res) => {
  // create a new user object with the user's data
  const newUser = new User({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
  });
  // check if the user already exists in the database
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    // return an error message if the user already exists
    res.status(401).send({ message: "User already existing" });
  } else {
    // save the new user in the database
    const user = await newUser.save();
    // return user data and a new token
    res.send({
      _id: user._id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user)
    });
  }
}));


export default userRouter; 
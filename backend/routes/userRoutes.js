import express from 'express';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import { isAuth, isAdmin, generateToken } from '../utils.js';

const userRouter = express.Router();

// GET /api/users - list all users (admin only)
userRouter.get(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.send(users);
  })
);

// PUT /api/users/profile - update the authenticated user's own profile
userRouter.put(
  '/profile',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.surname = req.body.surname || user.surname;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      const updatedUser = await user.save();
      // Return a fresh token since user data (e.g. email) may have changed
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        surname: updatedUser.surname,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  })
);

// POST /api/users/signin - authenticate a user and return a token
userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
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
    res.status(401).send({ message: 'Invalid email or password' });
  })
);

// POST /api/users/signup - register a new user
userRouter.post('/signup', expressAsyncHandler(async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
  });

  const user = await User.findOne({ email: req.body.email });
  if (user) {
    res.status(401).send({ message: "User already existing" });
  } else {
    const user = await newUser.save();
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

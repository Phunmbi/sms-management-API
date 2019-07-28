import express from 'express';
import UserMiddleware from './UserMiddleware';
import UserValidator from './UserValidator';
import UserController from './UserController';

const UserRouter = express.Router();

UserRouter.post(
  '/signup',
  UserValidator.checkUserDetailsSignUp,
  UserValidator.checkIfUserAlreadyExists,
  UserMiddleware.hashPassword,
  UserMiddleware.generateToken,
  UserController.createOwner,
);

UserRouter.post(
  '/login',
  UserValidator.checkUserDetailsSignIn,
  UserValidator.checkIfUserExists,
  UserMiddleware.comparePassword,
  UserMiddleware.generateToken,
  UserController.signInOwner,
);

export default UserRouter;

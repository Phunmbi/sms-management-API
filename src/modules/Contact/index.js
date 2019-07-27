import express from 'express';
import ContactMiddleware from './ContactMiddleware';
import ContactValidator from './ContactValidator';
import ContactController from './ContactController';

const ContactRouter = express.Router();

ContactRouter.post(
  '/signup',
  ContactValidator.checkContactDetailsSignUp,
  ContactValidator.checkIfUserAlreadyExists,
  ContactMiddleware.hashPassword,
  ContactMiddleware.generateToken,
  ContactController.createOwner,
);

ContactRouter.post(
  '/login',
  ContactValidator.checkContactDetailsSignIn,
  ContactValidator.checkIfUserExists,
  ContactMiddleware.comparePassword,
  ContactMiddleware.generateToken,
  ContactController.signInOwner,
);

export default ContactRouter;

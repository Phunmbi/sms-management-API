import express from 'express';
import Authentication from '../../Helpers/Authentication';
import ContactValidator from './ContactValidator';
import ContactController from './ContactController';

const ContactRouter = express.Router();

ContactRouter.post(
  '/contacts/add',
  Authentication.authenticate,
  ContactValidator.checkContactDetails,
  ContactValidator.checkIfContactExist,
  ContactController.addContact
);

ContactRouter.get(
  '/contacts',
  Authentication.authenticate,
  ContactController.retrieveAllContacts
);

ContactRouter.get(
  '/contacts/:contactId',
  Authentication.authenticate,
  ContactController.retrieveSingleContact
);

ContactRouter.delete(
  '/contacts/:contactId',
  Authentication.authenticate,
  ContactController.deleteSingleContact
);

export default ContactRouter;

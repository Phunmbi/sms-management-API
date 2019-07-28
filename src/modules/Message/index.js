import express from 'express';
import Authentication from '../../Helpers/Authentication';
import MessageValidator from './MessageValidator';
import MessageController from './MessageController';

const MessageRouter = express.Router();

MessageRouter.post(
  '/messages/create',
  Authentication.authenticate,
  MessageValidator.checkForEmptyParameters,
  MessageValidator.checkIfSenderExists,
  MessageValidator.checkIfReceiverExists,
  MessageController.createMessage
);

MessageRouter.get(
  '/messages',
  Authentication.authenticate,
  MessageController.retrieveAllMessages
);

MessageRouter.get(
  '/messages/:messageId',
  Authentication.authenticate,
  MessageController.retrieveSingleMessage
);

MessageRouter.delete(
  '/messages/:messageId',
  Authentication.authenticate,
  MessageController.deleteSingleMessage
);

export default MessageRouter;

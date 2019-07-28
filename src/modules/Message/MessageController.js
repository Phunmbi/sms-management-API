import {Message} from '../../database/models';
import ErrorHandler from '../../Helpers/ErrorHandler';

/**
 * Message Controller
 *
 * @function MessageController
 * @type {{createMessage: createMessage, retrieveAllMessages: retrieveAllMessages, retrieveSingleMessage: retrieveSingleMessage, deleteSingleMessage: deleteSingleMessage}}
 */
const MessageController = (() => {
  /**
   *
   * @param req - expressJS request Object
   * @param res - expressJS response Object
   * @memberOf MessageController
   * @function createMessage
   * @returns {Promise<void>}
   */
  const createMessage = async (req, res) => {
    try {
      const {reqBody} = req;
      const newMessage = await Message.create({
        senderId: reqBody.senderId,
        receiverId: reqBody.receiverId,
        message: reqBody.message
      });

      res.status(201).json({
        success: true,
        contact: {
          id: newMessage.id,
          receiver: newMessage.firstName,
          sender: newMessage.senderId,
          message: newMessage.message,
          status: newMessage.status,
          createdAt: newMessage.createdAt,
          updatedAt: newMessage.updatedAt
        },
        message: 'Successfully sent a new message',
      });
    } catch (e) {
      /* istanbul ignore next */
      ErrorHandler.handleError("Server Error",500,res);
    }
  };


  /**
   *
   * @param req - expressJS request Object
   * @param res - expressJS response Object
   * @memberOf MessageController
   * @function retrieveAllMessages
   * @returns {Promise<void>}
   */
  const retrieveAllMessages = async (req, res) => {
    try {
      const messages = await Message.findAll();

      if (!messages || messages.length === 0) {
        return ErrorHandler.handleError("No Messages exist",204,res);
      }
      res.status(200).json({
        success: true,
        contact: messages,
        message: 'Successfully retrieved all messages',
      });
    } catch (e) {
      /* istanbul ignore next */
      ErrorHandler.handleError("Server Error",500,res);
    }
  };

  /**
   *
   * @param req - expressJS request Object
   * @param res - expressJS response Object
   * @memberOf MessageController
   * @function retrieveSingleMessage
   * @returns {Promise<void>}
   */
  const retrieveSingleMessage = async (req, res) => {
    try {
      const {messageId} = req.params;
      const singleMessage = await Message.findByPk(messageId);

      if (!singleMessage) {
        return ErrorHandler.handleError("Message does not exist",404,res);
      }

      res.status(200).json({
        success: true,
        contact: singleMessage,
        message: 'Successfully retrieved message',
      });
    } catch (e) {
      /* istanbul ignore next */
      ErrorHandler.handleError("Server Error",500,res);
    }
  };

  /**
   *
   * @param req - expressJS request Object
   * @param res - expressJS response Object
   * @memberOf MessageController
   * @function deleteSingleMessage
   * @returns {Promise<void>}
   */
  const deleteSingleMessage = async (req, res) => {
    try {
      const {messageId} = req.params;
      const singleMessage = await Message.findByPk(messageId);

      if (!singleMessage) {
        return ErrorHandler.handleError("Message does not exist",404,res);
      }

      await singleMessage.destroy();

      res.status(200).json({
        success: true,
        contact: singleMessage,
        message: 'Successfully deleted message',
      });
    } catch (e) {
      /* istanbul ignore next */
      ErrorHandler.handleError("Server Error",500,res);
    }
  };

  return {
    createMessage,
    retrieveAllMessages,
    retrieveSingleMessage,
    deleteSingleMessage
  }
})();

export default MessageController;

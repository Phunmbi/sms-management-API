import _ from "lodash";
import { Contact } from '../../database/models'
import ErrorHandler from "../../Helpers/ErrorHandler";

/**
 * Message Validations
 *
 * @function MessageValidator
 * @type {{checkForEmptyParameters: checkForEmptyParameters, checkIfSenderExists: checkIfSenderExists, checkIfReceiverExists: checkIfReceiverExists}}
 */
const MessageValidator = (() => {
  let errors = [];
  /**
   *
   * @param req - expressJS request Object
   * @param res - expressJS response Object
   * @param next - expressJS generator trigger
   * @memberOf MessageValidator
   * @function checkContactDetails
   * @returns {Promise<void>}
   */
  const checkForEmptyParameters = (req, res, next) => {
    const reqBody = {
      senderId: req.body.senderId,
      receiverId: req.body.receiverId,
      message: req.body.message,
    };
    checkNotEmpty('Sender', reqBody.senderId);
    checkNotEmpty('Receiver', reqBody.receiverId);
    checkNotEmpty('Message', reqBody.message);

    if(errors.length > 0) {
      res.status(400).json({
        success: false,
        error: errors
      });
      errors = []
    }
    else {
      req.reqBody = reqBody;
      next()
    }
  };

  /**
   * Validate for if the contact already exists for sign in
   *
   * @param req - expressJS request Object
   * @param res - expressJS response Object
   * @param next - expressJS generator trigger
   * @memberOf MessageValidator
   * @function checkIfSenderExists
   * @returns {Promise<void>}
   */
  const checkIfSenderExists = async (req, res, next) => {
    const existingUser = await Contact.findAll({
      where: {phoneNumber: req.reqBody.senderId}
    });

    if (existingUser.length === 0) {
      ErrorHandler.handleError("This Sender does not exist", 401, res);
    } else {
      next();
    }
  };

  /**
   * Validate for if the contact already exists for sign in
   *
   * @param req - expressJS request Object
   * @param res - expressJS response Object
   * @param next - expressJS generator trigger
   * @memberOf MessageValidator
   * @function checkIfSenderExists
   * @returns {Promise<void>}
   */
  const checkIfReceiverExists = async (req, res, next) => {
    const existingUser = await Contact.findAll({
      where: {phoneNumber: req.reqBody.receiverId}
    });

    if (existingUser.length === 0) {
      ErrorHandler.handleError("This Receiver does not exist", 401, res);
    } else {
      next();
    }
  };
  /**
   * Validates for if input field is empty or not
   *
   * @param field - field to be checked
   * @param input - value of field being checked
   * @memberOf MessageValidator
   * @function checkNotEmpty
   * @returns {number|*}
   */
  const checkNotEmpty = (field, input) => {
    if (_.isString(input)) {
      return input.trim().length > 0 ? errors : errors.push({[field]: `${field} cannot be empty`});
    }
    return errors.push({[field]: `${field} must be a string`});
  };

  return {
    checkForEmptyParameters,
    checkIfSenderExists,
    checkIfReceiverExists
  }
})();

export default MessageValidator

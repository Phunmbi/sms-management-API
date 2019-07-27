import _ from 'lodash';
import models from '../../database/models'
import ErrorHandler from "../../Helpers/ErrorHandler";

/**
 * Handles Contact validations
 *
 * @exports
 * @function ContactValidator
 * @type {{checkIfUserExists: ContactValidator.checkIfUserExists, checkContactDetailsSignIn: ContactValidator.checkContactDetailsSignIn, checkIfUserAlreadyExists: ContactValidator.checkIfUserAlreadyExists, checkContactDetailsSignUp: ContactValidator.checkContactDetailsSignUp}}
 */
const ContactValidator = (() => {
  let errors = [];
  /**
   * Validate request body for sign up
   *
   * @param req - expressJS request Object
   * @param res - expressJS response Object
   * @param next - expressJS generator trigger
   * @returns {object} response object
   * @memberOf ContactValidator
   * @function checkContactDetailsSignUp
   */

  const checkContactDetailsSignUp = (req, res, next) => {
    const reqBody = {
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      password: req.body.password
    };
    checkNotEmpty('Name', reqBody.name);
    checkNotEmpty('Phone Number', reqBody.phoneNumber);
    checkNotEmpty('Password', reqBody.password);

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
   * Validate request body for sign in
   *
   * @param req - expressJS request Object
   * @param res - expressJS response Object
   * @param next - expressJS generator trigger
   * @returns {object} response object
   * @memberOf ContactValidator
   * @function checkContactDetailsSignIn
   */
  const checkContactDetailsSignIn = (req, res, next) => {
    const reqBody = {
      phoneNumber: req.body.phoneNumber,
      password: req.body.password
    };
    checkNotEmpty('Phone Number', reqBody.phoneNumber);
    checkNotEmpty('Password', reqBody.password);

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
   *
   * Validate for if the user already exists for signup
   *
   * @param req - expressJS request Object
   * @param res - expressJS response Object
   * @param next - expressJS generator trigger
   * @memberOf ContactValidator
   * @function checkIfUserAlreadyExists
   * @returns {Promise<void>}
   */
  const checkIfUserAlreadyExists = async (req, res, next) => {
    const existingUser = await models.Contact.findAll({
      where: { phoneNumber: req.reqBody.phoneNumber }
    });

    if (existingUser.length > 0) {
      ErrorHandler.handleError("A user with this account already exists", 401, res);
    } else {
      next();
    }
  };

  /**
   * Validate for if the user already exists for sign in
   *
   * @param req - expressJS request Object
   * @param res - expressJS response Object
   * @param next - expressJS generator trigger
   * @memberOf ContactValidator
   * @function checkIfUserExists
   * @returns {Promise<void>}
   */
  const checkIfUserExists = async (req, res, next) => {
    const existingUser = await models.Contact.findAll({
      where: {phoneNumber: req.reqBody.phoneNumber}
    });

    if (existingUser.length === 0) {
      ErrorHandler.handleError("Wrong phone number or password", 401, res);
    } else {
      req.reqBody.user = existingUser[0];
      next();
    }
  };


  /**
   * Validates for if input field is empty or not
   *
   * @param field - field to be checked
   * @param input - value of field being checked
   * @memberOf ContactValidator
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
    checkContactDetailsSignUp,
    checkContactDetailsSignIn,
    checkIfUserAlreadyExists,
    checkIfUserExists
  }
})();

export default ContactValidator;

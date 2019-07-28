import _ from "lodash";
import { User } from '../../database/models'
import ErrorHandler from "../../Helpers/ErrorHandler";

/**
 * * User Validations
 *
 * @function UserValidator
 * @type {{checkIfUserExists: checkIfUserExists, checkUserDetailsSignUp: checkUserDetailsSignUp, checkUserDetailsSignIn: checkUserDetailsSignIn, checkIfUserAlreadyExists: checkIfUserAlreadyExists}}
 */
const UserValidator = (() => {
  let errors = [];
  /**
   * Validate request body for sign up
   *
   * @param req - expressJS request Object
   * @param res - expressJS response Object
   * @param next - expressJS generator trigger
   * @returns {object} response object
   * @memberOf UserValidator
   * @function checkUserDetailsSignUp
   */
  const checkUserDetailsSignUp = (req, res, next) => {
    const reqBody = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      password: req.body.password
    };
    checkNotEmpty('First Name', reqBody.firstName);
    checkNotEmpty('Last Name', reqBody.lastName);
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
   * @memberOf UserValidator
   * @function checkUserDetailsSignIn
   */
  const checkUserDetailsSignIn = (req, res, next) => {
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
   * @memberOf UserValidator
   * @function checkIfUserAlreadyExists
   * @returns {Promise<void>}
   */
  const checkIfUserAlreadyExists = async (req, res, next) => {
    const existingUser = await User.findAll({
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
   * @memberOf UserValidator
   * @function checkIfUserExists
   * @returns {Promise<void>}
   */
  const checkIfUserExists = async (req, res, next) => {
    const existingUser = await User.findAll({
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
   * @memberOf UserValidator
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
    checkUserDetailsSignIn,
    checkUserDetailsSignUp,
    checkIfUserAlreadyExists,
    checkIfUserExists
  }
})();

export default UserValidator;

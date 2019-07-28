import _ from "lodash";
import { Contact } from '../../database/models'
import ErrorHandler from "../../Helpers/ErrorHandler";

/**
 * Contact Validations
 *
 * @function ContactValidator
 * @type {{checkContactDetails: checkContactDetails, checkIfContactExist: checkIfContactExist}}
 */
const ContactValidator = (() => {
  let errors = [];
  /**
   *
   * @param req - expressJS request Object
   * @param res - expressJS response Object
   * @param next - expressJS generator trigger
   * @memberOf ContactValidator
   * @function checkContactDetails
   * @returns {Promise<void>}
   */
  const checkContactDetails = (req, res, next) => {
    const reqBody = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
    };
    checkNotEmpty('First Name', reqBody.firstName);
    checkNotEmpty('Last Name', reqBody.lastName);
    checkNotEmpty('Phone Number', reqBody.phoneNumber);

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
   * @memberOf ContactValidator
   * @function checkIfContactExist
   * @returns {Promise<void>}
   */
  const checkIfContactExist = async (req, res, next) => {
    const existingUser = await Contact.findAll({
      where: {phoneNumber: req.reqBody.phoneNumber}
    });

    if (existingUser.length > 0) {
      ErrorHandler.handleError("This contact already exists", 401, res);
    } else {
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
    checkContactDetails,
    checkIfContactExist
  }
})();

export default ContactValidator

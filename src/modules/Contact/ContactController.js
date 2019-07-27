import models from '../../database/models';
import ErrorHandler from '../../Helpers/ErrorHandler';

/**
 * * Contact Controller
 *
 * @exports
 * @function ContactController
 * @type {{createOwner: createOwner, signInOwner: signInOwner}}
 */
const ContactController = (() => {
  /**
   * Controller for handling creating a new user
   *
   * @param req - expressJS request Object
   * @param res - expressJS response Object
   * @memberOf ContactMiddleware
   * @function createOwner
   * @returns {Promise<void>}
   */
  const createOwner = async (req, res) => {
    try {
      const {reqBody} = req;
      const newUser = await models.Contact.create({
        name: reqBody.name,
        phoneNumber: reqBody.phoneNumber,
        password: reqBody.hash
      });

      res.status(201).json({
        success: true,
        user: {
          id: newUser.id,
          name: newUser.name,
          phoneNumber: newUser.phoneNumber,
          createdAt: newUser.createdAt,
          updatedAt: newUser.updatedAt
        },
        message: 'Successfully signed up',
        token: req.reqBody.token
      });
    } catch (e) {
      /* istanbul ignore next */
      ErrorHandler.handleError("Server Error",500,res);
    }
  };

  /**
   * Controller for handling signing in a user
   *
   * @param req - expressJS request Object
   * @param res - expressJS response Object
   * @memberOf ContactMiddleware
   * @function signInOwner
   * @returns {Promise<void>}
   */
  const signInOwner = (req, res) => {
    try {
      const { reqBody } = req;

      res.status(200).json({
        success: true,
        user: {
          id: reqBody.user.id,
          name: reqBody.user.name,
          phoneNumber: reqBody.user.phoneNumber,
          createdAt: reqBody.user.createdAt,
          updatedAt: reqBody.user.updatedAt
        },
        message: 'Successfully signed in',
        token: req.reqBody.token
      });
    } catch (e) {
      /* istanbul ignore next */
      ErrorHandler.handleError("Server Error",500,res);
    }
  };

  return {
    createOwner,
    signInOwner,
  }
})();

export default ContactController;

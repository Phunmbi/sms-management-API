import { User } from '../../database/models';
import ErrorHandler from '../../Helpers/ErrorHandler';

/**
 * * User Controller
 *
 * @function UserController
 * @type {{createOwner: createOwner, signInOwner: signInOwner}}
 */
const UserController = (() => {
  /**
   * Controller for handling creating a new user
   *
   * @param req - expressJS request Object
   * @param res - expressJS response Object
   * @memberOf UserController
   * @function createOwner
   * @returns {Promise<void>}
   */
  const createOwner = async (req, res) => {
    try {
      const {reqBody} = req;
      const newUser = await User.create({
        firstName: reqBody.firstName,
        lastName: reqBody.lastName,
        phoneNumber: reqBody.phoneNumber,
        password: reqBody.hash
      });

      res.status(201).json({
        success: true,
        user: {
          id: newUser.id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
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
   * @memberOf UserController
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

export default UserController;

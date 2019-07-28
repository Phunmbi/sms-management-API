import jwt from 'jsonwebtoken';
import {userSecret} from "../config/environmentSetup";
import ErrorHandler from './ErrorHandler';

/**
 * Authentication Validations
 *
 * @function Authentication
 * @type {{authenticate: authenticate}}
 */
const Authentication = (() => {
  /**
   * Authenticates users signing in to the application
   *
   * @param req - expressJS request Object
   * @param res - expressJS response Object
   * @param next - expressJS generator trigger
   * @returns {object} response object
   * @memberOf UserMiddleware
   * @function authenticate
   */
  const authenticate = (req, res, next) => {
    const token = req.headers.authorization || req.body.token || req.query.token;

    if (!token) {
      return ErrorHandler.handleError("Please provide a token", 401, res);
    }

    jwt.verify(token, userSecret, (err, decodedToken) => {
      if (err) {
        return ErrorHandler.handleError("Please provide a valid token", 401, res);
      }

      next();
    });
  };

  return {
    authenticate
  }
})();

export default Authentication;

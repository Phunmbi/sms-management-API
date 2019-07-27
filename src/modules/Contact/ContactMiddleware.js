import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import {userSecret} from "../../config/environmentSetup";
import ErrorHandler from '../../Helpers/ErrorHandler';

/**
 * Contact Middleware
 *
 * @exports
 * @function ContactMiddleware
 * @type {{generateToken: generateToken, authenticate: authenticate, comparePassword: comparePassword, hashPassword: hashPassword}}
 */
const ContactMiddleware = (() => {
  /**
   * Generates new token upon sign up and sign in
   *
   * @param req - expressJS request Object
   * @param res - expressJS response Object
   * @param next - expressJS generator trigger
   * @returns {object} response object
   * @memberOf ContactMiddleware
   * @function generateToken
   */
  const generateToken = (req, res, next) => {
    const {reqBody} = req;
    // Sign a token that expires after a day
    jwt.sign({
      data: reqBody.phoneNumber
    }, userSecret, { expiresIn: '24h' }, (err, token) => {
      if (err) {
        console.log(err.toString())
      } else {
        reqBody.token = token;
        next()
      }
    });
  };

  /**
   * Authenticates users signing in to the application
   *
   * @param req - expressJS request Object
   * @param res - expressJS response Object
   * @param next - expressJS generator trigger
   * @returns {object} response object
   * @memberOf ContactMiddleware
   * @function authenticate
   */
  const authenticate = (req, res, next) => {
    const token = req.headers.authorization || req.body.token || req.query.token;

    if (!token) {
      ErrorHandler.handleError("Please provide a token", 401, res);
    }

    jwt.decode(token, userSecret, (err, decodedToken) => {
      if (err) {
        ErrorHandler.handleError("Please provide a valid token", 401, res);
      }
    });

    next();
  };

  /**
   * Hashes user password for security
   *
   * @param req - expressJS request Object
   * @param res - expressJS response Object
   * @param next - expressJS generator trigger
   * @returns {object} response object
   * @memberOf ContactMiddleware
   * @function hashPassword
   */
  const hashPassword = (req, res, next) => {
    const {reqBody} = req;
    bcrypt.genSalt(10, (err, salt) => {
      if (err) console.log(err.toString());
      bcrypt.hash(reqBody.password, salt, (err, hash) => {
        if (err) {
          console.log(err.toString());
        } else {
          req.reqBody.hash = hash;
          next();
        }
      });
    });
  };

  /**
   * checks the authenticity of passwords
   *
   * @param req - expressJS request Object
   * @param res - expressJS response Object
   * @param next - expressJS generator trigger
   * @returns {object} response object
   * @memberOf ContactMiddleware
   * @function comparePassword
   */
  const comparePassword = async (req, res, next) => {
    const { reqBody } = req;

    bcrypt.compare(reqBody.password, reqBody.user.password, (err, result) => {
      if (result) next();
      else {
        ErrorHandler.handleError("Wrong phone number or password", 401, res);
      }
    })
  };

  return {
    generateToken,
    authenticate,
    hashPassword,
    comparePassword,
  }
})();

export default ContactMiddleware;

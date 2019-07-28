import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import {userSecret} from "../../config/environmentSetup";
import ErrorHandler from '../../Helpers/ErrorHandler';

/**
 * User Middleware
 *
 * @exports
 * @function UserMiddleware
 * @type {{generateToken: generateToken, authenticate: authenticate, comparePassword: comparePassword, hashPassword: hashPassword}}
 */
const UserMiddleware = (() => {
  /**
   * Generates new token upon sign up and sign in
   *
   * @param req - expressJS request Object
   * @param res - expressJS response Object
   * @param next - expressJS generator trigger
   * @returns {object} response object
   * @memberOf UserMiddleware
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
   * Hashes user password for security
   *
   * @param req - expressJS request Object
   * @param res - expressJS response Object
   * @param next - expressJS generator trigger
   * @returns {object} response object
   * @memberOf UserMiddleware
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
   * @memberOf UserMiddleware
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
    hashPassword,
    comparePassword,
  }
})();

export default UserMiddleware;

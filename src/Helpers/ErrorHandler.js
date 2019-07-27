/**
 * Handles errors
 * function for handling errors
 *
 * @exports
 * @function Error
 */
const Error = (() => {
  /**
   * Error handling
   *
   * @param  {string} error - error string
   * @param  {Integer} statusCode - status code
   * @param {any} response - expressJS response object
   * @returns {object} response object
   * @memberOf Error     *
   */
  const handleError = (error, statusCode, response) => {
    return response.status(statusCode).json({
      success: false,
      error
    });
  };

  return {
    handleError
  }
})();

export default Error;

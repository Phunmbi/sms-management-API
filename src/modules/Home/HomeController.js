/**
 * Home Controller
 *
 * @function HomeController
 * @type {{home: home}}
 */

const HomeController = (() => {
  /**
   *
   * @param req - expressJS request Object
   * @param res - expressJS response Object
   * @memberOf HomeController
   * @function home
   * @returns {Promise<void>}
   */
  const home = (req, res) => {
    res.status(200).send("Welcome to the SMS Management Application APIs, refer to the documentation for guidance with navigation and usage")
  };

  return {
    home
  }
})();

export default HomeController;

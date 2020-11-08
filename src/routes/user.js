const router = require('express').Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.route('/me')
  .get(auth.isLogged, userController.templateProfile)
  .post(auth.isLogged, userController.setUser);

router.route('/logout')
  .get(auth.isLogged, userController.logout);

router.route('/change-password')
  .get(auth.isLogged, userController.templateChangePassword)
  .post(auth.isLogged, userController.changePassword);

router.route('/ranking')
  .get(auth.isLogged, userController.templateRanking);

router.route('/register')
  .get(userController.templateRegister)
  .post(userController.create);

router.route('/login')
  .get(userController.templateLogin)
  .post(userController.login);

module.exports = router;
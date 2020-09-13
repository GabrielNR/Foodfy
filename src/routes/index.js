const express = require('express');
const routes = express.Router();

const HomeController = require("../app/controllers/HomeController")
const SessionController = require('../app/controllers/SessionController');

const SessionValidator = require('../app/validators/session')
const UserValidator = require('../app/validators/user')

const {
    onlyUsers,
    isLoggedRedirectToProfile
} = require('../app/middlewares/session')


const admin = require('./admin')

//ROTAS HOME
routes.get('/', HomeController.index)
routes.get('/sobre', HomeController.about)
routes.get('/receitas', HomeController.recipes)
routes.get("/receitas/:id", HomeController.show)
routes.get('/chefs', HomeController.chefs)
routes.get('/chefs/:id', HomeController.showChef)

//ROTAS LOGIN LOGOUT
routes.get('/login', isLoggedRedirectToProfile, SessionController.loginForm)
routes.post('/login', SessionValidator.login, SessionController.login)
routes.post('/logout', SessionController.logout)

//reset password / forgot
routes.get('/forgot-password', SessionController.forgotForm)
routes.get('/password-reset', SessionController.resetForm)
routes.post('/forgot-password', SessionValidator.forgot, SessionController.forgot)
routes.post('/password-reset', SessionValidator.reset, SessionController.reset)


//ROTAS ADMINISTRATIVAS
routes.use('/admin', onlyUsers, UserValidator.isAdmin, admin)


module.exports = routes
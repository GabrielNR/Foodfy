const express = require('express');
const routes = express.Router();
const multer = require('../app/middlewares/multer')

const AdminController = require('../app/controllers/AdminController')
const ChefsController = require("../app/controllers/ChefsController")
const ProfileController = require('../app/controllers/ProfileController')

const UserValidator = require('../app/validators/user');

const {onlyAdmin} = require('../app/middlewares/session')


const users = require('./users')


//ROTAS ADMIN RECEITAS
routes.get("/receitas", AdminController.index);
routes.get("/receitas/create", AdminController.create);
routes.get("/receitas/:id", AdminController.show);
routes.get("/receitas/:id/edit", AdminController.edit);

routes.post("/receitas", multer.array("photos", 5), AdminController.post);
routes.put("/receitas", multer.array("photos", 5), AdminController.put);
routes.delete("/receitas", AdminController.delete);


//ROTAS ADMIN CHEFS
routes.get("/chefs", onlyAdmin, ChefsController.index);
routes.get("/chefs/create", onlyAdmin, ChefsController.create);
routes.get("/chefs/:id", onlyAdmin, ChefsController.show)
routes.get("/chefs/:id/edit", onlyAdmin, ChefsController.edit);

routes.post("/chefs", onlyAdmin, multer.array("avatar", 1), ChefsController.post)
routes.put("/chefs", onlyAdmin, multer.array("avatar", 1), ChefsController.put)
routes.delete("/chefs", onlyAdmin, ChefsController.delete)


// ROTAS PERFIL LOGADO
routes.get('/profile', UserValidator.show, ProfileController.index) 
routes.put('/profile', UserValidator.update, ProfileController.update) 


//ROTAS USUÁRIOS
routes.use('/users', onlyAdmin, users)

//ALIAS
routes.get('/', function (req, res) {
    return res.redirect("/admin/profile")
})

module.exports = routes

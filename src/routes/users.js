const express = require('express');
const routes = express.Router(); 

const UserController = require('../app/controllers/UserController');

const UserValidator = require('../app/validators/user');


routes.get('/', UserController.list) 
routes.get('/create', UserController.create) 
routes.get('/:id', UserValidator.edit, UserController.edit)

routes.post('/', UserValidator.post, UserController.post) 
routes.put('/', UserController.put)
routes.delete('/', UserController.delete)



module.exports = routes

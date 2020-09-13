const faker = require('faker');
const {hash} = require('bcryptjs')

const File = require('./src/app/models/File')
const Recipe = require('./src/app/models/Recipes')
const Chef = require('./src/app/models/Chefs')
const User = require('./src/app/models/Users')

let usersIds = [];
let totalUsers = 5;

let chefsIds = [];
let totalChefs = 4;

let recipesIds = [];
let totalRecipes = 20;

async function createUsers() {
    const users = []
    const password = await hash('1111', 8)

    while (users.length < totalUsers) {

        users.push({
            name: faker.name.firstName(),
            email: faker.internet.email(),
            password,
            is_admin: Math.round(Math.random())
        })
    }

    const usersPromise = users.map(user => User.create(user))

    usersIds = await Promise.all(usersPromise)
}

async function createChefs() {
    const chefs = []

    while (chefs.length < totalChefs) {
        let file = {
            filename: faker.image.image(),
            path: `public/images/placeholder.png`,
        }

        let fileId = await File.createChefAvatar(file)

        chefs.push({
            name: faker.name.firstName(),
            file_id: fileId
        })
    }


    const chefsPromise = chefs.map(chef => Chef.create(chef))

    chefsIds = await Promise.all(chefsPromise)
}

async function createRecipe() {

    let recipes = []

    function array() {
        let array = []

        while (array.length < 5) {
            array.push(faker.lorem.paragraph())
        }

        return array
    }

    while (recipes.length < totalRecipes) {

        recipes.push({
            chef_id: chefsIds[Math.floor(Math.random() * totalChefs)],
            title: faker.name.title(),
            ingredients: array(),
            preparation: array(),
            information: faker.lorem.paragraph(Math.ceil(Math.random() * 10)),
            user_id: usersIds[Math.floor(Math.random() * totalUsers)]
        })
    }

    const recipesPromise = recipes.map(product => Recipe.create(product))
    recipesIds = await Promise.all(recipesPromise)

    let files = []
    while (files.length < 59) {
        files.push({
            filename: faker.image.image(),
            path: `public/images/placeholder.png`
        })
    }

    const filesPromise = files.map((file, index) => File.create({
        ...file,
        recipe_id: recipesIds[Math.round(index / 3)]
    }))

    await Promise.all(filesPromise)


}

async function init() {
    await createUsers()
    await createChefs()
    await createRecipe()
}

init()
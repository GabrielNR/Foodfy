const Chefs = require('../models/Chefs')
const Recipes = require('../models/Recipes')
const File = require('../models/File')


module.exports = {
    async index(req, res) { 
        const {admin} = req

        let results = await Chefs.all()
        const chefs = results.rows

        for (chef of chefs) {

            results = await Chefs.files(chef.file_id)
            const file = results.rows[0]

            chef.file_id = `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        }

        if(!chefs) return res.send("Database error!")

    
        return res.render("admin/chefs/index", {chefs, admin})
    },
    create(req, res) {
        const {
            admin
        } = req

        res.render("./admin/chefs/create", {admin})
    },
    async show(req, res){
        const {
            admin
        } = req

        let results = await Chefs.find(req.params.id);
        let chef = results.rows[0];

        if (!chef) return res.send("Chef not found!")

        results = await Chefs.files(chef.file_id)
        const file = results.rows[0]
        chef.file_id = `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`

        results = await Recipes.chefRecipes(chef.id)
        let recipes = results.rows
        if(!recipes) return `Este chef não possui nenhuma receita cadastrada`

        async function getImage(recipeId) {
            let results = await Recipes.files(recipeId);
            const files = results.rows.map(file =>
                `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
            );

            return files[0];
        }

        const recipesPromise = recipes.map(async recipe => {
            recipe.image = await getImage(recipe.id)
            return recipe
        });

        recipes = await Promise.all(recipesPromise);

        return res.render("admin/chefs/show", {chef, recipes, admin})

    },
    async edit(req, res) {
        const {id} = req.params
        const {
            admin
        } = req


        let results = await Chefs.find(id)
        let chef = results.rows[0]

        results = await Chefs.files(chef.file_id)
        const file = results.rows[0]


        return res.render("./admin/chefs/edit", {chef, file, admin})
    },
    async post(req, res) {
        const keys = Object.keys(req.body);

        for(key of keys) {
            if( req.body[key] == ""){
                res.send("Please, fill all fields!")
            }
        }

        if (req.files.length == 0) {
            return res.send('Please, send at least one image!')
        }

        const filesPromise = req.files.map(file => File.createChefAvatar({
            ...file
        }))
        const resultFile = await Promise.all(filesPromise)

        req.body.file_id = resultFile[0]
        
        const chefId = await Chefs.create(req.body)

        return res.redirect(`/admin/chefs/${chefId}`)
    },
    async put(req, res) {
        const keys = Object.keys(req.body)

        for(key of keys) {
            if (key == "") {
                return res.send("Please, fill all fields!")
            }
        }

        if (req.files.length == 0) {
            return res.send('Please, send at least one image!')
        }

        const filesPromise = req.files.map(file => File.createChefAvatar({
            ...file
        }))
        const resultFile = await Promise.all(filesPromise)

        req.body.file_id = resultFile[0]
        
        await Chefs.update(req.body)

        return res.redirect(`/admin/chefs/${req.body.id}`)
    },
    async delete(req, res) {
        const {id} = req.body

        const results = await Chefs.find(id)
        const chef = results.rows[0]

        await File.delete(chef.file_id)

        await Chefs.delete(id)

        return res.redirect("/admin/chefs")
    }
}   
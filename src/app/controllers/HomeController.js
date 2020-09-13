const Chefs = require("../models/Chefs")
const Recipes = require("../models/Recipes")


module.exports = {
    async index(req, res) {
        let results = await Recipes.all()
        let allRecipes = results.rows

        let recipes = allRecipes.filter((product, index) => index > 2 ? false : true)

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

        return res.render("./home/index", {
            recipes
        })
    },
    about(req, res) {
        return res.render("./home/about")
    },
    async recipes(req, res) {
        let {
            filter
        } = req.query
        let params = {}

        if (filter) {
            params.filter = filter
            params.order = "updated_at"

            let results = await Recipes.search(params);
            let recipes = results.rows


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

            return res.render("./home/recipes", {
                recipes,
                filter
            })
        }

        params.order = "created_at"
        let results = await Recipes.search(params)
        let recipes = results.rows

     
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

        return res.render("./home/recipes", {
            recipes
        })
    },
    async show(req, res) {
        let result = await Recipes.find(req.params.id)
        let recipe = result.rows[0]

        if (!recipe) return res.send("Recipe not found!")

        results = await Recipes.files(recipe.id);
        const files = results.rows.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        }));

        return res.render("./home/recipe", {
            recipe,
            files
        })
    },
    async chefs(req, res) {
        let results = await Chefs.all()
        let chefs = results.rows

        for (chef of chefs) {

            results = await Chefs.files(chef.file_id)
            const file = results.rows[0]

            chef.file_id = `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        }

        return res.render("./home/chefs", {
            chefs
        })
    },
    async showChef(req, res) {

        let result = await Chefs.find(req.params.id)
        let chef = result.rows[0]

        if (!chef) return res.send("Chef not found!")

        results = await Chefs.files(chef.file_id)
        const file = results.rows[0]
        chef.file_id = `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`

        results = await Recipes.chefRecipes(chef.id)
        let recipes = results.rows
        if (!recipes) return `Este chef não possui nenhuma receita cadastrada`

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

        return res.render("home/chef", {
            chef,
            recipes
        })
    }
}
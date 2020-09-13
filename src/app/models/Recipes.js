const db = require('../../config/db');

module.exports = {
    all() {
        try {

            return db.query(`
            SELECT recipes.*,
                chefs.name AS chef_name
            FROM recipes
            LEFT JOIN chefs ON(chefs.id = recipes.chef_id)
            ORDER BY created_at DESC
            `)

        } catch (error) {
            console.error(error);
        }

    },
    async create(data) {
        try {

            const query = `
            INSERT INTO recipes (
                title,
                chef_id,
                ingredients,
                preparation,
                information,
                user_id
            ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id
        `

            const values = [
                data.title,
                data.chef_id,
                data.ingredients,
                data.preparation,
                data.information,
                data.user_id
            ]

            const results = await db.query(query, values);
            const recipeId = results.rows[0].id;

            return recipeId
        } catch (error) {
            console.error(error);
        }

    },
    find(id) {
        try {

            return db.query(`
        SELECT recipes.*,
            chefs.name AS chef_name
        FROM recipes
        LEFT JOIN chefs ON(chefs.id = recipes.chef_id)
        WHERE recipes.id = $1`, [id])

        } catch (error) {
            console.error(error);
        }

    },
    search(params) {
        try {

            let {
                filter,
                order
            } = params
            let query = ""
            filterQuery = "WHERE"

            order = `ORDER BY ${order} DESC`

            if (filter) {
                filterQuery = `
            SELECT recipes.*,
                chefs.name AS chef_name
            FROM recipes
            LEFT JOIN chefs ON(chefs.id = recipes.chef_id)
            ${filterQuery} recipes.title ILIKE '%${filter}%'
            ${order}
            `
                return db.query(filterQuery)
            }

            query = `
        SELECT recipes.*,
            chefs.name AS chef_name
        FROM recipes
        LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
        ${order}
        `

            return db.query(query)

        } catch (error) {
            console.error(error);
        }


    },
    update(data) {
        try {

            const query = `
            UPDATE recipes SET
                title=($1),
                chef_id=($2),
                ingredients=($3),
                preparation=($4),
                information=($5)
            WHERE id = $6
        `

            const values = [
                data.title,
                data.chef_id,
                data.ingredients,
                data.preparation,
                data.information,
                data.id
            ]

            return db.query(query, values)

        } catch (error) {
            console.error(error);
        }


    },
    async delete(id) {
        try {

            // await db.query(`DELETE FROM recipe_files WHERE recipe_id = $1`, [id]);

            return db.query(`DELETE FROM recipes WHERE id=$1`, [id])

        } catch (error) {
            console.error(error);
        }

    },
    chefSelectOptions() {
        try {

            return db.query(`SELECT name, id FROM chefs`)

        } catch (error) {
            console.error(error);
        }
    },
    chefRecipes(id) {
        try {

            return db.query(`
            SELECT id, title FROM recipes WHERE chef_id = $1 `, [id])

        } catch (error) {
            console.error(error);
        }

    },
    filesId(id) {
        try {

            return db.query(`
            SELECT file_id FROM recipe_files WHERE recipe_id = $1
        `, [id])

        } catch (error) {
            console.error(error);
        }

    },
    files(id) {
        try {

            return db.query(`
            SELECT files.* 
            FROM files 
            LEFT JOIN recipe_files ON (files.id = recipe_files.file_id)
            LEFT JOIN recipes ON (recipes.id = recipe_files.recipe_id) 
            WHERE recipes.id = $1
        `, [id]);

        } catch (error) {
            console.error(error);
        }

    },
    findUserRecipe(id) {
        try {
            return db.query(`
            SELECT recipes.*,
                chefs.name AS chef_name
            FROM recipes
            LEFT JOIN chefs ON(chefs.id = recipes.chef_id)
            WHERE user_id = $1
            ORDER BY created_at DESC
        `, [id])
        } catch (error) {
            console.error(error);
        }

    }
}
const db = require('../../config/db')
const Recipes = require('./Recipes')

module.exports = {
    all(){
        return db.query("SELECT * FROM users ORDER BY created_at DESC")
    },
    async findOne(filters) {
        let query = "SELECT * FROM users"

        Object.keys(filters).map(key => {
            query = `${query}
            ${key}
            `

            Object.keys(filters[key]).map(field => {
                query = `${query} ${field} = '${filters[key][field]}'`
            })
        })


        const results = await db.query(query)
        return results.rows[0]
    },
    async create(data) {
        const query = `
            INSERT INTO users (
                name,
                email,
                is_admin,
                password,
                reset_token,
                reset_token_expires
            ) VALUES ( $1, $2, $3, $4, $5, $6) RETURNING id
        `

        const values = [
            data.name,
            data.email,
            data.is_admin,
            data.password,
            data.reset_token,
            data.reset_token_expires
        ]

        const results = await db.query(query, values);
        const userId = results.rows[0].id;

        return userId
    },
    async update(id, fields) {
        let query = "UPDATE users SET"


        Object.keys(fields).map((key, index, array) => {
            if ((index + 1) < array.length) {
                query = `${query}
                    ${key} = '${fields[key]}',
                `
            } else {
                //last iteration (sem virgula)
                query = `${query}
                    ${key} = '${fields[key]}'
                    WHERE id = ${id}
                `
            }
        })

        console.log(query)
        await db.query(query)
        return 
    },
    async delete(id) {
        //pegar todos os produtos
        let results = await db.query("SELECT * FROM recipes WHERE user_id = $1", [id])
        const recipes = results.rows

        //dos produtos, pegar todas as imagens
        const allFilesPromise = recipes.map(recipe =>
            Recipes.files(recipe.id))

        let promiseResults = await Promise.all(allFilesPromise)

        //rodar a remoção do usuário
        await db.query('DELETE FROM users WHERE id = $1', [id])

        //remover as imagens da pasta public
        promiseResults.map(results => {
            results.rows.map(file => fs.unlinkSync(file.path))
        })

    }
}
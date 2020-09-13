const db = require('../../config/db');

module.exports = {
    all() {
        return db.query(`
        SELECT chefs.*, count(recipes) AS total_recipes
        FROM chefs
        LEFT JOIN recipes ON(recipes.chef_id = chefs.id)
        GROUP BY chefs.id
        ORDER BY name asc
        `)
    },
    async create(data) {
        const query = `
            INSERT INTO chefs (
                name,
                file_id
            ) VALUES ($1, $2) RETURNING id
        `

        const values = [
            data.name,
            data.file_id
        ]

        const results = await db.query(query, values);
        const chefId = results.rows[0].id;

        return chefId
    },
    find(id) {
        return db.query(`
            SELECT chefs.*, count(recipes) AS total_recipes
            FROM chefs
            LEFT JOIN recipes ON(recipes.chef_id = chefs.id)
            WHERE chefs.id = $1
            GROUP BY chefs.id
            `, [id])
    },
    update(data) {
        const query = `
            UPDATE chefs SET
            name = ($1),
            file_id = ($2)
            WHERE id = $3
        `

        const values = [
            data.name,
            data.file_id,
            data.id
        ]

        return db.query(query, values)
    }, 
    delete(id) {
        return db.query(`DELETE FROM chefs WHERE id = $1 `, [id])
    },
    files(id) {
        return db.query(`
            SELECT * FROM files WHERE id = $1
        `, [id]);
    }
}
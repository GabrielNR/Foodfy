const {formatName} = require('../../lib/utils')

const User = require('../models/Users')

module.exports = {
    index(req, res) {
        let {user, admin} = req

        user.firstName = formatName(user.name)

        return res.render('admin/users/index', { user, admin })

    },
    async update(req, res) {
        try {
            const {user} = req;
            let{name, email} = req.body;

            await User.update(user.id, {
                name,
                email
            })

            req.body.firstName = formatName(name)

            return res.render("admin/users/index", {
                user: req.body,
                success: "Conta atualizada com sucesso!",
                admin
            })

        } catch (error) {
            console.error(error)
            return res.render("admin/users/index", {
                error: "Algum erro aconteceu"
            })
        }


    }
}
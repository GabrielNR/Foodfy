const crypto = require('crypto')
const mailer = require('../../lib/mailer')

const User = require('../models/Users');


module.exports = {
    async list(req, res){

        const {
            admin
        } = req

        let results = await User.all()
        let users = results.rows

        const filterUserLogged = users.filter(user => { 
           return (user.id != req.session.userId)
         })

        res.render("admin/users/list", {
            users: filterUserLogged,
            admin
        })
    },
    create(req, res) {
        const {
            admin
        } = req

        res.render("admin/users/create", {admin})
    },
    async post(req, res) {

        let data = req.body

        const token = crypto.randomBytes(20).toString("hex");
        let now = new Date()
        now = now.setHours(now.getHours() + 24)

        data.password = token
        data.reset_token = token
        data.reset_token_expires = now

        if (data.is_admin == "on") {
            data.is_admin = true
        } else {
            data.is_admin = false
        }

        await mailer.sendMail({
            to: data.email,
            from: 'no-reply@launchstore.com.br',
            subject: 'Você foi cadastrado como usuário FoodFy',
            html: `<h2>Novo usuário FoodFy</h2>
            <p>Que legal, agora você faz parte do nosso time de usuários, cadastre uma senha clicando no link abaixo e entre agora mesmo!</p>
            <p>
                <a href="http://localhost:3000/password-reset?token=${token}" target="_blank">
                    CRIAR SENHA
                </a>
            </p>
            `
        })

        await User.create(data)

        return res.redirect(`/admin/users`)
    },
    edit(req, res) {
        let {user, admin} = req 

        return res.render(`admin/users/edit`, {user, admin})
    },
    async put(req, res) {
        let keys = Object.keys(req.body)

        for(key of keys){
            if (req.body[key] == "") {
                res.render(`admin/users/edit`, {
                    user,
                    admin,
                    error: "Preencha todos os campos"
                })
            }
        }

        let {name, email, is_admin, id} = req.body

        if (is_admin == "on") {
            is_admin = true
        } else {
            is_admin = false
        }

        await User.update(id, {
            name,
            email,
            is_admin
        })

        return res.redirect(`/admin/users/${id}`)
    },
    async delete(req, res) {
        let {id} = req.body 

        await User.delete(id)

        return res.redirect("/admin/users")
    }
}


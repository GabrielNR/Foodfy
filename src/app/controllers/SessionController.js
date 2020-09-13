const {hash} = require('bcryptjs')
const crypto = require('crypto') //modulo de criação de token já disponivel no node

const mailer = require('../../lib/mailer')
const Users = require('../models/Users')


module.exports = {
    loginForm(req, res) {
        return res.render("home/session/login")
    },
    login(req, res) {
        req.session.userId = req.user.id

        
        return res.redirect("/admin/receitas")
    },
    logout(req, res) {
        req.session.destroy()
        return res.redirect("/")
    },
    forgotForm(req, res) {
        return res.render("home/session/forgot-password")
    },
    async forgot(req, res) {
        try {
            const user = req.user

            const token = crypto.randomBytes(20).toString("hex");

            let now = new Date()
            now = now.setHours(now.getHours() + 1)

            await Users.update(user.id, {
                reset_token: token,
                reset_token_expires: now
            })

            await mailer.sendMail({
                to: user.email,
                from: 'no-reply@launchstore.com.br',
                subject: 'Recuperação de senha',
                html: `<h2>Perdeu a chave?</h2>
            <p>Não se preocupe, clique no link abaixo para recuperar sua senha</p>
            <p>
                <a href="http://localhost:3000/password-reset?token=${token}" target="_blank">
                    RECUPERAR SENHA
                </a>
            </p>
            `
            })

            return res.render('home/session/forgot-password', {
                 success: "Verifique seu e-mail para resetar sua senha!"
             })
        } catch (error) {
            console.log(error)
            return res.render("home/session/forgot-password", {
                error: "Erro inesperado"
            })
        }
    },
    resetForm (req, res) {
         return res.render("home/session/password-reset", { token: req.query.token })
    },
    async reset(req, res) {
        const user = req.user;
        const { password, token } = req.body;

        try {
            const newPassword = await hash(password, 8)

            await Users.update(user.id, {
                password: newPassword,
                reset_token: "",
                reset_token_expires: ""
            })

            return res.render("home/session/login", {
                user: req.body,
                success: "Senha atualizada, faça seu login."
            })

        } catch (error) {
            console.log(error)
            return res.render("home/session/forgot-password", {
                user: req.body,
                token,
                error: "Erro inesperado"
            })
        }
    }
 
}
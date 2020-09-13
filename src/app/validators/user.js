const User = require('../models/Users')
const {
    compare
} = require('bcryptjs')
const {
    formatName
} = require('../../lib/utils')

function checkAllfields(body) {
    const keys = Object.keys(body)

    for (key of keys) {
        if (body[key] == "") {
            return {
                user: body,
                error: 'Por favor, preencha todos os campos!'
            }
        }
    }
}

async function post(req, res, next) {
    const fillAllFields = checkAllfields(req.body)
    if (fillAllFields) {
        return res.render("admin/users/index", fillAllFields)
    }

    next()
}

async function show(req, res, next) {
    const {
        userId: id
    } = req.session

    const user = await User.findOne({
        where: {
            id
        }
    })

    if (!user) return res.render("user/register", {
        error: "Usuário não encontrado"
    })

    req.user = user

    next()
}

async function edit(req, res, next) {
    const {id} = req.params

    const user = await User.findOne({
        where: {id}
    })

    if (!user) return res.render("user/register", {
        error: "Usuário não encontrado"
    })

    req.user = user

    next()
}

async function update(req, res, next) {
    const fillAllFields = checkAllfields(req.body)
    if (fillAllFields) {
        return res.render("admin/users/index", fillAllFields)
    }

    const {
        id,
        password
    } = req.body

    let user = await User.findOne({
        where: {
            id
        }
    })

    user.firstName = formatName(user.name)

    if (!password) return res.render("user/index", {
        user,
        error: "Coloque sua senha para atualizar"
    })


    const passed = await compare(password, user.password)

    if (!passed) {
        return res.render('admin/users/index', {
            user,
            error: "Senha incorreta"
        })
    }

    req.user = user

    next()
}

async function isAdmin(req, res, next) {
    const { userId: id } = req.session 

    const user = await User.findOne({where: {id}})

    console.log(user)

    let admin = ""

    if (user.is_admin == true ) {
        admin = true
    } else {
        admin = false
    }

    req.user = user
    req.admin = admin

    next()
}

module.exports = {
    post,
    show,
    edit,
    update,
    isAdmin
}
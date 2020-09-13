const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "7340cf58f2c6ae",
        pass: "dd7a0416d6e445"
    }
});

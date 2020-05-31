const nodemailer = require('nodemailer');


    let transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: 587,
        secure: false,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    })

    function sendMail(mailOptions) {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
        })
    }

    console.log('Message sent: %s', sendMail.messageId)

    module.exports = sendMail;
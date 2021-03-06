const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendMail = require('../util/mailer');

exports.postSignup = (req, res, next) => {
    const formData = req.body.data.formData;
    const name = formData.name;
    const email = formData.signupEmail;
    const surname = formData.surname;
    const password = formData.signupPassword;
    const id = Math.floor(Math.random() * 1000);
    // sign up new user, hash his password
    bcrypt.hash(password, 12)
        .then(hashedPassword => {
            // Checking if user already exsists by email, 
            // other values are set to default so can be duplicated
            User.findOrCreate({
                where: {
                    email: email
                },
                defaults: {
                    name: name,
                    surname: surname,
                    password: hashedPassword,
                    id: id
                }
            })
            .then(([user, created]) => {
                if (created) {
                    return res.status(201).send(user);
                } else {
                    return res.status(409).send('This user alerady exsits');
                }
            })
            .catch(err => {
                return res.status(404).send('Cannot create new user!')
            })
        })
        .catch(err => {
            return res.status(404).send('Cannot use this password');
        })
}
exports.postLogin = (req, res, next) => {
    const email = req.body.data.formData.email;
    const password = req.body.data.formData.password;

    User.findOne({
        where: {email: email}
    })
    .then(user => {
        bcrypt.compare(password, user.password)
        .then(doMatch => {
            if (doMatch) {
                const accessToken = jwt.sign({user: user}, process.env.SECRET, { expiresIn: '30d' })
                return res.json({
                    user: user,
                    token: accessToken
                })
            } else {
               return res.status(400).send('No user with such email or password');
            }
        })
        .catch(err => {
            console.log(err)
            return res.status(404).send('Cannot read this password');
        });
    })
    .catch(error => {
        return res.status(404).send('No user with such email')
    });
};

exports.postToken = (req, res, next) => {
    const token = req.body.data.token;
    const decoded = jwt.verify(token, process.env.SECRET)
    const user = decoded.user;
    if (decoded) {
        return res.json({user: 
            { name: user.name, email: user.email, surname: user.surname}
        })
    } else {
        return new Error();
    }
};

exports.postRecoverPassword = (req, res, next) => {
    const email = req.body.data.email;
    sendMail({
        from: '"Fred Foo 👻" <info@chemiplast.ch>', // sender address
        to: `info@chemiplast.ch`, // list of receivers
        subject: "Password recovery", // Subject line
        text: `${email}`, // plain text body
        html: `<b>${email}</b>`, // html body
    })
    res.status(200).send('Ok');
    
};


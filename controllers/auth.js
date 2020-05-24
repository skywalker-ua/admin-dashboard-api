const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
                console.log(err);
            })
        })
}
exports.postLogin = (req, res, next) => {
    const formData = req.body.formData;
    const email = formData.email;
    const password = formData.password;
    User.findOne({
        where: {email: email}
    })
    .then(user => {
        if (!user) {
            return res.send('Not Found User');
        }
        bcrypt.compare(password, user.password)
            .then(doMatch => {
                if (doMatch) {
                    const accessToken = jwt.sign({user: user}, process.env.SECRET, { expiresIn: '7d'});
                    // res.cookie('token', accessToken );
                    return res.status(200).json({
                        user: user,
                        token: accessToken
                    });
                    // return res.status(200).json({user: user});
                }
                return res.status(400).end('Password did not match');
            })
            .catch(err => {
                console.log(err)
                return res.status(404).end();
            });
        
    })
    .catch(error => {
        console.log(error)
        res.status(406).send('No user with that email')
    });
};

exports.postToken = (req, res, next) => {
    const token = req.body.data.token;
    const decoded = jwt.verify(token, process.env.SECRET)
    const user = decoded.user;
    if (token) {
        console.log(decoded);
        return res.json({user: 
            { name: user.name, email: user.email, surname: user.surname}
        })
    } else {
        return new Error();
    }
}


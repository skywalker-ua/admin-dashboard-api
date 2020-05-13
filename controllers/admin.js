const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.getHome = (req, res, next) => {
    res.send('Hi!');
};

exports.getOrders = (req, res, next) => {
    let ordersData = [];
    Order.findAll()
        .then(orders => {
            console.log(JSON.stringify(orders[0]));
            ordersData = orders[0];
            res.setHeader('Content-Type', 'application/json');
            res.send(ordersData);
            res.end();
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getProducts = (req, res, next) => {
    let productsData = [];
    Product.findAll()
        .then(products => {
            productsData = products;
            res.setHeader('Content-Type', 'application/json');
            res.send(productsData)
        })
        .catch(err => {
            console.log(err);
        })
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findByPk(prodId)
        .then(response => {
            res.setHeader('Content-Type', 'application/json');
            res.send(response)
        })
        .catch(err => {
            console.log(err);
        })
}

exports.postProduct = (req, res, next) => {
    let productData = req.body.product;
    let product = JSON.parse(productData);
    Product.findOrCreate({ where: {
        id: product.id,
        name: product.name,
        sku: product.sku,
    },
        defaults: {
            quantity: product.qty,
            category: product.category,
            imgUrl: product.imgUrl,
            price: product.price
        }})
        .then(([user, created]) => {
            console.log(user)
            if (!created) {
                console.log('Product aleady exists');
            } else {
                console.log('New Product was created')
            }
        })
        .catch(err => console.log(err));
    res.send('Product created')
}

exports.deleteProduct = (req, res, next) => {
    const prodId = req.body.data.prodId;
    Product.destroy({
        where: {
            id: prodId
        }
    })
    .then(result => {
        console.log('Product was deleted');
        res.send({id: prodId});
    })
    .catch(err => {
        console.log(err);
    })
}

exports.updateProduct = (req, res, next) => {
    const prodId = req.body.data.formData.id;
    const formData = req.body.data.formData;
    Product.update({
        id: formData.id,
        name: formData.name,
        imgUrl: formData.imgUrl,
        sku: formData.sku,
        category: formData.category,
        price: formData.price,
        quantity: formData.qty
    }, { where: { id: prodId } } )
    .then(() => {
        res.send({edited: true});
    })
    .catch(err => console.log(err));
}


// Auth Routes
exports.postSignup = (req, res, next) => {
    const formData = req.body.data.formData;
    const name = formData.name;
    const email = formData.signupEmail;
    const surname = formData.surname;
    const password = formData.signupPassword;
    const id = Math.floor(Math.random() * 1000);
    bcrypt.hash(password, 12)
        .then(hashedPassword => {
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
                    return res.status(200).json({user: user});
                }
                res.status(400).end();
            })
            .catch(err => {
                console.log(err)
                res.status(404).end();
            });
    })
    .catch(error => console.log(error));
};


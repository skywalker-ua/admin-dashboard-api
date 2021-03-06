const Order = require('../models/Order');
const Product = require('../models/Product');

exports.getHome = (req, res, next) => {
    res.send('Hi!');
};

exports.getOrders = (req, res, next) => {
    let ordersData = [];
    Order.findAll()
        .then(orders => {
            ordersData = orders;
            res.setHeader('Content-Type', 'application/json');
            res.send(ordersData);
            res.end();
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getOrder = (req, res, next) => {
    const orderId = req.params.orderId;
    Order.findByPk(orderId)
        .then(response => {
            res.setHeader('Content-type', 'application/json');
            res.send(response);
        })
        .catch(err => {
            console.log(err);
        })
}

exports.postOrder = (req, res, next) => {
    const order = JSON.parse(req.body.order);
    const id = order.id;
    const status = order.status;
    const product = order.product;
    const qty = order.qty;
    const clientName = order.clientName;
    const clientSurname = order.clientSurname;
    const clientPhone = order.clientPhone;

    Order.findOrCreate({ where: {
        id: id,
    },
        defaults: {
            status: status,
            qty: qty,
            clientName: clientName,
            clientSurname: clientSurname,
            clientPhone: clientPhone,
            product: product
        }})
        .then(([order, created]) => {
            console.log(order)
            if (!created) {
                console.log('Order with this id already exsits');
                return res.status(404).send('Order duplicate!');
            } else {
                console.log('Order was created!')
                return res.status(201).send('Order Created!');
            }
        })
        .catch(err => {
            console.log(err)
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
};

exports.getCounter = (req, res, next) => {
    let newOrders = 0;
    let pendingOrders = 0;
    let shippingOrders = 0;
    let completedOrders = 0;

    Order.count({ where: {'status': 'pending'}})
        .then(c => {
            pendingOrders = c;
        })
        .then(() => {
            Order.count({ where: {'status': 'new'}})
            .then(c => {
                newOrders = c;
            })
            .then(() => {
                Order.count({ where: {'status': 'completed'}})
                .then(c => {
                    completedOrders = c;
                })
                .then(() => {
                    Order.count({ where: {'status': 'shipping'}})
                    .then(c => {
                        shippingOrders = c;
                    })
                    .then(() => {
                        return res.json({
                            newOrders,
                            pendingOrders,
                            shippingOrders,
                            completedOrders
                        })
                    })
                })
            })
        })
        .catch(err => {
            console.log(err);
            return res.status(400).send('Can not count');
        })
        
}




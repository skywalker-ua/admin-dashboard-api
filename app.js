const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const adminRoutes = require('./routes/admin');
const cors = require('cors');

// Models
// const Order = require('./models/Order');
// const Product = require('./models/Product');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());

// Routing controller
app.use(adminRoutes);

//Connect to MySQL database
sequelize   
    .sync()
    .then(result => {
        console.log('Connected');
    })
    .catch(err => {
        console.log(err);
    });

app.listen(5000);
const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
// const cors = require('cors');
const port = process.env.PORT || 5000;
const sequelize = require('./util/database');

// Models
// const Order = require('./models/Order');
// const Product = require('./models/Product');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// app.use(cors());

// Routing controller
app.use(adminRoutes);

// Local Dev
//Connect to MySQL database
sequelize   
    .sync()
    .then(result => {
        console.log('Connected');
    })
    .catch(err => {
        console.log(err);
    });

app.listen(port);
const express = require('express');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');

require('dotenv').config();
const port = process.env.PORT || 5000;
const sequelize = require('./util/database');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.use(adminRoutes);
app.use(authRoutes);

sequelize   
    .sync({ force: true })
    .then(result => {
        console.log('Connected');
    })
    .catch(err => {
        console.log(err);
    });

app.listen(port);
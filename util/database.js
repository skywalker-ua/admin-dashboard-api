const { Client } = require('pg');

const client = new Client({
    connectionString: 'postgres://hkqkvcfwpruiiq:7d169f97f78c6959de955c65c905b713ea3127d512b04c4434c59135029543b8@ec2-50-17-90-177.compute-1.amazonaws.com:5432/d1k59q0pvt2k35',
    ssl: true
});

module.exports = client;
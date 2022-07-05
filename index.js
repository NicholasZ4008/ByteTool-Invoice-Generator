//adding cool face api
//const cool = require('cool-ascii-faces');

const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

//database
const { Pool } = require('pg');
//var pool = new Pool({
//    connectionString: process.env.DATABASE_URL || "postgres://postgres:password123@localhost:5432/users"
//})

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || "postgres://postgres:password123@localhost:5432/test_table",
    ssl: {
        rejectUnauthorized: false
    }
});

//times configure
showTimes = () => {
    let result = '';
    const times = process.env.TIMES || 5;
    for (i = 0; i < times; i++) {
        result += i + ' ';
    }
    return result;
}

function addStudent() {
    return document.getElementById('gpa_value').nodeValue;
}

var app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('pages/index'))
//get cool face
app.get('/cool', (req, res) => res.send(cool()))
//get times
app.get('/times', (req, res) => res.send(showTimes()))
//get db, listening on port 5432
app.get('/db', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM test_table');
        const results = { 'results': (result) ? result.rows : null };
        console.log(results);
        res.render('pages/db', results);
        client.release();
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
})
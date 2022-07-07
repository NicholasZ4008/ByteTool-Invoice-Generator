const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const session = require('express-session');
//const express = require('express');

//const path = require('path');

const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

express()
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/db', async (req, res) => {
        try {
            const client = await pool.connect();
            const result = await client.query('SELECT * FROM test_table');
            const results = { 'results': (result) ? result.rows : null };
            res.render('pages/db', results);
            client.release();
        } catch (err) {
            console.error(err);
            res.send("Error " + err);
        }
    })
    .get('/', function (request, response) {
        // Render login template
        response.sendFile(path.join(__dirname + '/public/login.html'));
    })
    .post('/auth', async (req, res) => {
        // Capture the input fields
        var username = req.body.username;
        var password = req.body.password;
        console.log(username, password);
        const connection = await pool.connect();
        // Ensure the input fields exists and are not empty
        if (username && password) {
            // Execute SQL query that'll select the account from the database based on the specified username and password
            connection.query(`SELECT * FROM accounts WHERE username = '${ username }' AND password = '${password}';`, function (error, results, fields) {
                // If there is an issue with the query, output the error
                console.log(error, results, fields);
                if (error) throw error;
                // If the account exists
                if (results.rows.length > 0) {
                    // Authenticate the user
                    //req.session.loggedin = true;
                    //req.session.username = username;
                    // Redirect to home page
                    res.redirect('/home');
                } else {
                    res.send('Incorrect Username and/or Password!');
                }
                res.end();
            });
        } else {
            res.send('Please enter Username and Password!');
            res.end();
        }
    })
// http://localhost:3000/home
    .get('/home', function (request, response) {
        // If the user is loggedin
        if (request.session.loggedin) {
            // Output username
            response.send('Welcome back, ' + request.session.username + '!');
        } else {
            // Not logged in
            response.send('Please login to view this page!');
        }
        response.end();
    })

    .listen(PORT, () => console.log(`Listening on ${ PORT }`))

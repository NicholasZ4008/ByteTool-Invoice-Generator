const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const session = require('express-session');
//const express = require('express');
var loggedin = false;
var sendUsername = "";
//const path = require('path');

"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "SPW9, spw9@sfu.ca", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);

const { Pool } = require('pg');
const { response } = require('express');
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
        //console.log(username, password);
        const connection = await pool.connect();
        // Ensure the input fields exists and are not empty
        if (username && password) {
            // Execute SQL query that'll select the account from the database based on the specified username and password
            connection.query(`SELECT * FROM accounts WHERE username = '${username}' AND password = '${password}';`, function (error, results, fields) {
                // If there is an issue with the query, output the error
                //console.log(error, results, fields);

                if (error) throw error;
                // If the account exists
                if (results.rows.length > 0) {
                    // Authenticate the user
                    loggedin = true;
                    sendUsername = username;
                    // Redirect to home page
                    res.redirect('/home');
                } else {
                    res.send('Incorrect Username and/or Password!');
                }
                connection.release();
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
        if (loggedin) {
            // Output username
            response.redirect('/loggedin.html');
        } else {
            // Not logged in
            response.send('Please login to view this page!');
        }
        response.end();
    })
    .post('/logout', async (req, res) => {
        loggedin = false;
        res.redirect('/login.html');
        res.end();
    })
    .get('/loggedin.html', function (request, response) {
        const authenticateForm = document.getElementById("authenticate_form");

        authenticateForm.addEventListener("click", (e) => {
            //console.log(loggedin);
            if (loggedin) {
                // Output username
                response.redirect('/loggedin.html');
            } else {
                // Not logged in
                response.send('Please login to view this page!');
            }
        });
        // If the user is loggedin

        response.end();
    })


    .get('/newClient.hmtl', function (request, response) {


        /* // If the user is loggedin
        if (loggedin) {
            // Output username
            response.redirect('/loggedin.html');
        } else {
            // Not logged in
            response.send('Please login to view this page!');
        }
        response.end(); */

        response.redirect('/newClient.html');
        response.end();





    })


    .listen(PORT, () => console.log(`Listening on ${PORT}`))

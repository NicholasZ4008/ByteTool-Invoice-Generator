const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const session = require('express-session');
//const express = require('express');
var loggedin = false;
var sendUsername = "";
//const path = require('path');

////google api
//const fs = require('fs');
//const readline = require('readline');
//const { google } = require('googleapis');

//// If modifying these scopes, delete token.json.
//const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
//// The file token.json stores the user's access and refresh tokens, and is
//// created automatically when the authorization flow completes for the first
//// time.
//const TOKEN_PATH = 'token.json';

//// Load client secrets from a local file.
//fs.readFile('credentials.json', (err, content) => {
//    if (err) return console.log('Error loading client secret file:', err);
//    // Authorize a client with credentials, then call the Gmail API.
//    authorize(JSON.parse(content), listLabels);
//});

///**
// * Create an OAuth2 client with the given credentials, and then execute the
// * given callback function.
// * @param {Object} credentials The authorization client credentials.
// * @param {function} callback The callback to call with the authorized client.
// */
//function authorize(credentials, callback) {
//    const { client_secret, client_id, redirect_uris } = credentials.installed;
//    const oAuth2Client = new google.auth.OAuth2(
//        client_id, client_secret, redirect_uris[0]);

//    // Check if we have previously stored a token.
//    fs.readFile(TOKEN_PATH, (err, token) => {
//        if (err) return getNewToken(oAuth2Client, callback);
//        oAuth2Client.setCredentials(JSON.parse(token));
//        callback(oAuth2Client);
//    });
//}

///**
// * Get and store new token after prompting for user authorization, and then
// * execute the given callback with the authorized OAuth2 client.
// * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
// * @param {getEventsCallback} callback The callback for the authorized client.
// */
//function getNewToken(oAuth2Client, callback) {
//    const authUrl = oAuth2Client.generateAuthUrl({
//        access_type: 'offline',
//        scope: SCOPES,
//    });
//    console.log('Authorize this app by visiting this url:', authUrl);
//    const rl = readline.createInterface({
//        input: process.stdin,
//        output: process.stdout,
//    });
//    rl.question('Enter the code from that page here: ', (code) => {
//        rl.close();
//        oAuth2Client.getToken(code, (err, token) => {
//            if (err) return console.error('Error retrieving access token', err);
//            oAuth2Client.setCredentials(token);
//            // Store the token to disk for later program executions
//            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
//                if (err) return console.error(err);
//                console.log('Token stored to', TOKEN_PATH);
//            });
//            callback(oAuth2Client);
//        });
//    });
//}

///**
// * Lists the labels in the user's account.
// *
// * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
// */
//function listLabels(auth) {
//    const gmail = google.gmail({ version: 'v1', auth });
//    gmail.users.labels.list({
//        userId: 'me',
//    }, (err, res) => {
//        if (err) return console.log('The API returned an error: ' + err);
//        const labels = res.data.labels;
//        if (labels.length) {
//            console.log('Labels:');
//            labels.forEach((label) => {
//                console.log(`- ${label.name}`);
//            });
//        } else {
//            console.log('No labels found.');
//        }
//    });
//}

//"use strict";
//const nodemailer = require("nodemailer");

///*POST /token HTTP/1.1
//Host: oauth2.googleapis.com
//Content-length: 261
//content-type: application/x-www-form-urlencoded
//user-agent: google-oauth-playground
//code=4%2F0AdQt8qiYICAKu6TgFAyEsgXgirtlKETzneSMMAxMK5p6flGvvkETJrgxYvtQFs6VgIsqvA&redirect_uri=https%3A%2F%2Fdevelopers.google.com%2Foauthplayground&client_id=407408718192.apps.googleusercontent.com&client_secret=************&scope=&grant_type=authorization_code
//HTTP/1.1 200 OK
//Content-length: 462
//X-xss-protection: 0
//X-content-type-options: nosniff
//Transfer-encoding: chunked
//Expires: Mon, 01 Jan 1990 00:00:00 GMT
//Vary: Origin, X-Origin, Referer
//Server: scaffolding on HTTPServer2
//-content-encoding: gzip
//Pragma: no-cache
//Cache-control: no-cache, no-store, max-age=0, must-revalidate
//Date: Thu, 21 Jul 2022 03:48:31 GMT
//X-frame-options: SAMEORIGIN
//Alt-svc: h3=":443"; ma=2592000,h3-29=":443"; ma=2592000,h3-Q050=":443"; ma=2592000,h3-Q046=":443"; ma=2592000,h3-Q043=":443"; ma=2592000,quic=":443"; ma=2592000; v="46,43"
//Content-type: application/json; charset=utf-8
//{
//  "access_token": "ya29.A0AVA9y1sKOMbgim_d5aCDUQ7UGiCCufulm3ANguLIFur5lvh8W7kzw7IZcQu9O_qRrunOd2ZxcPVkDmY9zy3EVd8KAEw_nXYtJrcjUMyDnE1y87gP27hI75jWv9KIyMHEVxUihwryDqgoVHHh-Fpr7YTICzbNYUNnWUtBVEFTQVRBU0ZRRTY1ZHI4b20zNnNmVmV3dGdoRzBPSTZjNW0yQQ0163",
//  "scope": "https://mail.google.com/",
//  "token_type": "Bearer",
//  "expires_in": 3599,
//  "refresh_token": "1//04_r2eH8SHB1jCgYIARAAGAQSNwF-L9IrlrxoYWm-YkvrWvHNSPe5Ku7quqcYR5dX9AIzqql3gpi1TEk4rZFzxv3d8nax-_GWzqQ"
//}*/


//// async..await is not allowed in global scope, must use a wrapper
//async function main() {
//    // Generate test SMTP service account from ethereal.email
//    // Only needed if you don't have a real mail account for testing
//    let testAccount = await nodemailer.createTestAccount();

//    // create reusable transporter object using the default SMTP transport
//    let transporter = nodemailer.createTransport({
//        host: "smtp.gmail.com",
//        port: 587,
//        secure: false, // true for 465, false for other ports
//        auth: {
//            user: 'bytetoolsinvoicing@gmail.com', // generated ethereal user
//            pass: 'Waheguru1', // generated ethereal password
//        },
//    });

//    // send mail with defined transport object
//    let info = await transporter.sendMail({
//        from: '"ByteTools Invoicing 👻" <bytetoolsinvoicing@gmail.com>', // sender address
//        to: "SPW9, spw9@sfu.ca", // list of receivers
//        subject: "Hello ✔", // Subject line
//        text: "Hello world?", // plain text body
//        html: "<b>Hello world?</b>", // html body
//    });

//    console.log("Message sent: %s", info.messageId);
//    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//    // Preview only available when sending through an Ethereal account
//    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
//}

//main().catch(console.error);




//adding routes
//const express = require('express');
const controllers = require('./controllers');
const router = express.Router();

//router.get('/mail/user/:email', controllers.getUser)
router.get('/mail/send', controllers.sendMail);
//router.get('/mail/drafts/:email', controllers.getDrafts);
//router.get('/mail/read/:messageId', controllers.readMail);

module.exports = router;


//adding nodemailer
async function sendMail(req, res) {
    try {
        const accessToken = await oAuth2Client.getAccessToken();
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                ...CONSTANTS.auth,
                accessToken: accessToken,
            },
        });

        const mailOptions = {
            ...CONSTANTS.mailoptions,
            text: "The Gmail API with NodeJS works",
        };

        const result = await transport.sendMail(mailOptions);
        res.send(result);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}


//app start
const { Pool } = require('pg');
const { response } = require('express');
const checkLoginCred = require('./functions/checkLoginCred');
const checkDbReturn = require('./functions/checkDbReturn');
//const { connect } = require('http2');
const pool = new Pool({

    // Used by Gurnoor for local Testing. Do not delete
    //connectionString: 'postgres://postgres:root77@localhost/my22'

    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

var username = "";
var password = "";

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
        response.render('pages/login');
    })

    .post('/auth', async (req, res) => {
        // Capture the input fields
        username = req.body.username;
        password = req.body.password;
        //console.log(username, password);
        const connection = await pool.connect();
        // Ensure the input fields exists and are not empty
        if (username && password) {
            if (checkLoginCred(username, password)) {
                console.log("signed in");
            }
            // Execute SQL query that'll select the account from the database based on the specified username and password
            connection.query(`SELECT * FROM accounts WHERE username = '${username}' AND password = '${password}';`, function (error, results, fields) {
                // If there is an issue with the query, output the error
                //console.log(error, results, fields);

                if (error) throw error;
                // If the account exists
                if (results.rows.length > 0) {
                    if (checkDbReturn({ "results": [1] })) {
                        console.log('log on db result returned');
                    }
                    // Authenticate the user
                    connection.query(`UPDATE accounts SET loggedin = 'true' WHERE username = '${username}' AND password = '${password}';`)
                    loggedin = true;
                    sendUsername = username;
                    // Redirect to home page
                    res.render('pages/loggedin', results);
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
    .get('/loggedin', async (request, response) => {
        // If the user is loggedin
        const connection = await pool.connect();
        try {
            const dbQuery = await connection.query(`SELECT * FROM accounts WHERE username = '${username}' AND password = '${password}' AND loggedin = 'true';`);
            const results = { 'results': (dbQuery) ? dbQuery.rows : null };
            console.log(results.loggedin);
            if (results.length > 0) {
                if (checkDbReturn({ "results": [1] })) {
                    console.log('log on db result returned');
                }
                // Output username
                response.redirect('pages/loggedin');
                const dbQuery1 = await connection.query(`SELECT * FROM accounts WHERE username = '${username}' AND password = '${password}' AND loggedin = 'false';`);
            } else {
                // Not logged in
                response.send('Please login to view this page!');
            }
        } catch (err) {
            console.error(err);
            response.send("Error " + err);
        }


        connection.release();
        response.end();
    })

    .get('/login', async (req, res) => {
        if (checkDbReturn({ "results": [1] })) {
            console.log('log on db result returned');
        }
        res.render('pages/login');
        res.end();
    })

    .post('/logout', async (req, res) => {
        loggedin = false;
        const connection = await pool.connect();
        if (username && password) {
            if (checkLoginCred(username, password)) {
                console.log("logging out");
            }
            connection.query(`UPDATE accounts SET loggedin = 'false' WHERE username = '${username}' AND password = '${password}';`)
        }
        connection.release();
        res.redirect('/login');
        res.end();
    })

    //.get('/loggedin.html', function (request, response) {
    //    // If the user is loggedin
    //    console.log(loggedin);
    //    if (loggedin) {
    //        // Output username
    //        response.redirect('/loggedin.html');
    //    } else {
    //        // Not logged in
    //        response.send('Please login to view this page!');
    //    }
    //    response.end();
    //})

    // Update by Nabila (7/20/2022): View All Clients Page (Table format)


    .get('/register', (req, res) => {
        res.render('pages/register');
        res.end();
    })

    .post('/register', async (req, res) => {
        // Capture the input fields
        username = req.body.username;
        password = req.body.password;
        email = req.body.email;
        var existUsername = null;
        var existEmail = null;
        //console.log(username, password);
        const connection = await pool.connect();
        console.log('registration~~~~~~~~~~')
        try {
            const dbQueryForUsername = await connection.query(`SELECT * from accounts WHERE username = '${username}';`);
            existUsername = { 'results': (dbQueryForUsername) ? dbQueryForUsername.rows : null };
            const dbQUeryForEmail = await connection.query(`SELECT * from accounts WHERE email = '${email}';`);
            existEmail = { 'results': (dbQUeryForEmail) ? dbQUeryForEmail.rows : null };
            console.log(dbQueryForUsername);
            console.log('----');
            console.log(dbQUeryForEmail);
            console.log('@@@@@@');
        }
        catch (err) {
            throw err;
        }
        console.log(existUsername['results'].length);
        console.log(existEmail['results']);
        // Ensure the input fields exists and are not empty
        if (existUsername['results'].length == 0 && existEmail['results'].length == 0) {
            if (checkUserExist({ "results": [username] })) {
                console.log("detected valid username");
            }
            if (checkEmailExist({ "results": [email] })) {
                console.log("detected valid email");
            }
            // Execute SQL query that'll select the account from the database based on the specified username and password
            connection.query(`INSERT INTO accounts (username,password,email,created_on) VALUES ('${username}', '${password}','${email}', CURRENT_TIMESTAMP);`, function (error, results, fields) {
                // If there is an issue with the query, output the error
                //console.log(error, results, fields);

                if (error) throw error;
                // If the account exists
                if (results.rows.length > 0 && false) {
                    if (checkLoginCred(username, password)) {
                        console.log("logging out");
                    }
                    // Authenticate the user
                    connection.query(`UPDATE accounts SET loggedin = 'true' WHERE username = '${username}' AND password = '${password}';`)
                    loggedin = true;
                    sendUsername = username;
                    // Redirect to home page
                    res.render('pages/loggedin', results);
                } else {
                    res.render('pages/login');
                }
                connection.release();
                res.end();
            });
        } else {
            if (existUsername['results'].length == 0) {
                res.send('Email is taken. Please press back and enter a different email.');
            } else {
                res.send('Username is taken. Please press back and enter a different username.');
            }

            res.end();
        }

    })

    // Update by Nabila (2022/28/07): modified getQuery to provide number of pending invoices and remaining balance
    .get('/clients', (req, res) => {
        // var getQuery = "SELECT * FROM clients ORDER BY clientid";
        var getQuery = `
        SELECT Clients.clientid, Clients.clientname, contactname, email, cntrycode, phone, pendingInvoices, remBalance
        FROM Clients
        LEFT JOIN (SELECT clientid, COUNT(*) AS pendingInvoices, SUM(balance) AS remBalance
        FROM invoices WHERE status IN ('OVERDUE', 'PENDING', 'PARTIALLY PAID') 
        GROUP BY clientid) AS q
        ON Clients.clientid = q.clientid
        ORDER BY Clients.clientid;
        `;

        pool.query(getQuery, (error, result) => {
            if (error) res.end(error);
            var results = { 'rows': result.rows };
            res.render('pages/client', results);
            res.end();
        })
    })

    // Do we still need this?? (***)
    .get('/newClient.html', function (request, response) {

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

    .get('/newClient', (req, res) => {
        res.render('pages/newClient')
    })

    // Update by Nabila (7/20/2022): Create a new Client Page
    .post('/newClient/Added', async (req, res) => {

        // Use 'name' from input to get the req.body
        var uCID = req.body.inClID;
        var uCName = req.body.inClName;
        var uConName = req.body.inConName;
        var uEmail = req.body.inEmail;
        var uAreaCode = req.body.inAreaCode;
        var uPhone = req.body.inPhnNum;
        var uConMethod = req.body.inlineRadioOptions;
        var uAddr = req.body.inAddr;

        var checkQuery = `SELECT * FROM clients WHERE clientid='${uCID}'`;
        const resultCheck = await pool.query(checkQuery);

        if (resultCheck.rowCount == 0) {

            var getQuery = `INSERT INTO clients VALUES ('${uCID}', '${uCName}', '${uConName}', '${uEmail}', '${uAreaCode}', '${uPhone}', '${uConMethod}', '${uAddr}')`;

            try {
                const result = await pool.query(getQuery);
                // window.alert('Successfully added Client.');
                res.redirect(`/clients`);
            }
            catch (error) {
                res.end(error);
            }
        } else {
            // window.alert('Failed to Add Client.\n Check your input and make sure client id is unique.');
            res.redirect(`/clients`);
        }
    })

    //buggy viewclient code
    // Fixed by Nabila: Forgot quotes around ${clientID} in line 484
    .get('/viewclient/:clientid', (req, res) => {
        let clientID = req.params.clientid;
        var getQuery = `SELECT * FROM clients WHERE clientid='${clientID}'`;
        pool.query(getQuery, (error, result) => {
            if (error) res.end(error);
            var results = { 'rows': result.rows };
            res.render('pages/viewClient', results);
        })
    })

    //change the student info
    .get('/editClient/:clientid', (req, res) => {
        let clientID = req.params.clientid;
        var getQuery = `SELECT * FROM clients WHERE clientid='${clientID}'`;

        pool.query(getQuery, (error, result) => {
            if (error) res.end(error);

            var results = { 'rows': result.rows };
            res.render('pages/editClient', results);
        })
    })

    .get('pages/editClient', (req, res) => {
        res.redirect('pages/editClient')
    })

    //not working
    .post('/updateClient/:clientid', async (req, res) => {

        var uCID = req.body.inClID;
        var uCName = req.body.inClName;
        var uConName = req.body.inConName;
        var uEmail = req.body.inEmail;
        var uAreaCode = req.body.inAreaCode;
        var uPhone = req.body.inPhnNum;
        var uConMethod = req.body.inlineRadioOptions;
        var uAddr = req.body.inAddr;

        var inOldName = req.body.oldName; // get oldname; this will help make sure clientid is unique

        var checkQuery = `SELECT * FROM clients WHERE clientid='${uCID}' AND clientname!='${inOldName}'`;
        const resultCheck = await pool.query(checkQuery);

        if (resultCheck.rowCount == 0) {
            // var getQuery = `UPDATE clients SET clientid='${uCID}', clientname='${uCName}', contactname='${uConName}', email='${uEmail}', cntrycode='${uAreaCode}', phone='${uPhone}', address='${uAddr}' WHERE clientid='${uCID}'`;      
            var getQuery = `
            UPDATE clients 
            SET clientid='${uCID}', clientname='${uCName}', contactname='${uConName}', email='${uEmail}', 
            cntrycode='${uAreaCode}', phone='${uPhone}', contactmethod='${uConMethod}', address='${uAddr}' 
            WHERE clientid='${uCID}';
            `;
            try {
                const result = await pool.query(getQuery);
                // window.alert('Successfully updated Student.');
                res.redirect(`/clients`); //redirect to all clients page
            }
            catch (error) {
                res.end(error);
            }
        } else {
            // window.alert('Failed to Updated.\n Check your input and make sure student id is unique.');
            res.redirect(`/clients`);
        }

    })

    //changed req.body to req.params to debug (Nick) AUG-1 and added ;
    .post('/deleteClient/:clientID', (req, res) => {
        pool.query(`DELETE FROM clients WHERE clientid='${clientID}';`);
        res.redirect('/clients');
    })

    //fixing up template (NICK) AUG-1
    .get('/template/:clientid', (req, res) => {
        let clID = req.body.clientid;
        var getQuery = `SELECT * FROM clients WHERE clientid='${clID}'`;
        pool.query(getQuery, (error, result) => {
            if (error)
                res.end(error);
            var results = { 'rows': result.rows };
            res.render('pages/template', results);
        })
    })


    .get('/invoicepage', (req, res) => {
        var getQuery = "SELECT * FROM invoices ORDER BY invoiceid";
        pool.query(getQuery, (error, result) => {
            if (error) res.end(error);
            var results = { 'rows': result.rows };
            res.render('pages/invoicepage', results);
        })
    })

    .get("/addInvoice", (req, res) => {
        res.render("/pages/createinvoice")
    })



    .get('/productspage', (req, res) => {
        var getQuery = `
        SELECT Product.productid, productname, modelseries, description, price, totalquantity 
        FROM Product 
        LEFT JOIN (SELECT productid, SUM(quantity) AS totalquantity FROM OrderByLine GROUP BY productid) AS q 
        ON Product.productid = q.productid 
        ORDER BY Product.productid;
        `;

        pool.query(getQuery, (error, result) => {
            if (error) res.end(error);
            var results = { 'rows': result.rows };
            res.render('pages/productspage', results);
        })
    })

    .get('/newProduct', (req, res) => {
        res.render('pages/newProduct')
    })


    .post('/newProduct/Added', (req, res) => {
        var uPrdctID = req.body.prdctID
        var uPrdctName = req.body.prdctName
        var uPrice = req.body.prdctPrice
        var uMdlSeries = req.body.prdctModel
        var uCategory = req.body.prdctCategory
        var uDescription = req.body.prdctDesc

        var getQuery = `INSERT INTO product VALUES ('${uPrdctID}', '${uPrdctName}', '${uCategory}', '${uMdlSeries}', ${uPrice}, '${uDescription}');`;
        pool.query(getQuery, (error, result) => {
            if (error)
                res.end(error);
            res.redirect('/pages/productspage');
        })
    })


    //edit this later with nabila query
    // Modified by Nabila (2022/07/30): Rename 'client' to 'product'
    .get('/viewProductInfo/:productid', (req, res) => {
        let pID = req.params.productid;
        var getQuery = `SELECT * FROM product WHERE productid='${pID}';`;
        pool.query(getQuery, (error, result) => {
            if (error) res.end(error);
            var results = { 'rows': result.rows };
            res.render('pages/viewProductInfo', results);
        })
    })

    .get('/editProductInfo/:productid', (req, res) => {
        let pID = req.params.productid;
        var getQuery = `SELECT * FROM product WHERE productid='${pID}';`;
        pool.query(getQuery, (error, result) => {
            if (error) res.end(error);
            var results = { 'rows': result.rows };
            res.render('pages/editProductInfo', results);
        })
    })

    //NICK aug-2
    .post('updateProductInfo/:productid', (req, res) => {
        var uPrdctID = req.body.prdctID;
        var uPrdctName = req.body.prdctName;
        var uPrice = req.body.prdctPrice;
        var uMdlSeries = req.body.prdctModel;
        var uCategory = req.body.prdctCategory;
        var uDescription = req.body.prdctDesc;

        var getQuery = `UPDATE product SET productid='${uPrdctID}', productname='${uPrdctName}', 
        category='${uCategory}', modelseries='${uMdlSeries}', price=${uPrice}, 
        description='${uDescription}' WHERE productid='${uPrdctID}';`;

        pool.query(getQuery, (error, result) => {
            if (error)
                res.end(error);
            res.redirect('/pages/productspage');
        })
    })


    //added a deleteproduct (NICK) AUG-1
    .post('/deleteProductInfo/:productid', (req, res) => {
        let pID = req.params.productid;
        pool.query(`DELETE FROM product WHERE productid='${pID}';`);
        res.redirect('/productspage');
    })


    // Modified getQuery: Nabila (07/29/2022)
    .get('/paymentspage', (req, res) => {
        // var getQuery = "SELECT * FROM  payments ORDER BY paymentid";
        var getQuery = `
        SELECT paymentid, paymentStatus, clients.clientname, amount, payments.invoiceid, method, payments.paymentDate, notes 
        FROM Payments 
        LEFT JOIN Invoices ON Payments.invoiceid = Invoices.invoiceid 
        LEFT JOIN Clients ON Invoices.clientid = Clients.clientid;
        `;
        pool.query(getQuery, (error, result) => {
            if (error) res.end(error);
            var results = { 'rows': result.rows };
            res.render('pages/paymentspage', results);
        })

    })

    //Nick
    // Last updated by Nabila: Modified the query
    .get('/newPayment', (req, res) => {
        var getQuery = `SELECT c.clientid, c.clientname, i.invoiceid, i.clientid, i.balance AS clientid_invoices 
        FROM Invoices i LEFT JOIN Clients c ON i.clientid = c.clientid;`;
        pool.query(getQuery, (error, result) => {
            if (error) res.end(error);
            var results = { 'rows': result.rows };
            res.render('pages/newPayment', results);
        })
    })

    //prototyping newPayment (Nick Aug-1)

    .post('/newPayment/Added', (req, res) => {
        var uPayID = req.body.paymentID;
        var uPaymentStatus = req.body.paymentStatus;
        var uPaymentDate = req.body.paymentDate;
        var uAmount = req.body.amnt;
        var uInvoiceID = req.body.invoiceID_ClientName; //change name
        var uMethod = req.body.paymentMethod;
        var uNotes = req.body.paymentNotes;

        //var sameID = req.body.

        //var checkQuery = `SELECT * FROM Payments WHERE paymentID='${uPayID}' `;
        //const resultCheck = await pool.query(checkQuery);

        //if (resultCheck.rowCount == 0) {

        var getQuery = `INSERT INTO Payments VALUES ('${uPayID}', '${uPaymentStatus}', '${uPaymentDate}', ${uAmount}, '${uInvoiceID}', '${uMethod}', '${uNotes}');`;
        pool.query(getQuery, (error, result) => {
            if (error)
                res.end(error);
            res.redirect('/pages/paymentspage');
        })

        /*
        try {
            const result = await pool.query(getQuery);
            // window.alert('Successfully added Client.');
            res.redirect(`pages/paymentspage`);
        }
        catch (error) {
            res.end(error);
        }
        */
        //}else {
        // window.alert('Failed to Add Client.\n Check your input and make sure client id is unique.');
        //res.redirect(`pages/paymentspage`);
        //}
    })


    //Nick Aug 2
    .get('/viewPayment/:paymentid', (req, res) => {
        let payID = req.params.paymentid;
        var getQuery = `SELECT * FROM Payments WHERE paymentid='${payID}';`;
        pool.query(getQuery, (error, result) => {
            if (error) res.end(error);
            var results = { 'rows': result.rows };
            res.render('pages/viewPayment', results);
        })
    })

    //Nick Aug 2
    .get('/editPayment/:paymentid', (req, res) => {
        let payID = req.params.paymentid;
        var getQuery = `SELECT * FROM Payments WHERE paymentid='${payID}';`;
        pool.query(getQuery, (error, result) => {
            if (error) res.end(error);
            var results = { 'rows': result.rows };
            res.render('pages/editPayment', results);
        })
    })

    /* buggy update payment code (NICK AUG 2nd)
    .post('/updatePayment/:paymentid',(req,res)=>{
        var uPayID = req.body.paymentID
        var uPaymentStatus = req.body.paymentStatus
        var uPaymentDate = req.body.paymentDate
        var uAmount = req.body.amnt
        var uInvoiceID = req.body.invoiceID
        var uMethod = req.body.paymentMethod
        var uNotes = req.body.paymentNotes

        //var inOldName = req.body.oldName; // get oldname; this will help make sure clientid is unique

       //var checkQuery = `SELECT * FROM payments WHERE paymentid='${uCID}' AND paymentid!='${inOldName}'`;
        const resultCheck = await pool.query(checkQuery);

        if (resultCheck.rowCount == 0) {
            // var getQuery = `UPDATE clients SET clientid='${uCID}', clientname='${uCName}', contactname='${uConName}', email='${uEmail}', cntrycode='${uAreaCode}', phone='${uPhone}', address='${uAddr}' WHERE clientid='${uCID}'`;      
            var getQuery = `UPDATE Payments SET paymentid='${uPayID}', paymentstatus='${uPaymentStatus}', 
            paymentdate='${uPaymentDate}', amount=${uAmount}, invoiceid='${uInvoiceID}', 
            method='${uMethod}', notes='${uNotes}' WHERE paymentid='${uPayID}';`;
            try {
                const result = await pool.query(getQuery);
                // window.alert('Successfully updated Student.');
                res.redirect(`/paymentspage`); //redirect to all clients page
            }
            catch (error) {
                res.end(error);
            }
        } else {
            // window.alert('Failed to Updated.\n Check your input and make sure student id is unique.');
            res.redirect(`/paymentspage`);
        }
    })
    */

    .get('/dashboard', (req, res) => {
        res.render('pages/loggedin')
    })

    .listen(PORT, () => console.log(`Listening on ${PORT}`))
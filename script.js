const express = require('express');
const bodyParser = require('body-parser');
const mailgun = require('mailgun-js');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


const apiKey= '220f47bd4aac3c2f4650550799296a4a-ee16bf1a-4f79a5ed';
const domain= 'sandbox5c37a7a3ad834606b87c92d81c20021f.mailgun.org';
const mg = mailgun({apiKey: apiKey, domain: domain});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
    const email = req.body.email;

    const data = {
        from: 'Jhanvi<jhanvi4797.be22@chitkara.edu.in>',
        to: email,
        subject: 'WELCOME EMAIL!',
        text: 'WELCOME TO MAILGUN.'
    };

    mg.messages().send(data, (error, body) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent:', body);
            res.sendFile(__dirname + '/index.html');
        }
    });
});

app.listen(3000, () => {
    console.log("Server is running at port 3000!!!");
});
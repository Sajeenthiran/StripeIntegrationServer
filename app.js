const express = require("express");
const app = express();
const { resolve } = require("path");
// This is your real test secret API key.
const stripe = require("stripe")("sk_test_a2LZDwzINdKtCd2BMdo21swn00Mqm40FPi");
//app.use(express.static("."));
//app.use(express.json());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.post("/payment/create-payment-intent", async (req, res) => {
    //const { items } = req.body;
    // Create a PaymentIntent with the order amount and currency
    console.log("Welcome ",req.body);
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 1400,
        currency: "usd"
    });
    res.send({
        clientSecret: paymentIntent.client_secret
    });
});

app.listen(4242, () => console.log('Node server listening on port 4242!'));

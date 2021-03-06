const express = require("express");
const app = express();
const { resolve } = require("path");
// This is your real test secret API key.
const stripe = require("stripe")("sk_test_GIqyLzquU141kcDbnY6AAiA600mv7e6HAF");

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.post("/payment/create-payment-intent", async (req, res) => {
    const body = req.body;
    console.log("Welcome ",req.body);
    const paymentIntent = await stripe.paymentIntents.create({
        amount: body.amount,
        currency: body.currency
    });
    res.send({
        clientSecret: paymentIntent.client_secret
    });
});

app.post("/payment/create-refund-intent", async (req, res) => {
    const body = req.body;
    console.log("Welcome ",req.body);
    const refund = await stripe.refunds.create({
        amount: body.amount,
        payment_intent: body.paymentId,
    });
    res.send({
        refund
    });
});

app.listen(4242, () => console.log('Node server listening on port 4242!'));

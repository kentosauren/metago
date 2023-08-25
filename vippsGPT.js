const express = require("express");
const vipps = require("vipps-nodejs-client");

// configure the vipps client with your API credentials
const vippsClient = vipps({
  clientId: "your_client_id",
  clientSecret: "your_client_secret"
});

// create an express app
const app = express();

// create a route that listens for requests to initiate a payment
app.post("/initiate-payment", (req, res) => {
  // create a new payment object
  const payment = {
    amount: 100,
    customerInfo: {
      mobileNumber: "12345678"
    },
    transactionText: "Payment for product X"
  };

  // use the vipps client to initiate the payment on the Vipps server
  vippsClient.payments
    .initiate(payment)
    .then(response => {
      // the payment was successfully initiated
      // you can use the response object to get the details of the payment
      res.send(response);
    })
    .catch(error => {
      // handle any errors that occurred
      res.send(error);
    });
});

// create a route that listens for requests to capture the payment
app.post("/capture-payment", (req, res) => {
  // get the transaction ID from the request body
  const transactionId = req.body.transactionId;

  // use the vipps client to capture the payment on the Vipps server
  vippsClient.payments
    .capture(transactionId)
    .then(response => {
      // the payment was successfully captured
      // you can use the response object to get the details of the payment
      res.send(response);
    })
    .catch(error => {
      // handle any errors that occurred
      res.send(error);
    });
});

// start the server
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
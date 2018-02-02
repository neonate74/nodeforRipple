'use strict';
const RippleAPI = require('ripple-lib').RippleAPI;

const api = new RippleAPI({
  server: 'wss://s1.ripple.com' // Public rippled server
});

/* begin custom code ------------------------------------ */
const myAddress = 'rh5iaKvcnv7EyUxEUY6Ny6JugHxN4vt1cP';
const amount = 1;
const toAddress = 'rCoinaUERUrXb1aA7dJu8qRcmvPNiKS3d';
const toDestination = 1037093094;

var opayment = {
    "source": {
        "address": myAddress,
        //"tag": unsigned 32bit integer,
        "maxAmount": {
            "value": amount.toString(),
            "currency": "XRP"
        }
    },
    "destination": {
        "address": toAddress,
        "tag": toDestination,
        "amount": {
            "value": amount.toString(),
            "currency": "XRP"
        }
    }
};

api.getFee().then(fee => {
    console.log(fee);
});

const mySecret = 'shM8qsZC26YC9BUq4MunDSP9QMkQx';

api.connect().then(() => {
    return api.preparePayment(myAddress, opayment);
}).then(transaction => {
    console.log(transaction);
    return api.sign(transaction.txJSON, mySecret);
}).then(signedTransaction => {
    console.log(signedTransaction);
    return api.submit(signedTransaction.signedTransaction);
}).then(submitResult => {
    console.log(submitResult);
}).then(() => {
    return api.disconnect();
}).then(() => {
    console.log('done and disconnected.');
}).catch(console.error);

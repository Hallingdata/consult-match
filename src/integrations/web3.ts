import Web3 = require('web3')

var web3 = new Web3(Web3.givenProvider || "ws://localhost:9545");

console.log("Web3 version: " + web3.version)
export default web3
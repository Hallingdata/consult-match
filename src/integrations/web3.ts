import Web3 = require('web3')

var web3 = new Web3(Web3.givenProvider || "ws://localhost:9545");


console.log("web3 version: " + web3.version)
console.log("web3 currentProvider: " + web3.currentProvider)
export default web3
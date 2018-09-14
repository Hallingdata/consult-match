import Web3 = require('web3')
const host = "ws://home.asgeir.me:3034"

var web3 = new Web3(Web3.givenProvider || host);

console.log("Web3 version: " + web3.version)
export default web3
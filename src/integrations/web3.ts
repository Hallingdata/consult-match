import Web3 = require('web3')

const web3Instance = new Web3(new Web3.providers.WebsocketProvider("ws://127.0.0.1:8545"))

console.log("web3 version: " + web3Instance.version)
export default web3Instance
import Web3 = require("web3")
import { Config } from "../config"

var web3 = new Web3(Web3.givenProvider || Config.web3.host)
web3.eth.defaultAccount = web3.eth.accounts[0];
console.log("Web3 version: " + web3.version)
export default web3

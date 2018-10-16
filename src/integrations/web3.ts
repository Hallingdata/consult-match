import Web3 = require("web3")
import { Config } from "../config"

var web3 = new Web3(Web3.givenProvider || Config.web3.host)
// var web3 = new Web3(Config.web3.host)
console.log("Web3 version: " + web3.version)
export default web3

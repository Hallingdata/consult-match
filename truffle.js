var path = require("path")
var HDWalletProvider = require("truffle-hdwallet-provider")
var secret = require("./secret.json")

module.exports = {
  // See <http://truffeframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "./src/contracts/interfaces"),
  //contracts_build_directory: "./src/contracts", // this is not working do to a bug (https://github.com/trufflesuite/truffle/issues/862)
  networks: {
    development: {
      host: "home.asgeir.me",
      port: 3034,
      network_id: "*", // Match any network id
      gas: 500000,
    },
    local: {
      host: "localhost",
      port: 8545,
      network_id: "*", // Match any network id
      gas: 500000,
    },
    "ropsten-infura": {
      provider: () =>
        new HDWalletProvider(
          secret.apiSecret,
          "https://ropsten.infura.io/v3/" + secret.apiKey
        ),
      network_id: 3,
    },
  },
}

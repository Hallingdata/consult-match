var path = require("path")
var HDWalletProvider = require("truffle-hdwallet-provider")
const fs = require("fs")

const pathToSecret = "./secret.json"

var secret = {}

try {
  if (fs.existsSync(pathToSecret)) {
    secret = require("./secret.json")
  }
} catch (err) {
  console.log(
    "In order to deploy to Infura - the secret.json file needs to be configurated (see 'secret.json-template')"
  )
}

module.exports = {
  contracts_build_directory: path.join(__dirname, "src/contracts/interfaces"),

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
          secret.infura.apiSecret,
          "https://ropsten.infura.io/v3/" + secret.infura.apiKey
        ),
      network_id: 3,
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
  },

  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      version: "0.4.25",
    }
  }
}

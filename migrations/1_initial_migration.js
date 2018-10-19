const Migrations = artifacts.require("./Migrations")
const Jobs = artifacts.require("./Jobs")
const Consultants = artifacts.require("./Consultants")

module.exports = function(deployer) {
  deployer.deploy(Migrations)
  deployer.deploy(Jobs)
  deployer.deploy(Consultants)
}

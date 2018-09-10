const Migrations = artifacts.require("./Migrations");
const SimpleStorage = artifacts.require("./SimpleStorage")
const Jobs = artifacts.require("./Jobs")
const Consultants = artifacts.require("./Consultants")

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(SimpleStorage)
  deployer.deploy(Jobs)
  deployer.deploy(Consultants)
};

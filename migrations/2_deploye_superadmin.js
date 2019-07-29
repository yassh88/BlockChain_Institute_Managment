const SuperAdmin = artifacts.require("SuperAdmin");

module.exports = function(deployer) {
  deployer.deploy(SuperAdmin);
};

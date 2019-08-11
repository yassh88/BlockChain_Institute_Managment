const SuperAdmin = artifacts.require("SuperAdmin");
const Institute = artifacts.require("Institute");

module.exports = function(deployer) {
  deployer.deploy(SuperAdmin).then(function() {
    // Token price is 0.001 Ether
    var price = 1000000000000000;
    return deployer.deploy(Institute, SuperAdmin.address, price);
  });;
};

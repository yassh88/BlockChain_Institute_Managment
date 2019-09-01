const SuperAdmin = artifacts.require("SuperAdmin");
const Institute = artifacts.require("Institute");

module.exports = function(deployer) {
  deployer.deploy(SuperAdmin).then(function() {
    // Token price is 1 Ether
    var price = 1000000000000000000;
    return deployer.deploy(Institute, SuperAdmin.address,  web3.utils.toWei('1', 'Ether'));
  });;
};

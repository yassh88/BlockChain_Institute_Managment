const SuperAdmin = artifacts.require("SuperAdmin");
const Institute = artifacts.require("Institute");
const Subject = artifacts.require("Subject");

module.exports = function(deployer) {
  deployer.deploy(SuperAdmin).then(function() {
    deployer.deploy(Subject, SuperAdmin.address);
    // Token price is 1 Ether
    var price = 1000000000000000000;
    return deployer.deploy(Institute, SuperAdmin.address,  web3.utils.toWei('1', 'Ether'));
  });;
};

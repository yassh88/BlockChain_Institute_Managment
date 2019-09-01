var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

var expect = chai.expect;
// or:
var assert = chai.assert;
// or:
chai.should();
const SuperAdmin = artifacts.require("./SuperAdmin.sol");
contract('SuperAdmin contract', function(accounts) {
  var admin = accounts[0];
  var buyer = accounts[1];
  describe('SuperAdmin', (account) => {
    let  superAdmin;
    before(async () =>{
      superAdmin = await SuperAdmin.deployed();
    });

    describe('Deployment', async () => {
      it('Deployment Successful', async () => {
        const address  = await superAdmin.address;
        assert.notEqual(address, 0x0);
        assert.notEqual(address, '');
        assert.notEqual(address, null);
        assert.notEqual(address, undefined);
      });
    });

    describe('Admin Is Correct',async () => {
      let admin
      before(async () => {
      admin = await superAdmin.admin();
      });
      it('Admin is Correct', () => {
        assert.equal(admin, 0xa34500A2Bc7ca6dc37884d775CF65B97D6321c4b);
      });
    });

    describe('Login Positive Response', async () => {
      let result;
      before(async () => {
        result = await superAdmin.login({ from: admin});
      });
      it('Login Successful', async () => {
        const event = result.logs[0].args
        assert.equal(event.isLoggedIn, true,'login response true ');
      });
    });

    describe('Login negative Response', async () => {
      let result;
      before(async () => {
        result = await superAdmin.login({ from: buyer});
      });

      it('Login Failed', async () => {
        const event = result.logs[0].args
        assert.equal(event.isLoggedIn, false,'login response false ');
      });
    });
    
  });
});
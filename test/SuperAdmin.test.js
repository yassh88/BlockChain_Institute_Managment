var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

var expect = chai.expect;
// or:
var assert = chai.assert;
// or:
chai.should();
const SuperAdmin = artifacts.require("./SuperAdmin.sol");

describe('SuperAdmin', (address) => {
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

  describe('Login Positive Response', async () => {
    let result;
    before(async () => {
      result = await superAdmin.login('MyInstitute', '123@abc');
    });
    it('Login Successful', async () => {
      const event = result.logs[0].args
      assert.equal(event.isLoggedIn, true,'login response true ');
    });
  });

  describe('Login negative Response', async () => {
    let result;
    before(async () => {
      result = await superAdmin.login('MyInstitue', '@sdf@');
    });

    it('Login Failed', async () => {
      const event = result.logs[0].args
      assert.equal(event.isLoggedIn, false,'login response false ');
    });
  });
  
});
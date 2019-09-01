const Institute = artifacts.require("./Institute.sol");
require('chai').use(require('chai-as-promised')).should()

contract('Institute', function(accounts) {
  var admin = accounts[0];
  var buyer = accounts[1];
  var price = 1000000000000000000; // in 1eth
  let institute;

  describe('Institute', async () => {
  before(async () => {
    institute = await Institute.deployed();
  });

  describe('Deployment',async () => {
    it('Deployment Successfully', async() => {
      const address = await institute.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, '');
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });
  });

  describe('Admin Is Correct',async () => {
    let admin
    before(async () => {
     admin = await institute.admin();
    });
    it('Admin is Correct', () => {
      assert.equal(admin, 0xa34500A2Bc7ca6dc37884d775CF65B97D6321c4b);
    });
  });

  describe('Price Is Correct',async () => {
    let accPrice
    before(async () => {
      accPrice = await institute.accountPrice();
    });
    it('Price is Correct', () => {
      assert.equal(accPrice, price);
    });
  });

  describe('Create Institute', async () => {
    let result;
    before(async () => {
      result = await institute.addInstitute('My Institute', { from: buyer, value: web3.utils.toWei('1', 'Ether')});
    });
    it('Institute Created successfully', async() => {
      const event = result.logs[0].args;
      assert.isNumber(event.id.toNumber(), "Institute Id is number");
      assert.isAbove(event.id.toNumber(), 0, "Institute Id is correct");
      await institute.addInstitute('My Institute', {from:buyer, value: web3.utils.toWei('2', 'Ether')}).should.be.rejected;
      await institute.addInstitute('', {from:buyer, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;
      await institute.addInstitute('My Institute', {from:admin, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;
    });
  });
  describe('Get Address',async () => {
    let instAccounts
    before(async () => {
      instAccounts = await institute.getInstitutesAccounts({from:admin});
    });
    it('Account are more then zero', () => {
      assert.isAbove(instAccounts.length, 0);
    });
    it('Got Address of buyer', () => {
      assert.equal(instAccounts[0], buyer);
    });
    it('Account negative testing',async () => {
      await institute.getInstitutesAccounts({from:buyer}).should.be.rejected;
    });
    describe('Get Institutes details', () => {
      let instDetails;
      before(async() => {
        instDetails = await institute.getInstitutes(instAccounts[0], {from:admin})
      });
      it('get Institutes variables', () => {
        assert.equal(instDetails[0], 1);
        assert.equal(instDetails[1], 'My Institute');
        assert.equal(instDetails[2], 0);
      });
      it('Institutes details testing',async () => {
        await institute.getInstitutes(instAccounts[0],{from:buyer}).should.be.rejected;
      });
    });
  });
  });
});

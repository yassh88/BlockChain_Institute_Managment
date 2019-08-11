const Institute = artifacts.require("./Institute.sol");

contract('Institute', function(accounts) {
  var admin = accounts[0];
  var buyer = accounts[1];
  var price = 1000000000000000; // in weiy
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
      result = await institute.addInstitute('My Institute', 'test', 'test', { from: buyer});
    });
    it('Institute Created successfully', async() => {
      const event = result.logs[0].args;
      assert.isNumber(event.id.toNumber(), "Institute Id is number");
      assert.isAbove(event.id.toNumber(), 0, "Institute Id is correct");
    });
  });
  });
});
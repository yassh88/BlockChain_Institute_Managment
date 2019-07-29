const Institute = artifacts.require("./Institute.sol");

describe('Institute', async () => {
  let institute;
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

  describe('Create Institute', async () => {
    let result;
    before(async () => {
      result = await institute.addInstitute('My Institute');
    });
    it('Institute Created successfully', async() => {
      const event = result.logs[0].args
      console.log(result);
      assert.isNumber(event.instituteCount, "Institute Id is number");
      assert.isAbove(event.instituteCount, 0, "Institute Id is correct");
    });
    
  });
});
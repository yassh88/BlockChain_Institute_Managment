const Subject = artifacts.require("./Subject.sol");
require('chai').use(require('chai-as-promised')).should()

contract('Subject', function(accounts) {
  var admin = accounts[0];
  var buyer = accounts[1];
  let subject;
  describe('Subject', async () => {
    before(async () => {
      subject = await Subject.deployed();
    });

    describe('Deployment',async () => {
      it('Subject Deployment Successfully', async() => {
        const address = await subject.address;
        assert.notEqual(address, 0x0);
        assert.notEqual(address, '');
        assert.notEqual(address, null);
        assert.notEqual(address, undefined);
      });
    });

    describe('Get Subject count', async () => {
      let subjectCount;
      before(async() => {
        subjectCount = await subject.subjectCount();
      });
      it('Subject count is correct', () => {
        assert.isAbove(subjectCount.toNumber(), 0);
        assert.equal(subjectCount.toNumber(), 7);
      });
    });

    describe('Add Subject',async () => {
      let result;
      before(async() => {
        result = await subject.addSubjectByAdmin('Test',  { from: admin});
      });
      it('Check Subject added or not', () => {
        const event = result.logs[0].args;
        assert.isAbove(event.id.toNumber(), 0, "Subject Id is number");
        assert.equal(event.id.toNumber(), 8,  "Subject Id is correct");
      });
    });

    describe('Get Last Added Subject', async () => {
      let subjectDetails;
      before(async() => {
        subjectDetails = await subject.getSubjectsList(8, { from: admin});
      });
      it('get Subject variables', () => {
        assert.equal(subjectDetails[0], 8);
        assert.equal(subjectDetails[1], 'Test');
      });

    });

    describe('Negative testing', () => {
      it('Subject add testing by buyer',async () => {
        await subject.addSubjectByAdmin('test2',{from:buyer}).should.be.rejected;
      });
      it('Subject add testing with empty name',async () => {
        await subject.addSubjectByAdmin('',{from:admin}).should.be.rejected;
      });
      it('Get subject obj testing',async () => {
        await subject.getSubjectsList(8, { from: buyer}).should.be.rejected;
      });
    });


  });

});
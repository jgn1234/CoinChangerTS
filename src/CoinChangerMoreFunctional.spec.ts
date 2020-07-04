import * as CoinChanger from './CoinChangerMoreFunctional'

const expect = require('chai').expect

describe('CoinChanger-coinChanger', function () {
  const test = CoinChanger.coinChanger;
  it('should exist', function () {
    expect(test(67)).to.not.be.undefined;
  });
  it('should return P when passed 1', function () {
    expect(test(1)).to.be.equal('P');
  });
  it('should return PP when passed 2', function () {
    expect(test(2)).to.be.equal('PP');
  });
  it('should return PPP when passed 3', function () {
    expect(test(3)).to.be.equal('PPP');
  });
  it('should return PPPP when passed 4', function () {
    expect(test(4)).to.be.equal('PPPP');
  });
  it('should return N when passed 5', function () {
    expect(test(5)).to.be.equal('N');
  });
  it('should return D when passed 10', function () {
    expect(test(10)).to.be.equal('D');
  });
  it('should return DNP when passed 16', function () {
    expect(test(16)).to.be.equal('DNP');
  });
  it('should return DD when passed 20', function () {
    expect(test(20)).to.be.equal('DD');
  });
  it('should return Q when passed 25', function () {
    expect(test(25)).to.be.equal('Q');
  });
  it('should return QQ when passed 50', function () {
    expect(test(50)).to.be.equal('QQ');
  });
  it('should return QQDNPP when passed 67', function () {
    expect(test(67)).to.be.equal('QQDNPP');
  });
});

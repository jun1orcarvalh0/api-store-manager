const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const productModel = require('../../../src/models/product.model');
const productMock = require('./mocks/product.mock');

describe('Testes de unidade do model de produtos', function () {
  describe('Lista todos os produtos', function () {
    afterEach(sinon.restore);

    it('Recupera todos os produtos com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves([productMock.products])
      const response = await productModel.findAll();

      expect(response).to.be.an('array');
      expect(response).to.be.deep.equal(productMock.products);
    });
    
  });

  describe('Recupera o produto pelo id', function () {
    afterEach(sinon.restore);

    it('Recupera todos os produtos com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves([productMock.productById])
      const response = await productModel.findById(1);

      // expect(response).to.be.an('object');
      expect(response).to.be.deep.equal(productMock.productById[0]);
    });
    
  });
});

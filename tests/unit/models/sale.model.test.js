const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const saleModel = require('../../../src/models/sale.model');
const saleMock = require('../mocks/sale.mock');

describe('Sale Model', function () {
    describe('Cadastrando uma nova venda', function () {
    afterEach(sinon.restore);

    it('Cadastra uma nova venda com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 42 }])
      sinon.stub(connection, 'query').resolves(0)

      const saleId = await saleModel.insertSale();
      await saleModel.insertProducts(saleMock.newSaleModel)

      // expect(response).to.be.an('object');
      expect(saleId).to.be.equal(42);
    });
    
    });
});
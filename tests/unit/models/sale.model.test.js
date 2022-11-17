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
  
  describe('Lista todos as vendas', function () {
    afterEach(sinon.restore);

    it('Recupera todas as vendas com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves([saleMock.sales])
      const response = await saleModel.findAll();

      expect(response).to.be.an('array');
      expect(response).to.be.deep.equal(saleMock.sales);
    });
    
  });

  describe('Recupera o produto pelo id', function () {
    afterEach(sinon.restore);

    it('Recupera o produto pelo id com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves([saleMock.saleById])
      const response = await saleModel.findById(1);

      // expect(response).to.be.an('object');
      expect(response).to.be.deep.equal(saleMock.saleById);
    });
    
  });

  describe('Atualizando uma venda existente', function () {
    afterEach(sinon.restore);

    it('Atualiza uma venda com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves()
      const response = await saleModel.updateBySaleId(saleMock.saleProducts, 1);

      // expect(response).to.be.an('object');
      expect(response).to.be.equal('Sale was updated');
    });
    
  });

  describe('Deletando um produto existente', function () {
    afterEach(sinon.restore);

    it('Deleta uma venda com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves([saleMock.saleDeletedReturn])
      const response = await saleModel.deleteById(1)

      expect(response.affectedRows).to.be.equal(1);
    });
    
  });
});
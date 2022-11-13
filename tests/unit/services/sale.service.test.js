const { expect } = require('chai');
const sinon = require('sinon');
const saleService = require('../../../src/services/sale.service');
const saleModel = require('../../../src/models/sale.model');
// const productMock = require('../mocks/product.mock');

describe('Sale Service', function () {
  describe('Cadastrando uma nova venda', function () {

    afterEach(sinon.restore);

    it('Cadastra uma nova venda com sucesso', async function () {
      sinon.stub(saleModel, 'insertSale').resolves(42);
      sinon.stub(saleModel, 'insertProducts').resolves(0);

      const response = await saleService.createSale([ { productId: 1, quantity: 1 }, { productId: 2, quantity: 5 } ]);

      expect(response.message).to.be.deep.equal({
      id: 42,
      itemsSold: [ { productId: 1, quantity: 1 }, { productId: 2, quantity: 5 } ]
      });
      expect(response.type).to.be.equal(null);
    });

    it('Retorna um erro ao não encontrar productId no DB', async function () {
      sinon.stub(saleModel, 'insertSale').resolves(42);
      sinon.stub(saleModel, 'insertProducts').resolves(0);

      const response = await saleService.createSale([ { productId: 44, quantity: 1 }, { productId: 2, quantity: 5 } ]);

      expect(response.message).to.be.deep.equal('Product not found');
      expect(response.type).to.be.equal('PRODUCT_NOT_FOUND');
    });
  });
  
});

const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const saleController = require('../../../src/controllers/sale.controller');
const saleService = require('../../../src/services/sale.service');
const saleMock = require('../mocks/sale.mock');

describe('Sale Controller', async function () {
  describe('Cadastrando um novo produto', function () {

    afterEach(sinon.restore);

    it('Cadastra um novo produto com sucesso', async function () {
      const req = { params: { }, body: [ { productId: 1, quantity: 1 }, { productId: 2, quantity: 5 } ] };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(saleService, 'createSale').resolves({ type: null, message: {
      id: 3,
      itemsSold: [ { productId: 1, quantity: 1 }, { productId: 2, quantity: 5 } ]
      } });

      await saleController.createSale(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith({
      id: 3,
      itemsSold: [ { productId: 1, quantity: 1 }, { productId: 2, quantity: 5 } ]
      });
    });

    it('Erro ao cadastrar um novo produto sem productId', async function () {
      const req = { params: { }, body: [ { productId: 9999, quantity: 1 }, { productId: 9999, quantity: 5 } ] };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(saleService, 'createSale').resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

      await saleController.createSale(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
    
  });

});
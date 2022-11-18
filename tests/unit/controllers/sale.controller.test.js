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

  describe('Lista todas as vendas', function () {

    afterEach(sinon.restore);

    it('Recupera todos os produtos com sucesso', async function () {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(saleService, 'findAll').resolves({ type: null, message: saleMock.sales });

      await saleController.listSales(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(saleMock.sales);
    });
    
  });

  describe('Recupera a venda pelo id', function () {

    afterEach(sinon.restore);

    it('Recupera a venda pelo id com sucesso', async function () {
      const req = { params: { id: 1 }, body: { } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(saleService, 'findById').resolves({ type: null, message: saleMock.saleById });

      await saleController.getSale(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(saleMock.saleById);
    });
     
    it('Ao passar um id invalido retorna um erro', async function () {
      const req = { params: { id: 99999 }, body: { } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(saleService, 'findById').resolves({ type: 'SALE_NOT_FOUND', message: 'Sale not found' });

      await saleController.getSale(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith();
    });
    
  });

  describe('Atualizando um produto', function () {

    afterEach(sinon.restore);

    it('Atualizando uma venda com sucesso', async function () {
      const req = { params: { id: 1 }, body: saleMock.saleProducts };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(saleService, 'updateSale').resolves({ type: null, message: saleMock.saleUpdated });

      await saleController.updateSale(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(saleMock.saleUpdated);
    });

    it('Erro ao atualizar uma venda que não existe', async function () {
      const req = { params: { id: 9999 }, body: saleMock.saleProducts };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(saleService, 'updateSale').resolves({ type: 'SALE_NOT_FOUND', message: 'Sale not found' });

      await saleController.updateSale(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });
  });

  describe('Deletando uma venda', function () {

    afterEach(sinon.restore);

    it('Deleta uma venda com sucesso', async function () {
      const req = { params: { id: 1 }, body: {}};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(saleService, 'deleteSale').resolves({ type: null, message: '' });

      await saleController.deleteSale(req, res);

      expect(res.status).to.have.been.calledWith(204);
      expect(res.json).to.have.been.calledWith();
    });

    it('Erro ao deletar uma venda que não existe', async function () {
      const req = { params: { id: 9999 }, body: {} };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(saleService, 'deleteSale').resolves({ type: 'SALE_NOT_FOUND', message: 'Sale not found' });

      await saleController.deleteSale(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
});
  });
});
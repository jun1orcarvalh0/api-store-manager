const { expect } = require('chai');
const sinon = require('sinon');
const saleService = require('../../../src/services/sale.service');
const saleModel = require('../../../src/models/sale.model');
const validationProductsFromDB = require('../../../src/services/validations/validationProductsFromDB');
const saleMock = require('../mocks/sale.mock');
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

  describe('Lista todas as vendas', function () {

    afterEach(sinon.restore);

    it('Recupera todas as vendas com sucesso', async function () {
      sinon.stub(saleModel, 'findAll').resolves(saleMock.sales);
      const response = await saleService.findAll();

      expect(response.message).to.be.deep.equal(saleMock.sales);
      expect(response.type).to.be.equal(null);
    });
    
  });
  
  describe('Recupera a venda pelo id', function () {

    afterEach(sinon.restore);

    it('Recupera a venda pelo id com sucesso', async function () {
      sinon.stub(saleModel, 'findById').resolves(saleMock.saleById);
      const response = await saleService.findById(1);

      expect(response.message).to.be.deep.equal(saleMock.saleById)
      expect(response.type).to.be.equal(null);

    });
    
    it('Ao passar um id invalido retorna um erro', async function () {
      sinon.stub(saleModel, 'findById').resolves([]);
      const response = await saleService.findById(9999);

      expect(response.message).to.be.equal('Sale not found');
      expect(response.type).to.be.equal('SALE_NOT_FOUND');
    });
  });

  describe('Atualizando uma venda', function () {

    afterEach(sinon.restore);

    it('Atualiza uma venda com sucesso', async function () {
      const bodyReq = [{ "productId": 1, "quantity": 10 }, { "productId": 2, "quantity": 50 }];
      const id = '1';
      sinon.stub(saleService, 'findById').resolves(saleMock.saleModelFindByIdMock)
      sinon.stub(saleModel, 'updateBySaleId').resolves();
     

      const response = await saleService.updateSale(bodyReq, id);

      expect(response.message).to.be.deep.equal(saleMock.saleUpdated);
      expect(response.type).to.be.equal(null);
    });

    it('Erro ao atualizar uma venda que não existe', async function () {
      const bodyReq = [{ "productId": 1, "quantity": 10 }, { "productId": 2, "quantity": 50 }];
      const id = '9999';
      sinon.stub(saleService, 'findById').resolves({ type: 'SALE_NOT_FOUND', message: 'Sale not found' })
      sinon.stub(saleModel, 'updateBySaleId').resolves();
     

      const response = await saleService.updateSale(bodyReq, id);

      expect(response.message).to.be.deep.equal('Sale not found');
      expect(response.type).to.be.equal('SALE_NOT_FOUND');
    });

    it('Erro ao atualizar uma venda que o produto não existe', async function () {
      const bodyReq = [{ "productId": 100, "quantity": 10 }, { "productId": 2, "quantity": 50 }];
      const id = '1';
      sinon.stub(saleModel, 'updateBySaleId').resolves();
     

      const response = await saleService.updateSale(bodyReq, id);

      expect(response.message).to.be.deep.equal('Product not found');
      expect(response.type).to.be.equal('PRODUCT_NOT_FOUND');
    });
  });

  describe('Deletando uma venda', function () {

    afterEach(sinon.restore);

    it('Deleta uma venda com sucesso', async function () {
      const bodyParams = { id: 1 }
      const { id } = bodyParams;
      sinon.stub(saleService, 'findById').resolves();
      sinon.stub(saleModel, 'deleteById').resolves();
     

      const response = await saleService.deleteSale(id);

      expect(response.message).to.be.deep.equal('');
      expect(response.type).to.be.equal(null);
    });
    
    it('Erro ao deletar uma venda que não existe', async function () {
      const bodyParams = { id: 9999 }
      const { id } = bodyParams;
      sinon.stub(saleService, 'findById').resolves({ type: 'SALE_NOT_FOUND', message: 'Sale not found' })
      sinon.stub(saleModel, 'deleteById').resolves();
     

      const response = await saleService.deleteSale(id);

      expect(response.message).to.be.deep.equal('Sale not found');
      expect(response.type).to.be.equal('SALE_NOT_FOUND');
    });
  });
});

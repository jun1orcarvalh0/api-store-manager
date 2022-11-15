const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const productController = require('../../../src/controllers/product.controller');
const productService = require('../../../src/services/product.service');
const productMock = require('../mocks/product.mock');

describe('Product Controller', async function () {
  describe('Lista todos os produtos', function () {

    afterEach(sinon.restore);

    it('Recupera todos os produtos com sucesso', async function () {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'findAll').resolves({ type: null, message: productMock.products });

      await productController.listProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productMock.products);
    });
    
  });

  describe('Recupera o produto pelo id', function () {

    afterEach(sinon.restore);

    it('Recupera o produto pelo id com sucesso', async function () {
      const req = { params: { id: 1 }, body: { } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'findById').resolves({ type: null, message: productMock.productById });

      await productController.getProduct(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productMock.productById);
    });
     
    it('Ao passar um id invalido retorna um erro', async function () {
      const req = { params: { id: 1 }, body: { } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'findById').resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

      await productController.getProduct(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found'});
    });
    
   });
  
  describe('Cadastrando um novo produto', function () {

    afterEach(sinon.restore);

    it('Cadastra um novo produto com sucesso', async function () {
      const req = { params: { }, body: { name: "ProdutoX" } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'createProduct').resolves({ type: null, message: productMock.newProduct });

      await productController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(productMock.newProduct);
    });
  });

  describe('Atualizando um produto', function () {

    afterEach(sinon.restore);

    it('Atualiza um produto com sucesso', async function () {
      const req = { params: { id: 1 }, body: { name: "Martelo do Batman" } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'updateProduct').resolves({ type: null, message: productMock.returnMessageOnSuccess });

      await productController.updateProduct(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productMock.returnMessageOnSuccess);
    });

    it('Erro ao atualizar um produto que não existe', async function () {
      const req = { params: { id: 9999 }, body: { name: "Martelo do Batman" } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'updateProduct').resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

      await productController.updateProduct(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });

  describe('Deletando um produto', function () {

    afterEach(sinon.restore);

    it('Deleta um produto com sucesso', async function () {
      const req = { params: { id: 1 }, body: {}};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'deleteProduct').resolves({ type: null, message: '' });

      await productController.deleteProduct(req, res);

      expect(res.status).to.have.been.calledWith(204);
      expect(res.json).to.have.been.calledWith();
    });

    it('Erro ao deletar um produto que não existe', async function () {
      const req = { params: { id: 9999 }, body: {} };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'deleteProduct').resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

      await productController.deleteProduct(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
});
  });

});
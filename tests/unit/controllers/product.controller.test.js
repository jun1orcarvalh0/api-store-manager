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

});
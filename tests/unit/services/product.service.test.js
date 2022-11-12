const { expect } = require('chai');
const sinon = require('sinon');
const productService = require('../../../src/services/product.service');
const productModel = require('../../../src/models/product.model');
const productMock = require('../mocks/product.mock');

describe('Product Service', function () {
  describe('Lista todos os produtos', function () {

    afterEach(sinon.restore);

    it('Recupera todos os produtos com sucesso', async function () {
      sinon.stub(productModel, 'findAll').resolves(productMock.products);
      const response = await productService.findAll();

      expect(response.message).to.be.instanceOf(Array);
      expect(response.type).to.be.equal(null);
    });
    
  });

  describe('Recupera o produto pelo id', function () {

    afterEach(sinon.restore);

    it('Recupera o produto pelo id com sucesso', async function () {
      sinon.stub(productModel, 'findById').resolves(productMock.productById);
      const response = await productService.findById();

      expect(response.message).to.be.instanceOf(Array);
      expect(response.type).to.be.equal(null);

    });
    
    it('Ao passar um id invalido retorna um erro', async function () {
      sinon.stub(productModel, 'findById').resolves(undefined);
      const response = await productService.findById(1);

      expect(response.message).to.be.equal('Product not found');
      expect(response.type).to.be.equal('PRODUCT_NOT_FOUND');
    });
  });

  describe('Cadastrando um novo produto', function () {

    afterEach(sinon.restore);

    it('Cadastra um novo produto com sucesso', async function () {
      sinon.stub(productModel, 'insert').resolves([{ insertId: 42 }]);
      sinon.stub(productModel, 'findById').resolves(productMock.newProduct);
      const response = await productService.createProduct();

      expect(response.message).to.be.deep.equal(productMock.newProduct);
      expect(response.type).to.be.equal(null);
    });
    
    // it('Ao passar um id invalido retorna um erro', async function () {
    //   sinon.stub(productModel, 'findById').resolves(productMock.productById);
    //   const response = await productService.findById();

    //   expect(response.message).to.be.instanceOf(Array);
    //   expect(response.type).to.be.equal(null);
    // });
  });
  
});

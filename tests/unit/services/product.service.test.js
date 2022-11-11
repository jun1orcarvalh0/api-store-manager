const { expect } = require('chai');
const sinon = require('sinon');
const productService = require('../../../src/services/product.service');
const productModel = require('../../../src/models/product.model');
const productMock = require('../models/mocks/product.mock');

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
  
});

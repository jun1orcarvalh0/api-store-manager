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

  describe('Recupera os produtos que contem no nome a query', function () {

    afterEach(sinon.restore);

    it('Recupera o produto pela query com sucesso', async function () {
      sinon.stub(productModel, 'findByQuery').resolves(productMock.productById);
      const response = await productService.findByQuery('Martelo');

      expect(response.message).to.be.deep.equal(productMock.productById);
      expect(response.type).to.be.equal(null);

    });

    it('Recupera todos os produtos ao não passar uma query', async function () {
      sinon.stub(productModel, 'findByQuery').resolves(productMock.products);
      const response = await productService.findByQuery('Martelo');

      expect(response.message).to.be.instanceOf(Array);
      expect(response.type).to.be.equal(null);

    });
    
    it('Ao passar uma query invalida retorna um array vazio', async function () {
      sinon.stub(productModel, 'findById').resolves([]);
      const response = await productService.findByQuery('Flash');

      expect(response.message).to.be.deep.equal([]);
      expect(response.type).to.be.equal(null);
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
  });
  
  describe('Atualizando um produto', function () {

    afterEach(sinon.restore);

    it('Atualiza um produto com sucesso', async function () {
      const bodyReq = { name: "Martelo do Batman", id: 1 }
      const { name, id } = bodyReq;
      sinon.stub(productModel, 'findById')
        .onCall(0).resolves({ id: 1, name: 'Martelo de Thor' })
        .onCall(1).resolves({ id: 1, name: 'Martelo do Batman' });
      sinon.stub(productModel, 'updateById').resolves();
     

      const response = await productService.updateProduct(name, id);

      expect(response.message).to.be.deep.equal({id: 1, name: 'Martelo do Batman'});
      expect(response.type).to.be.equal(null);
    });

    it('Erro ao atualizar um produto que não existe', async function () {
      const bodyParams = { id: 9999 }
      const { id } = bodyParams;
      sinon.stub(productModel, 'findById')
        .onCall(0).resolves();
      sinon.stub(productModel, 'updateById').resolves();
     

      const response = await productService.updateProduct(id);

      expect(response.message).to.be.deep.equal('Product not found');
      expect(response.type).to.be.equal('PRODUCT_NOT_FOUND');
    });
  });

  describe('Deletando um produto', function () {

    afterEach(sinon.restore);

    it('Deleta um produto com sucesso', async function () {
      const bodyParams = { id: 1 }
      const { id } = bodyParams;
      sinon.stub(productModel, 'findById')
        .onCall(0).resolves({ id: 1, name: 'Martelo de Thor' });
      sinon.stub(productModel, 'deleteById').resolves();
     

      const response = await productService.deleteProduct(id);

      expect(response.message).to.be.deep.equal('');
      expect(response.type).to.be.equal(null);
    });
    
    it('Erro ao deletar um produto que não existe', async function () {
      const bodyParams = { id: 9999 }
      const { id } = bodyParams;
      sinon.stub(productModel, 'findById')
        .onCall(0).resolves();
      sinon.stub(productModel, 'deleteById').resolves();
     

      const response = await productService.deleteProduct(id);

      expect(response.message).to.be.deep.equal('Product not found');
      expect(response.type).to.be.equal('PRODUCT_NOT_FOUND');
    });
  });
});

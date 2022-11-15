const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const productModel = require('../../../src/models/product.model');
const productMock = require('../mocks/product.mock');

describe('Product Model', function () {
  describe('Lista todos os produtos', function () {
    afterEach(sinon.restore);

    it('Recupera todos os produtos com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves([productMock.products])
      const response = await productModel.findAll();

      expect(response).to.be.an('array');
      expect(response).to.be.deep.equal(productMock.products);
    });
    
  });

  describe('Recupera o produto pelo id', function () {
    afterEach(sinon.restore);

    it('Recupera o produto pelo id com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves([productMock.productById])
      const response = await productModel.findById(1);

      // expect(response).to.be.an('object');
      expect(response).to.be.deep.equal(productMock.productById[0]);
    });
    
  });

  describe('Cadastrando um novo produto', function () {
    afterEach(sinon.restore);

    it('Cadastra um novo produto com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 42 }])
      const response = await productModel.insert(productMock.newProduct);

      // expect(response).to.be.an('object');
      expect(response).to.be.equal(42);
    });
    
  });

  describe('Atualizando um produto existente', function () {
    afterEach(sinon.restore);

    it('Atualiza um produto com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves([productMock.resultUpdateById])
      const response = await productModel.updateById(1);

      // expect(response).to.be.an('object');
      expect(response.affectedRows).to.be.equal(1);
    });
    
  });

  describe('Deletando um produto existente', function () {
    afterEach(sinon.restore);

    it('Deleta um produto com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves([productMock.resultUpdateById])
      const response = await productModel.deleteById(1);

      expect(response.affectedRows).to.be.equal(1);
    });
    
  });
});

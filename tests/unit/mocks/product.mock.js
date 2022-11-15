const products = [
  {
    id: 1,
    name: "Martelo de Thor"
  },
  {
    id: 2,
    name: "Traje de encolhimento"
  }
]

const productById = [{
  id: 1,
  name: "Martelo de Thor"
}];

const newProduct = {
  id: "42",
  name: "ProdutoX"
}

const resultUpdateById = {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  info: 'Rows matched: 1  Changed: 1  Warnings: 0',
  serverStatus: 2,
  warningStatus: 0,
  changedRows: 1
  }

const returnMessageOnSuccess = { id: 1, name: 'Martelo do Batman' }

module.exports = {
  products,
  productById,
  newProduct,
  resultUpdateById,
  returnMessageOnSuccess,
};
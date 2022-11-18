const sales = [
  {
    "saleId": 1,
    "productId": 1,
    "quantity": 5,
    "date": "2022-11-17T14:09:19.000Z"
  },
  {
    "saleId": 1,
    "productId": 2,
    "quantity": 10,
    "date": "2022-11-17T14:09:19.000Z"
  },
  {
    "saleId": 2,
    "productId": 3,
    "quantity": 15,
    "date": "2022-11-17T14:09:19.000Z"
  }
]

const saleById = [
  {
    "productId": 1,
    "quantity": 5,
    "date": "2022-11-17T14:09:19.000Z"
  },
  {
    "productId": 2,
    "quantity": 10,
    "date": "2022-11-17T14:09:19.000Z"
  }
]

const saleUpdated = {
  "saleId": "1",
  "itemsUpdated": [
    {
      "productId": 1,
      "quantity": 10
    },
    {
      "productId": 2,
      "quantity": 50
    }
  ]
}

const saleProducts = [
  {
    "productId": 1,
    "quantity": 10
  },
  {
    "productId": 2,
    "quantity": 50
  }
]

const saleDeletedReturn = {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  info: '',
  serverStatus: 2,
  warningStatus: 0
};

const saleModelFindByIdMock = {
  type: null,
  message: [{ productId: 1, quantity: 5, date: '2022-11-17T21:26:45.000Z' },{ productId: 2, quantity: 10, date: '2022-11-17T21:26:45.000Z' }]
}

const newSaleModel = [
  { saleId: 42, productId: 1, quantity: 1 },
  { saleId: 42, productId: 2, quantity: 5 }];

module.exports = {
  newSaleModel,
  sales,
  saleById,
  saleUpdated,
  saleProducts,
  saleDeletedReturn,
  saleModelFindByIdMock,
  saleUpdated,
}
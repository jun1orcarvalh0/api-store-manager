# :department_store: API de Gerenciamento de Loja

[Leia em português!](./README_pt-br.md)

## :page_with_curl: About

This is a CRUD API for a store manager. It is built using NodeJS, Express and MySQL. I have used the MSC (Models, Services, Controllers) architecture for this project and Docker for containerization. Development was done using TDD (Test Driven Development) and the tests were written using Mocha, chai and sinon.

You can Create, Read, Update and Delete (CRUD) products and sales records.

## :man_technologist: Technologies

* Node.js
* Express.js
* Express Rescue
* DotEnv
* Mocha.js
* Chai.js
* Sinon.js
* Docker
* MySQL

## :hammer_and_wrench: How to run the project

To run this application you need to have **Git**, **Docker** and **Docker Compose** installed on your computer. Docker Compose needs to be at version 2.10.2 or higher.

### 1 - Clone the repository
```sh
git clone git@github.com:jun1orcarvalh0/api-store-manager.git
```

### 2 - Enter the project folder
```sh
cd api-store-manager
```

### 3 - Run the containers by running the command below in the root folder of the application
```sh
docker-compose up -d --build
```

This will start the MySQL container and the NodeJS container. The MySQL container will be running on port 3306 and the NodeJS container will be running on port 3000.

### 4 - After the containers are running, you will need to connect to the bash of the NodeJS container:

```sh
docker exec -it store_manager bash
```

### 5 - In the container terminal, install the dependencies and run the application

Installing the dependencie:
```sh
npm install
```

Running the application:
```sh
npm start
```

### 6 - Run the following command in the container terminal to check test coverage
```sh
npm run test:mocha
```
<br />
</details>

## :books: Documentation

### Routes - Products

- GET <code>/products</code> : Lists all products in the store.
- GET <code>/products/:IdDoProduto</code> : Lists the product with the desired ID.
- GET <code>/products/search?q=TERMO_DE_BUSCA</code> : Lists the products with the name entered as a search term.
- POST <code>/products</code> : Creates a new product, according to the passed body. It must be the "name" property and the name of the product.
- PUT <code>/products/:IdDoProduto</code> : Changes the name of an existing product with the specified ID. It must be the "name" property and the name of the product.
- DELETE <code>/products/:IdDeProduto</code> : Deletes the product with the desired ID.

### Routes - Sales

- GET <code>/sales</code> : Lists all sales in the store.
- GET <code>/sales/:IdDaVenda</code> :  Lists the sale with the desired ID.
- POST <code>/sales</code> : Creates a new sale, according to the body passed. An array of objects must be passed, each with "productId" and "quantity" properties
- PUT <code>/sales/:IdDaVenda</code> : Changes an existing sale with the specified ID. An array of objects must be passed, each with "productId" and "quantity" properties.
- DELETE <code>/sales/:IdDaVenda</code> : Deletes a sale with the desired ID.

### Body Examples

- Create/Update a product:
```json
{ 
  "name": "Nome do Produto"
}
```

- Create/Update a sale:
```json
[
  { 
    "productId": 1,
    "quantity": 10
  },
  { 
    "productId": 2,
    "quantity": 5
  }
]
```

## :test_tube: Tests Coverage

50 tests were developed that cover 100% of the application:

![Test Coverage - Cobertura dos testes](./test-coverage.png)

# :department_store: Store Manager

## :page_with_curl: Sobre

Projeto Node.js e Express.js desenvolvido no curso de Desenvolvimento Web da Trybe. Fui aprovado com 100% dos requisitos obrigatórios e opcionais atingidos.

Tivemos que criar uma API RESTful usando a arquitetura MSC (Model-Service-Controller) e implementar testes unitários com Mocha, Chai e Sinon.

## :man_technologist: Tecnologias

### Desafios
* Criar uma aplicação Express.js
* Criar uma API RESTful usando arquitetura MSC (Model-Service-Controller)
* Validar dados das requisições com a biblioteca Joi
* Implementar testes unitários com Mocha, Chai e Sinon

### Tecnologias
* Node.js
* Express.js
* Express Rescue
* DotEnv
* Joi
* Mocha.js
* Chai.js
* Sinon.js
* Docker
* MySQL

## :hammer_and_wrench: Instalação e execução

Para rodar está aplicação é necessário ter **Git**, **Docker** e o **Docker Compose** instalados no seu computador. O Docker Compose precisa estar na versão **2.10.2** ou superior.

### 1 - Clone o repositório
```sh
git clone git@github.com:jun1orcarvalh0/api-store-manager.git
```

### 2 - Rode os containers executando o comando abaixo na pasta raiz da aplicação
```sh
docker-compose up -d --build
```

### 3 - Execute os scripts SQL para criar o banco de dados

Conecte ao servidor MySQL rodando na porta 3306 usando um cliente MySQL de sua preferência. Utilize as seguintes credenciais:

* host: `db`
* user: `root`
* password: `password`

Então, no cliente, execute os scripts que estão nos arquivos `migration.sql` e `seed.sql`, nessa ordem.

### 4 - Rode o comando para abrir o terminal do container store_manager
```sh
docker exec -it store_manager bash
```

### 5 - No terminal do container, installe as dependências e execute a aplicação

Instalando dependências:
```sh
npm install
```

Executando aplicação:
```sh
npm start
```

### 6 - Rode o seguinte comando no terminal do container para verificar a cobertura dos testes
```sh
npm run test:mocha
```
<br />
</details>

## :books: Documentação

### Rotas - Products

- GET <code>/products</code> : Lista todos os produtos da loja.
- GET <code>/products/:IdDeProduto</code> : Lista o produto com o ID desejado.
- GET <code>/products/search?q=TERMO_DE_BUSCA</code> : Lista os produtos com o nome inserido como termo de busca.
- POST <code>/products</code> : Cria um novo produto, de acordo com o body passado. Deve ser informada a propriedade "name" e o nome do produto.
- PUT <code>/products/:IdDeProduto</code> : Altera o nome de um produto existente com o ID informado. Deve ser informada a propriedade "name" e o nome do produto.
- DELETE <code>/products/:IdDeProduto</code> : Deleta o produto com o ID desejado.

### Rotas - Sales

- GET <code>/sales</code> : Lista todos as vendas da loja.
- GET <code>/sales/:IdDeVenda</code> : Lista a venda com o ID desejado.
- POST <code>/sales</code> : Cria uma nova venda, de acordo com o body passado. Deve ser passado um array de objetos, cada um com as propriedades "productId" e "quantity".
- PUT <code>/sales/:IdDeVenda</code> : Altera uma venda existente com o ID informado. Deve ser passado um array de objetos, cada um com as propriedades "productId" e "quantity".
- DELETE <code>/sales/:IdDeVenda</code> : Deleta uma venda com o ID desejado.

### Exemplos de Body

- Criação/Alteração de produto:
```json
{ 
  "name": "Nome do Produto"
}
```

- Criação/Alteração de venda:
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

## :test_tube: Cobertura de Testes

Foram desenvolvidos 56 testes que cobrem 100% da aplicação:

![Test Coverage - Cobertura dos testes](./test-coverage.png)

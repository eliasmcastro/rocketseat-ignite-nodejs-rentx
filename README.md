<h1 align="center">
  <img alt="Ignite" src=".github/logo_ignite.png" width="200px" />
</h1>

<h3 align="center">
  Rentx
</h3>

<p align="center">O Rentx é um projeto (API) para aluguel de carros</p>

<p align="center">
  <a href="#como-executar-o-projeto">Como executar o projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#anotações">Anotações</a>
</p>

<p align="center">Back-end</p>

<p align="center">
  <img alt="Back-end" src=".github/backend.png" width="90%">
</p>

## Como executar o projeto

### Clonar este repositório

```bash
git clone https://github.com/eliasmcastro/rocketseat-ignite-nodejs-rentx.git
```

### Requisitos

- [Node.js](https://nodejs.org)
- [Yarn](https://yarnpkg.com)

#### Opcional

- [Insomnia](https://insomnia.rest)
- [Docker](https://www.docker.com)

### Passos para a execução

**1. Executar aplicação**

Instalar as dependências do projeto

```bash
yarn
```

Iniciar o servidor de desenvolvimento

```bash
yarn dev
```

A aplicação começará a ser executada em http://localhost:3333

_Dica: utilizar o Insomnia para testar as rotas_

- Abrir o Insomnia -> Application -> Preferences -> Data -> Import Data -> From File -> Selecionar o arquivo insomnia.json

### Testes automatizados

Para executar os testes

```bash
yarn test
```

## Anotações

### Configurando estrutura

- `yarn init -y` cria o arquivo package.json
- `yarn add typescript -D` instala o TypeScript
- `yarn add express` instala o Express
- `yarn add @types/express -D` instala a definição de tipo da biblioteca Express
- `yarn tsc --init` cria o arquivo de configuração do TypeScript
- `yarn add ts-node-dev -D` instala ferramenta que reinicia automaticamente o servidor quando alterações nos arquivos são detectadas
- Em package.json:

```json
"scripts": {
  "dev": "ts-node-dev --transpile-only --ignore-watch node_modules --respawn src/server.ts"
}
```

### Padrões de Projeto com ESLint e Prettier

- [Documentação](https://www.notion.so/ESLint-e-Prettier-Trilha-Node-js-d3f3ef576e7f45dfbbde5c25fa662779)

### Debugando Node.js pelo VS Code

- Configurar o arquivo launch.json conforme as configurações abaixo:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "attach",
      "protocol": "inspector",
      "restart": true,
      "name": "Debug",
      "skipFiles": ["<node_internals>/**"]
    }
  ]
}
```

- Para que o debugger possa se conectar à nossa aplicação, é necessário que o comando dev esteja da seguinte maneira:

```json
"scripts": {
  "dev": "ts-node-dev --inspect --transpile-only --ignore-watch node_modules --respawn src/server.ts"
}
```

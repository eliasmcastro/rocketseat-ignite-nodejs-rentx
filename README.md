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

<p align="center">Banco de Dados</p>

<p align="center">
  <img alt="Back-end" src=".github/database.png" width="90%">
</p>

## Como executar o projeto

### Clonar este repositório

```bash
git clone https://github.com/eliasmcastro/rocketseat-ignite-nodejs-rentx.git
```

### Requisitos

- [Node.js](https://nodejs.org)
- [Yarn](https://yarnpkg.com)
- [Docker](https://www.docker.com)

#### Opcional

- [Insomnia](https://insomnia.rest)
- [DBeaver](https://dbeaver.io/)

### Passos para a execução

**1. Instalar as dependências**

Instalar as dependências do projeto

```bash
yarn
```

**2. Criar os containers utilizando o Docker**

Criar e iniciar os containers do banco de dados e da aplicação

```bash
docker-compose up -d
```

**3. Executar as migrations**

Executar as migrations

```bash
yarn typeorm migration:run
```

**4. Rotas da aplicação**

- A aplicação começará a ser executada em http://localhost:3333
- A documentação da API pode ser acessada em http://localhost:3333/api-docs

_Dica: utilizar o Insomnia para testar as rotas_

- Abrir o Insomnia -> Application -> Preferences -> Data -> Import Data -> From File -> Selecionar o arquivo insomnia.json

**5. Banco de dados**

Você pode utilizar o DBeaver para acessar o banco de dados da aplicação, utilizando os seguintes dados de conexão:
  - Host: localhost
  - Database: rentx
  - Username: docker
  - Password: ignite

**6. Logs da aplicação**

Executar o comando `docker logs -f rentx`

**7. Operações com os containers criados**

- `docker-compose up` para criar e iniciar os containers
- `docker-compose start` para iniciar os containers
- `docker-compose stop` para parar os containers
- `docker-compose down` para remover os containers
- `docker-compose down -v --rmi local` para remover tudo (containers, volumes e imagens)

### Testes automatizados

Para executar os testes

```bash
yarn test
```

## Anotações

### Ferramentas utilizadas

- [Node.js](https://nodejs.org)
  - O Node.js deve ser instalado via [package manager](https://nodejs.org/en/download/package-manager/) utilizando o Chocolatey no Windows
    - Instalar o [Chocolatey](https://chocolatey.org/install)
    - Executar `cinst nodejs-lts` para instalar o Node.js
    - Executar `node -v` e `npm -v` para verificar se a instalação deu certo
- [Yarn](https://yarnpkg.com)
  - Instalar o Yarn
  - Executar `yarn -v` para verificar se a instalação deu certo
- [Visual Studio Code](https://code.visualstudio.com)

### Configurando estrutura

- `yarn init -y` cria o arquivo package.json
- `yarn add typescript -D` instala o TypeScript
- `yarn add express` instala o Express
- `yarn add @types/express -D` instala a definição de tipo da biblioteca Express
- `yarn add uuid` instala o UUID
- `yarn add @types/uuid -D` instala a definição de tipo da biblioteca UUID
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

- Nota: Foi necessário adicionar essa regra `"editor.formatOnSave": false` no settings.json do VSCode para funcionar

### Debugando Node.js pelo VS Code

- Criar arquivo launch.json, escolher Node.js e configurá-lo conforme as configurações abaixo:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "attach",
      "restart": true,
      "name": "App Debug",
      "skipFiles": ["<node_internals>/**"]
    }
  ]
}
```

- Para que o debugger possa se conectar à nossa aplicação, é necessário que o comando dev tenha a flag `--inspect`:

```json
"scripts": {
  "dev": "ts-node-dev --inspect --transpile-only --ignore-watch node_modules --respawn src/server.ts"
}
```

### SOLID

- S => SRP: Single Responsiblity Principle (Princípio da responsabilidade única)
- O => OCP: Open-Closed Principle (Princípio Aberto-Fechado)
- L => LSP: Liskov Substitution Principle (Princípio da substituição de Liskov)
- I => ISP: Interface Segregation Principle (Princípio da Segregação da Interface)
- D => DIP: Dependency Inversion Principle (Princípio da inversão da dependência)

### Upload de arquivos

- `yarn add multer` para instalar o multer
- `yarn add @types/multer -D` instala a definição de tipo da biblioteca multer

### Leitura de arquivos CSV

- `yarn add csv-parse` para instalar a csv-parse

### Swagger

- `yarn add swagger-ui-express` para instalar o swagger
- `yarn add @types/swagger-ui-express -D` instala a definição de tipo da biblioteca swagger
- Para acessar a documentação criada: http://localhost:3333/api-docs

### Docker e Docker Compose

- [Documentação de instalação do docker](https://efficient-sloth-d85.notion.site/Docker-e-Docker-Compose-16771f2ceefe4a05a8c29df4ca49e97a)
- `docker build -t rentx .` para criar imagem da aplicação
- `docker run -p 3333:3333 rentx` para criar container da imagem da aplicação
- `docker ps` para visualizar apenas os containers em execução
- `docker ps -a` para visualizar todos os containers (parados e em execução)
- `docker exec -it ${nomeContainer} /bin/bash` para acessar um container
  - CTRL + D para sair
- `docker logs -f ${nomeContainer}` para ver log de um container
- `docker start ${nomeContainer}` para iniciar um container
- `docker stop ${nomeContainer}` para parar um container
- `docker rm ${nomeContainer}` para remover um container
- `docker images` para listar imagens
- `docker rmi ${nomeImagen}` para remover uma imagem
- `docker-compose up` para criar e iniciar um container
- `docker-compose up -d` para criar e iniciar um container, mas libera o terminal
- `docker-compose up --force-recreate -d` para forçar re-criar e iniciar um container, mas libera o terminal
- `docker-compose start` para iniciar um container
- `docker-compose stop` para parar um container
- `docker-compose down` para remover um container
- `docker-compose down -v --rmi local` para remover tudo (containers, volumes e imagens)
- No Windows é necessário adicionar no script de dev no package.json a flag `--poll` para que qualquer alteração realizadas nos arquivos sejam refletidas no container

```json
"scripts": {
  "dev": "ts-node-dev --inspect --transpile-only --poll --ignore-watch node_modules --respawn src/server.ts"
}
```

### TypeORM

- `yarn add typeorm@0.2.45` para instalar o typeorm
  - [Atualizando o TypeORM no Rentx](https://efficient-sloth-d85.notion.site/Atualizando-o-TypeORM-no-Rentx-7988bcb23f9f417197fcf2113a74161a)
  - [Refatoração Docker com TypeORM](https://efficient-sloth-d85.notion.site/Refatora-o-Docker-com-TypeORM-4500fc0d075349ac9b97d670e734d41b)
- `yarn add reflect-metadata` para instalar o reflect-metadata
- `yarn add pg` para instalar o driver do PostgreSQL

### Migrations

- `yarn typeorm migration:create -n CreateCategories` para criar a migration de categorias
- `yarn typeorm migration:create -n CreateSpecifications` para criar a migration de categorias
- `yarn typeorm migration:create -n CreateUsers` para criar a migration de usuários
- `yarn typeorm migration:run` para executar as migrations criadas
- `yarn typeorm migration:revert` para reveter a execução das migrations

### Injeção de dependência

- `yarn add tsyringe` para instalar o TSyringe

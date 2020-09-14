<p align="center">
  <img alt="Launchbase" src="https://storage.googleapis.com/golden-wind/bootcamp-launchbase/logo.png" width="400px" />
</p>
<br>
<p align="center">

  <a href="https://rocketseat.com.br">
    <img alt="Made by Rocketseat" src="https://img.shields.io/badge/made%20by-Rocketseat-%23F8952D">
  </a>

</p>

<hr>
<br>

<p align="center">
  <img src="./assets/logo.png" alt="foodfy" width="100px" />
</p>
<h2 align="center">
  Desafio Final: Foodfy - Aplicação completa
</h2>
<br>

<blockquote align="center">“Se você quer chegar onde a maioria não chega, faça o que a maioria não faz.” (Bill Gates)</blockquote>
<br>

<p align="center">

  <a href="LICENSE">
    <img alt="LICENSE" src="https://img.shields.io/npm/l/express">
  </a>
  <a href="NPM">
    <img alt="NPM" src="https://img.shields.io/npm/v/npm">
  </a>
  <a href="GitHub followers">
    <img alt="GitHub followers" src="https://img.shields.io/github/followers/BrunoBelarminoNog?style=social">
  </a>
</p>
<hr>

<p align="center">
  <a href="#rocket-sobre-o-desafio">Sobre o desafio</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#art-layout">Layout</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#books-sobre o Bootcamp">Sobre o Bootcamp</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#pushpin-contribuindo">Contribuindo</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#unlock-licença">Licença</a>
</p>

<br>

# :rocket: Sobre o desafio

O Foodfy é uma aplicação que possibilita aos chefs de cozinha compartilharem suas receitas e demonstrarem seus dotes culinários para o
mundo. O site apresenta as receitas de maneira detalhada e explicativa, relacionando os ingredientes com o modo de
preparo e informações adicionais pertinentes.

**O Foodfy é o projeto de conclusão para o bootcamp LaunchBase da Rocketseat.**

<br>

## :computer: Tecnologias utilizadas
A seguinte stack foi utilizada na construção do projeto:

- NODE.JS
- NUNJUCKS
- POSTGRESQL

<br>

## :construction_worker: Instalação

**Primeiramente você precisa ter instalado o [Node.js](https://nodejs.org/en/download/) e o [Postbird](https://github.com/Paxa/postbird), depois efetuar o clone deste repositório a partir do seguinte comando:**

```
git clone https://github.com/BrunoBelarminoNog/foodfy.git
```

URLs SSH fornecem acesso a um repositório Git via SSH, um protocolo seguro. Se você tiver uma chave SSH registrada em
sua conta do Github, clone o projeto usando este comando:

```
git clone git@github.com:BrunoBelarminoNog/foodfy.git
```

**Instale as dependências**

```
npm install
```

**Configure o banco de dados**

Crie o banco de dados dentro do [Postbird](https://github.com/Paxa/postbird) utilizando as queries do arquivo [database.sql](https://github.com/BrunoBelarminoNog/FoodFy/blob/master/database.sql). 
E no arquivo [db.js](https://github.com/BrunoBelarminoNog/FoodFy/blob/master/src/config/db.js) configure a conexão do Postbird com o user e password da sua máquina:


```
const { Pool } = require("pg");

module.exports = new Pool({
user: '<YOUR USER>',
password: '<YOUR PASSWORD>',
host: 'localhost',
port: '5432',
database: 'foodfy'
})
```

**Alimente o banco de dados**

```
node seed.js
```

**Inicie o servidor**

```
npm start
```


Após o início do servidor, graças a dependência [browser-sync](https://www.browsersync.io/) que já esta instalada, será aberta automaticamente uma janela em seu navegador na porta: ```http://localhost:3000/``` rodando o projeto.

<br>

## :runner: Let's start

**Login**

O arquivo seed.js cria diversos usuários automaticamente dentro do banco de dados. Vale ressaltar que por padrão todos estão sendo criados com a senha "1111". 

Para logar, pegue um dos e-mails gerados pela dependencia do [faker.js](https://github.com/marak/Faker.js/), e efetue login com a senha padrão.

<br>

**Administradores do sistema**

Somente usuários identificados como administradores do sistema possuem autorização para criar/editar/deletar qualquer usuário, receita e chef. 

Usuários comuns apenas podem criar, editar e deletar suas próprias receitas.

<br>

# :art: Layout

<p align="center">
  <img src="./assets/Foodfy-Google-Chrome-2020-09-13-22-20-39.gif" alt="homepage foodfy" />
</p>
<p align="center">
  <img src="./assets/Foodfy-Google-Chrome-2020-09-13-22-23-33.gif" alt="login foodfy" />
</p>


# :books: Sobre o Bootcamp
O LaunchBase é um bootcamp oferecido pela Rocketseat, com aulas ministradas por Mayk Brito, que tem como objetivo preparar iniciantes no mundo do desenvolvimento web para o mercado de trabalho. Explicando de forma clara e objetiva as stacks mais usadas atualmente.

Este repositório é um clone de parte do repositório master que contêm além deste  projeto, todos os outros feitos em aula e as atividades extras do decorrer do curso. [Acesse clicando aqui!](https://github.com/BrunoBelarminoNog/bootcamp_launchbase_rocketseat)


# :pushpin: Contribuindo

Sinta-se à vontade para registrar um novo problema com o respectivo título e descrição no repositório Foodfy . Se você já encontrou uma solução para o problema, eu adoraria revisar sua solicitação de pull!

Verifique a página de contribuição para ver os melhores lugares para registrar problemas, iniciar discussões e começar a contribuir.


# :unlock: Licença
Lançado em 2020. Este projeto está sob a licença do MIT .

Feito com muita dedicação por Bruno Belarmino :zap:

Me siga nas redes! [LinkdIn](https://www.linkedin.com/in/bruno-belarmino-nog/) - [Instagram](https://www.instagram.com/brunobelarmino)
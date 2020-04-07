const express = require('express');

//Aplicação criada
const app = express();

app.use(express.json());

//Um GET para o recurso (resource) chamado "projects"
app.get('/projects', (req, res) => {

  const {title, owner} = req.query;

  console.log(title);
  console.log(owner);

  return res.json({message: 'Hello World!'});
});

//Um POST para o recurso (resource) chamado "projects"
app.post('/projects', (req, res) => {

  const body = req.body;

  console.log(body);

  return res.json([
    'Projeto 1',
    'Projeto 2',
    'Projeto 3',
  ])
});

//:id quer dizer que quando for dado um PUT em "projects", ele deverá vir com o informação do id
//no caso a URL ficaria: //localhost:3333/projects/2  => Para id == 2
app.put('/projects/:id', (req, res) => {

  const params = req.params;

  console.log(params);

  return res.json([
    'Projeto 1',
    'Projeto 2',
    'Projeto 4',
  ]);
});

app.delete('/projects/:id', (req, res) => {
  return res.json([
    'Projeto 1',
    'Projeto 4'
  ]);
});

//Dizer em qual porta a aplicação rodará
app.listen(3333, () => {console.log('🐱‍🏍 Back-End Started!')});
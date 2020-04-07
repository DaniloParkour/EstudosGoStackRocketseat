const express = require('express');
const {uuid} = require('uuidv4');

//Aplicação criada
const app = express();

const projects = [];

app.use(express.json());

//Um GET para o recurso (resource) chamado "projects"
app.get('/projects', (req, res) => {

  const {title} = req.query;

  const result = title ? projects.filter(proj => proj.title.includes(title))
                       : projects;
  
  return res.json(result);

});

//Um POST para o recurso (resource) chamado "projects"
app.post('/projects', (req, res) => {

  const {title, owner} = req.body;
  
  const project = {id: uuid(), title, owner}
  
  projects.push(project);
  
  return res.json(project);

});

//:id quer dizer que quando for dado um PUT em "projects", ele deverá vir com o informação do id
//no caso a URL ficaria: //localhost:3333/projects/2  => Para id == 2
app.put('/projects/:id', (req, res) => {

  const {id} = req.params;
  const {title, owner} = req.body;

  const projIndex = projects.findIndex(project => project.id === id);

  if(projIndex < 0)
    return res.status(400).json({error: 'Project Not Found.'});

  const proj = {id, title, owner};
  projects[projIndex] = proj;
  
  return res.json(proj);
});

app.delete('/projects/:id', (req, res) => {

  const {id} = req.params;

  const projIndex = projects.findIndex(project => project.id === id);

  if(projIndex < 0)
    return res.status(400).json({error: 'Project Not Found.'});

  projects.splice(projIndex, 1);


  return res.status(204).send();
});

//Dizer em qual porta a aplicação rodará
app.listen(3333, () => {console.log('🐱‍🏍 Back-End Started!')});
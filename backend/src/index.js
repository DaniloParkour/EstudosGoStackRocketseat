const express = require('express');
const cors = require('cors');
const {uuid, isUuid} = require('uuidv4');

//Aplicação criada
const app = express();

app.use(cors()); //Assim está permitido que qualquere frontend acesso nossos recursos

/* Fazendo o Cors filtrar o endereço do frontend que pode acessar
app.use(cors({
  origin: 'http://localhost:3000'
}));
*/

app.use(express.json());

const projects = [];

/*Usamos um MIDDLEWARE quando queremos disparar automaticamente uma função em uma ou mais rotas
Ex: O middle abaixo, logRequest*/
function logRequest(req, res, next) {
  const {method, url} = req;
  
  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.time(logLabel);

  /*Se eu não chamar o NEXT o próximo MIDDLEWARE não vai ser executado.
  Lembrando que o próximo é dado de forma linear ao código*/
  
  //return next(); //Execute the Next Middleware

  //Eu tiro o return e chamo apenas o next() para depois colocar mais código
  next();

  console.timeEnd(logLabel);
}

function validateProjectID(req, res, next) {
  const {id} = req.params;
  if(!isUuid(id)) {
    return res.status(400).json({error: 'ID Is Not Valid!'});
  }
  return next();
}

app.use('/projects/:id', validateProjectID);

//Após a definição do MIDDLEWARE, dar uma app.use no middleware
app.use(logRequest);

//Se for usar o MIDDLEWARE aqui, basta colocar quantos mids quiser antes da função da rota
//Ex:
//app.get('/exemplo', logRequest, verifyUsarData, hasBadname, (req, res) => {/*GET CODE HERE...*/})

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
//app.put('/projects/:id', validateProjectID, (req, res) => {
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

//app.delete('/projects/:id', validateProjectID, (req, res) => {
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
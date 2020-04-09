import React, {useState, useEffect} from 'react';
import Header from './components/Header';
import api from './services/api';

import myNameImage from './assets/cat.png';

//O Webpack vai se encarregar da importação do CSS abaixo
import './App.css';

export default function App() {

  const [projects, setProjects] = useState([]);

  //Recebe 2 parametros, a função a disparar e quando disparar
  //useEffect(() => {}, [projects]); //Será chamada qunado o valor de projects mudar
  //OBS: A função passada para o useEffect NÃO PODE SER ASYNC
  useEffect(() => {
    //A linhan abaixo poderia usar também Async Await no lugar de then
    api.get('/projects').then( response => { //Executa o then depois que o get retornar a resposta
      setProjects(response.data);
    });
  }, []); //Será chamado quando a página for carregada

  async function handleAddProject() {
    //setProjects([...projects, `Novo Projeto ${Date.now()}`]);

    const response = await api.post('/projects', {
      title: `Novo Projeto ${Date.now()}`,
      owner: 'Danilo Carvalho'
    });

    const project = response.data;

    setProjects([...projects, project]);

  }

  return(
    <>
      <Header title="Hello Omni!"/>

      <img width={260} src={myNameImage} />

      <ul>
        { projects.map((project => (<li key={project.id}> {project.title} </li>))) }
      </ul>

      <button type="button" onClick={handleAddProject}> Adicionar Novo Projeto! </button>

    </>
  );
}
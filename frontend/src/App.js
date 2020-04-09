import React, {useState} from 'react';
import Header from './components/Header';
import myNameImage from './assets/cat.png';

//O Webpack vai se encarregar da importação do CSS abaixo
import './App.css';

export default function App() {

  const [projects, setProjects] = useState(['Desenvolvimento Web', 'Front-End Web Com ReactJS']);

  function handleAddProject() {
    setProjects([...projects, `Novo Projeto ${Date.now()}`]);
  }

  return(
    <>
      <Header title="Hello Omni!"/>

      <img width={260} src={myNameImage} />

      <ul>
        { projects.map((project => (<li key={project}> {project} </li>))) }
      </ul>

      <button type="button" onClick={handleAddProject}> Adicionar Novo Projeto! </button>

    </>
  );
}
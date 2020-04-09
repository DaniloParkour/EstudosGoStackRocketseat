import React, {useState} from 'react';
import Header from './components/Header';

export default function App() {

  const [projects, setProjects] = useState(['Desenvolvimento Web', 'Front-End Web Com ReactJS']);

  function handleAddProject() {
    setProjects([...projects, `Novo Projeto ${Date.now()}`]);
  }

  return(
    <>
      <Header title="Hello Omni!"/>

      <ul>
        { projects.map((project => (<li key={project}> {project} </li>))) }
      </ul>

      <button type="button" onClick={handleAddProject}> Adicionar Novo Projeto! </button>

    </>
  );
}
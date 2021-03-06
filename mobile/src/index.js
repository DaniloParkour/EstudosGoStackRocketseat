import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, Text, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';

import api from './services/api';

export default function App() {

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('/projects').then(response => {
      setProjects(response.data);
    });
  }, []);

  async function handleAddProject() {
    const response = await api.post('/projects',  {
      title: `Novo Projeto ${Date.now()}`,
      owner: 'Danilo Carvalho'
    });

    setProjects([...projects, response.data]);
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor='#7159c1'/>

      <SafeAreaView style={styles.container}>
        <FlatList
          data = {projects}
          keyExtractor = {project => project.id}
          renderItem = {({item: project}) => (
            <Text style = {styles.project}>{project.title}</Text>
          )}
        />
        <TouchableOpacity 
          activeOpacity={0.6}
          style={styles.button}
          onPress={handleAddProject}
        >
          <Text style={styles.buttonText}>Adicionar Projeto!</Text>
        </TouchableOpacity>
      </SafeAreaView>

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#7159c1',
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  project: {
    color: '#fff',
    fontSize: 26,
  },
  button: {
    backgroundColor: '#fff',
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
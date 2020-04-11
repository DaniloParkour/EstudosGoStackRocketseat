//Importar as definições de Request e Response
import {Request, Response} from 'express';
import CreateUser from './services/CreateUser';
import CreateClient from './services/CreateClient';

const userUndef = CreateUser(undefined,'Teste', 'Teste');
const userTest = CreateUser('Teste','Teste', 'Teste');

const client = CreateClient(
  {
    email: 'email@mail.com', 
    password: '123456', 
    name: 'NamePerson', 
    clients: ['Valen', 'Nick', 456],
    services: [
      {
        title: 'Unity Engine',
        experience: 9872
      },
      {
        title: 'React Native',
        experience: 870
      }
    ]
  }
);

export function helloWorld(request: Request, response: Response) {
  return response.json({message: 'Hello World!'});
}
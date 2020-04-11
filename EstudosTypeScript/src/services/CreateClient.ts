//Tipos: string, number, boolean, object, array
//Interfaces
interface ServiceObject {
  title: string,
  experience: number
}

interface CreateClientData {
  name?: string, //O (?) diz que name é opcional
  email: string,
  password: string,
  services: ServiceObject[],
  clients: Array<string | number>
}

//export default function CreateClient({email, password}: CreateClientData) {
export default function CreateClient(data: CreateClientData) {

}
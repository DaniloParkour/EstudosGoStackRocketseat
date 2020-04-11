import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.2.2:3333'
});

export default api;

/* OBS: Sobre a baseURL
   - iOS com Emulador: localhost
   - iOS físico: ip do computador
   - Android Emulador: Para Usar Localhost Precisa
       > adv reverse tcp:3333 tcp:3333
       * O Andoid precisa fazer isso pois o emulador do andoir é uma maquina virtual,
         diferente do emulador do iOS que usa o MacOS (OSX) para emular o dispositivo físico
       * O localhost do android é a própria máquina virtual
       * Fazer esse comando com o emulador aberto
       * O comando acima redireciona a PORTA 3333 da nossa máqiuina para a do emulador
   - Android Emulador Do Android Studio: Usar o IP 10.0.2.2 (Ganymotion 10.0.3.2)
   - Android Físico: Ip da máquina

*/
import io from 'socket.io-client';
import VueSocketIOExt from 'vue-socket.io-extended';

import config from './../config/config';

const socket = io(config.backendPath);

export default async({store, Vue}) => {
  Vue.use(VueSocketIOExt, socket, {store});
};

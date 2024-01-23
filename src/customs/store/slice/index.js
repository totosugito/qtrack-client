import root from './root';
// import router from './router';
import router from '../../../reducers/router';
import auth from './auth';
import socket from './socket';
import core from './core';
import orm from '../../../reducers/orm'

const reducers = ({router: router, root: root, auth: auth, socket: socket, core: core, orm: orm});
export default reducers;

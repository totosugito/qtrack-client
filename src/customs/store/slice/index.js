// import root from './root';
// import router from './router';
// import auth from './auth';
// import socket from './socket';
// import core from './core';

import router from '../../../reducers/router';
import socket from '../../../reducers/socket';
import orm from '../../../reducers/orm'
import root from '../../../reducers/root';
import auth from '../../../reducers/auth';
import core from '../../../reducers/core';
import ui from '../../../reducers/ui';

const reducers = ({router: router, root: root, auth: auth, socket: socket, core: core, orm: orm, ui: ui});
export default reducers;

// import root from './root';
// import router from './router';
// import auth from './auth';
// import socket from './socket';
// import core from './core';

import router from '../../../redux/reducers/router';
import socket from '../../../redux/reducers/socket';
import orm from '../../../redux/reducers/orm'
import root from '../../../redux/reducers/root';
import auth from '../../../redux/reducers/auth';
import core from '../../../redux/reducers/core';
import ui from '../../../redux/reducers/ui';

const reducers = ({router: router, root: root, auth: auth, socket: socket, core: core, orm: orm, ui: ui});
export default reducers;

import Config from './Config';

const ROOT = `${Config.BASE_PATH}/`;
const LOGIN = `${Config.BASE_PATH}/login`;
const HOME_MAP = `${Config.BASE_PATH}/home-map`;
const PROJECTS_LIST = `${Config.BASE_PATH}/projects-list`;
const PROJECTS = `${Config.BASE_PATH}/projects/:id`;
const BOARDS = `${Config.BASE_PATH}/boards/:id`;
const CARDS = `${Config.BASE_PATH}/cards/:id`;
const BOARD_GANTT = `${Config.BASE_PATH}/boards/:id/gantt`;
const BOARD_REPORT = `${Config.BASE_PATH}/boards/:id/report`;

export default {
  ROOT,
  LOGIN,
  HOME_MAP,
  PROJECTS_LIST,
  PROJECTS,
  BOARDS,
  BOARD_GANTT,
  BOARD_REPORT,
  CARDS,
};

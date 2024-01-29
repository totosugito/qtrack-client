import Config from './Config';

const ROOT = `${Config.BASE_PATH}/`;
const LOGIN = `${Config.BASE_PATH}/login`;
const HOME_MAP = `${Config.BASE_PATH}/home-map`;
const PROJECTS_LIST = `${Config.BASE_PATH}/projects-list`;
const PROJECTS = `${Config.BASE_PATH}/projects/:id`;
const BOARDS = `${Config.BASE_PATH}/boards/:id`;
const KANBAN = `${Config.BASE_PATH}/kanban/:id`;
const GANTT = `${Config.BASE_PATH}/gantt/:id`;
const CARDS = `${Config.BASE_PATH}/cards/:id`;

export default {
  ROOT,
  LOGIN,
  HOME_MAP,
  PROJECTS_LIST,
  PROJECTS,
  BOARDS,
  KANBAN,
  GANTT,
  CARDS,
};

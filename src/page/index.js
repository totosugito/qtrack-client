
import Loadable from "../component/Loadable";
import {lazy} from "react";

const Error404 = Loadable(lazy(() => import('./error-404')))
const UiLogin = Loadable(lazy(() => import('./ui-login')))
const UiHome = Loadable(lazy(() => import('./ui-home')))
const UiProjectList = Loadable(lazy(() => import('./ui-project-list')))
const UiProjectOpen = Loadable(lazy(() => import('./ui-project-open')))
const UiProjectBoard = Loadable(lazy(() => import('./ui-project-board')))
const UiHomeMap = Loadable(lazy(() => import('./ui-home-map')))
export {Error404, UiLogin, UiHome, UiProjectList, UiProjectOpen, UiProjectBoard, UiHomeMap}


import Loadable from "../component/Loadable";
import {lazy} from "react";

const UiLogin = Loadable(lazy(() => import('./ui-login')))
const UiHome = Loadable(lazy(() => import('./ui-home')))
const UiProjectList = Loadable(lazy(() => import('./ui-project-list')))
const UiProjectOpen = Loadable(lazy(() => import('./ui-project-open')))
const UiHomeMap = Loadable(lazy(() => import('./ui-home-map')))
export {UiLogin, UiHome, UiProjectList, UiProjectOpen, UiHomeMap}


import Loadable from "../component/Loadable";
import {lazy} from "react";

const UiLogin = Loadable(lazy(() => import('./page/ui-login')))
const UiHome = Loadable(lazy(() => import('./page/ui-home')))
const UiProjectList = Loadable(lazy(() => import('./page/ui-project-list')))
const UiHomeMap = Loadable(lazy(() => import('./page/ui-home-map')))
export {UiLogin, UiHome, UiProjectList, UiHomeMap}

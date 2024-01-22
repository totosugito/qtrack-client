
import Loadable from "../../component/Loadable";
import {lazy} from "react";

const PageUiLogin = Loadable(lazy(() => import('./page/ui-login')))
const SkkHome = Loadable(lazy(() => import('./page/ui-home')))
// const SkkProjectList = Loadable(lazy(() => import('./page/ui-project-list')))
const SkkHomeMap = Loadable(lazy(() => import('./page/ui-home-map')))
// const SkkProjectCreate = Loadable(lazy(() => import('./page/ui-project-create')))
// const SkkProjectOpen = Loadable(lazy(() => import('./page/ui-project-open')))
// const SkkProjectEdit = Loadable(lazy(() => import('./page/ui-project-edit')))
// const UiProjectKanban = Loadable(lazy(() => import('./page/ui-project-kanban')))
// const UiProjectGantt = Loadable(lazy(() => import('./page/ui-project-gantt')))
export {PageUiLogin, SkkHome, SkkHomeMap,
    // SkkHomeMap, SkkProjectList, SkkProjectCreate, SkkProjectOpen, SkkProjectEdit, UiProjectKanban, UiProjectGantt
}

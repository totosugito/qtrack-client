import {baseURL, isDebug} from "../config"
import Config from "../../constants/Config";

export function getRouterUrl(key, prefix="/", param={}) {
    let routers = {
        "404": prefix + "error-404",
        "root": prefix,
        "skk-home": prefix + "skk/home",
        "page-login": prefix + "login",
        "skk-home-map": prefix + "skk/home-map",
        "skk-project-list": prefix + "skk/project-list",
        "skk-project-create": prefix + "skk/project-create",
        "skk-project-open": prefix + "skk/project-open/" + (("id" in param) ? `${param["id"]}` : ":id"),
        "skk-project-edit": prefix + "skk/project-edit/" + (("id" in param) ? `${param["id"]}` : ":id"),
        "skk-project-kanban": prefix + "skk/project-kanban/" + (("id" in param) ? `${param["id"]}` : ":id"),
        "skk-project-gantt": prefix + "skk/project-gantt/" + (("id" in param) ? `${param["id"]}` : ":id"),
        "demo-boards": prefix + "boards/" + (("id" in param) ? `${param["id"]}` : ":id"),

        "ui-input-csv": prefix + 'ui-input-csv',
        "ui-syncfusion-kanban": prefix + 'ui-syncfusion-kanban',
        "ui-trello-kanban": prefix + 'ui-trello-kanban',

        "dummy-task-list": prefix + "dummy/task-list",
        "ccdp-dashboard": prefix + "ccdp/dashboard",
        "ccdp-project-create": prefix + "ccdp/project-create",
        "ccdp-project-open": prefix + "ccdp/project-open/" + (("id" in param) ? `${param["id"]}` : ":id"),

        "ccdp-v1-dashboard": prefix + "ccdp-v1/dashboard",
        "ccdp-v1-project-edit": prefix + "ccdp-v1/project-edit",
        "ccdp-v1-project-list": prefix + "ccdp-v1/project-list",
        "ccdp-v1-project-open": prefix + "ccdp-v1/project-open/" + (("id" in param) ? `${param["id"]}` : ":id"),

        "ccdp-v1-model-edit": prefix + "ccdp-v1/model-edit",
        "ccdp-v1-model-list": prefix + "ccdp-v1/model-list",
        "ccdp-v1-model-open": prefix + "ccdp-v1/model-open/" + (("id" in param) ? `${param["id"]}` : ":id"),

        "ccdp-v1-job-create": prefix + "ccdp-v1/project-open/" + (("id" in param) ? `${param["id"]}` : ":id") + "/job-create",
        "ccdp-v1-job-open": prefix + "ccdp-v1/job-open/" + (("id" in param) ? `${param["id"]}` : ":id") + "/" + (("jobId" in param) ? `${param["jobId"]}` : ":jobId"),
    }
    return(routers[key])
}

export function getRouterApi(key, param={}) {
    let apis = {
        "dummy-task-status": Config.SERVER_BASE_URL + `/api/dummy/status/${param['id']}` ,
        "api-config": Config.SERVER_BASE_URL + "/api/config" ,
    }
    let url = apis[key]
    if (isDebug)
        console.log(url)
    return(url)
}

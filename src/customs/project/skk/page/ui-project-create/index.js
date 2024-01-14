import BaseUi from "../base-ui";
import {Box, Breadcrumbs, useTheme} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {BrProjectCreate, BrProjectList, SkkToolbar} from "../../component";
import {useSelector} from "react-redux";
import FormProjectEdit from "./component/form_project_edit";
import {skkProjectAdd} from "../../../../store/slice/skk";
import {dispatch} from "../../../../store";
import {getRouterUrl} from "../../../../router";

const UiProjectCreate = (props) => {
    const navigate = useNavigate()
    const theme = useTheme()
    const styles = {
        container: {
            p: 1,
            mt: 1
        },
    }

    const project = {
        id: 0,
        title: '',
        desc: "",
        info: "",
        creator: {},
        created: '',
        gantt: [],
        kanban: [{
            Id: "Task 1",
            Status: "Open",
            Priority: "Normal",
            Assignee: "Andrew Fuller",
            Estimate: 0,
            Tags: "",
            Summary: "Sample card",
        }]
    }
    const dataStore = useSelector((state) => state.skk)

    const handleSubmit = (project) => {
        project.id = Math.floor(Math.random() * 1000000)
        project.created = new Date().toLocaleString()
        project.updated = new Date().toLocaleString()
        project.creator = {"name": dataStore["user"]["name"], "avatar": dataStore["user"]["avatar"]}

        dispatch(skkProjectAdd(project))
        navigate(getRouterUrl("skk-project-list"))
    }

    return (
        <>
            <BaseUi toolbar={<SkkToolbar user={dataStore["user"]}/>}>
                <Box maxWidth="xl" sx={styles.container}>
                    <Breadcrumbs sx={{mb: 1}}>
                        <BrProjectList/>
                        <BrProjectCreate hasClick={false}/>
                    </Breadcrumbs>

                    <FormProjectEdit data={project} onSubmit={handleSubmit} submitText={"Create Project"}/>
                </Box>
            </BaseUi>
        </>
    )
}
export default UiProjectCreate
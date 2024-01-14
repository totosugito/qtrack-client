import BaseUi from "../base-ui";
import {Box, Breadcrumbs, Typography, useTheme} from "@mui/material";
import {useParams} from "react-router-dom";
import {BrLabel, BrProjectList, BrProjectOpen, SkkToolbar} from "../../component";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import TextEditorReadOnly from "../../../../component/TipTap/TextEditorReadOnly";

const UiProjectOpen = (props) => {
    const theme = useTheme()
    const styles = {
        container: {
            p: 1,
            mt: 1,
        },
        label: {
            mt: 2,
            fontWeight: 'bold',
            color: theme.palette.secondary.main
        },
    }

    const params = useParams();
    const dataStore = useSelector((state) => state.skk)
    const [project, setProject] = useState(dataStore["project"])
    const [selectedProject, setSelectedProject] = useState({})


    useEffect(() => {
        let selectedId = params["id"] * 1
        for (let i = 0; i < project.length; i++) {
            if (project[i]["id"] === selectedId) {
                setSelectedProject(project[i])
                break
            }
        }
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <BaseUi toolbar={<SkkToolbar user={dataStore["user"]}/>}>
                <Box maxWidth="xl" sx={styles.container}>
                    <Breadcrumbs sx={{mb: 1}}>
                        <BrProjectList/>
                        <BrLabel label={"Open"}/>
                        <BrProjectOpen label={selectedProject["title"]} hasClick={false}/>
                    </Breadcrumbs>

                    <Typography sx={styles.label}>Title</Typography>
                    <Typography>{selectedProject.title}</Typography>

                    <Typography sx={styles.label}>Description</Typography>
                    <Typography>{selectedProject.desc}</Typography>

                    <Typography sx={styles.label}>Creator</Typography>
                    <Typography>{selectedProject.creator?.name}</Typography>

                    <Typography sx={styles.label}>Created</Typography>
                    <Typography>{selectedProject.created}</Typography>

                    <Typography sx={styles.label}>Info</Typography>
                    <TextEditorReadOnly text={selectedProject["info"]}/>
                </Box>
            </BaseUi>
        </>
    )
}
export default UiProjectOpen
import {Box, Breadcrumbs, Button, Grid, Typography, useTheme} from "@mui/material";
import BaseUi from "../base-ui";
import TableProjectList from "./component/table-project-list";
import {useSelector} from "react-redux";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {getRouterUrl} from "../../../../router";
import PostAddIcon from "@mui/icons-material/PostAdd";
import {BrProjectList, SkkToolbar} from "../../component";
import dummy_data from "../../data/demo_project.json"
import {dispatch} from "../../../../store";
import {skkProjectAdd, skkProjectClear} from "../../../../store/slice/skk";
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import MuiDialog from "../../../../component/MuiDialog";

const UiProjectList = () => {
    const theme = useTheme()
    const styles = {
        title: {
            mt: 2,
            mb: 1,
            fontSize: '120%',
            fontWeight: 'bold',
            color: theme.palette.secondary.main
        },
        container: {
            p: 1,
            mt: 1,
        },
        card: {
            p: 0,
            boxShadow: 0,
        }
    }

    const dataStore = useSelector((state) => state.skk)
    const [project, setProject] = useState(dataStore["project"])
    const navigate = useNavigate()
    const [openClearDialog, setOpenClearDialog] = useState(false)
    const dialogClearOnCancelClicked = () => {
        setOpenClearDialog(false)
    }
    const dialogClearOnConfirmClicked = () => {
        dispatch(skkProjectClear())
        setOpenClearDialog(false)
        window.location.reload()
    }

    const createDummyProject = () => {
        dummy_data.id = Math.floor(Math.random() * 1000000);
        dummy_data.title = "Dummy Project - " + dummy_data.id
        dispatch(skkProjectAdd(dummy_data))
        window.location.reload()
    }

    return (
        <>
            <BaseUi toolbar={<SkkToolbar user={dataStore["user"]}/>}>
                <Box maxWidth="xl" sx={styles.container}>
                    <Breadcrumbs sx={{mb: 1}}>
                        <BrProjectList hasClick={false}/>
                    </Breadcrumbs>

                    <Grid container direction="row" alignItems="flex-end" justifyContent="space-between">
                        <Grid item>
                            <Button variant="outlined" startIcon={<PostAddIcon/>}
                                    sx={{textTransform: 'none', mb: 1, mr: 2}} size={'small'}
                                    onClick={() => navigate(getRouterUrl("skk-project-create"))}>Create project</Button>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" color={'success'} startIcon={<CreateNewFolderOutlinedIcon/>}
                                    sx={{textTransform: 'none', mb: 1, mr: 2}} size={'small'}
                                    onClick={createDummyProject}>Dummy project</Button>
                            <Button variant="outlined" color={'error'} startIcon={<DeleteForeverOutlinedIcon/>}
                                    sx={{textTransform: 'none', mb: 1, mr: 2}} size={'small'}
                                    onClick={() => setOpenClearDialog(true)}>Clear project</Button>
                        </Grid>
                    </Grid>
                    <TableProjectList data={project}/>

                    <MuiDialog
                        open={openClearDialog}
                        title={<Box textAlign={'center'}><Typography variant={'h4'}>Clear Data</Typography></Box>}
                        contents={
                            <>
                                <Grid container spacing={2}>
                                    <Grid item sx={{maxWidth: '300px'}}>
                                        <Typography>Are you want to clear all project data ?</Typography>
                                    </Grid>
                                </Grid>
                            </>
                        }
                        cancelText={"No"}
                        confirmText={"Yes"}
                        onCancelClicked={dialogClearOnCancelClicked}
                        onConfirmClicked={dialogClearOnConfirmClicked}
                    />
                </Box>
            </BaseUi>
        </>
    )
}
export default UiProjectList
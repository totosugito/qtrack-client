import BaseUi from "../base-ui";
import {
    Alert,
    Box,
    Breadcrumbs,
    Button,
    Grid,
    Snackbar,
    Typography,
    useTheme
} from "@mui/material";
import {useParams} from "react-router-dom";
import {BrLabel, BrProjectList, BrProjectOpen, SkkToolbar} from "../../component";
import {useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";

import "../../../../../node_modules/@syncfusion/ej2-base/styles/material.css";
import '../../../../../node_modules/@syncfusion/ej2-buttons/styles/material.css';
import "../../../../../node_modules/@syncfusion/ej2-layouts/styles/material.css";
import '../../../../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css';
import '../../../../../node_modules/@syncfusion/ej2-inputs/styles/material.css';
import "../../../../../node_modules/@syncfusion/ej2-navigations/styles/material.css";
import "../../../../../node_modules/@syncfusion/ej2-popups/styles/material.css";
import "../../../../../node_modules/@syncfusion/ej2-react-kanban/styles/material.css";
import {extend, registerLicense} from "@syncfusion/ej2-base";
import {ColumnDirective, ColumnsDirective, KanbanComponent} from "@syncfusion/ej2-react-kanban";
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import {dispatch} from "../../../../store";
import {skkProjectUpdate} from "../../../../store/slice/skk";
import MuiDialog from "../../../../component/MuiDialog";

registerLicense("Ngo9BigBOggjHTQxAR8/V1NHaF1cWGhIfEx1RHxQdld5ZFRHallYTnNWUj0eQnxTdEZiWH1ZcHdQRWJZWE12Xg==");
const UiProjectKanban = (props) => {
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
        board: {
            backgroundColor: theme.palette.background.default
        }
    }

    const params = useParams();
    const dataStore = useSelector((state) => state.skk)
    const [project, setProject] = useState(dataStore["project"])
    const [selectedProject, setSelectedProject] = useState({})
    const [kanban, setKanban] = useState(undefined)
    const kanbanRef = useRef(null);
    const [openSaveSnackbar, setOpenSaveSnackbar] = useState(false);

    const [openClearDialog, setOpenClearDialog] = useState(false)
    const dialogClearOnCancelClicked = () => {
        setOpenClearDialog(false)
    }
    const dialogClearOnConfirmClicked = () => {
        // update the store
        let v = JSON.parse(JSON.stringify(selectedProject))
        v.updated = new Date().toLocaleString()
        let tmp_ = [
            {
            Id: "Task 1",
            Status: "Open",
            Priority: "Normal",
            Assignee: "Andrew Fuller",
            Estimate: 0,
            Tags: "",
            Summary: "Sample card",
        }
        ]
        // tmp_.splice(0, 1);

        v.kanban = tmp_
        dispatch(skkProjectUpdate(v))

        // update view
        setKanban(JSON.parse(JSON.stringify(tmp_)))
        setSelectedProject((prevState) => ({...prevState, updated: new Date().toLocaleString(), kanban: tmp_}))
        setOpenClearDialog(false)
    }

    useEffect(() => {
        let selectedId = params["id"] * 1
        for (let i = 0; i < project.length; i++) {
            if (project[i]["id"] === selectedId) {
                let tmp_ = JSON.parse(JSON.stringify(project[i]))
                setSelectedProject(tmp_)
                setKanban(tmp_["kanban"])
                break
            }
        }
        // eslint-disable-next-line
    }, []);

    const onClickAddCard = () => {
        let cardCount = 1
        if (kanbanRef.current.kanbanData.length > 0) {
            const cardIds = kanbanRef.current.kanbanData.map((obj) => parseInt(obj.Id.replace("Task ", ""), 10));
            cardCount = Math.max.apply(Math, cardIds) + 1;
        }
        const cardDetails = {
            Id: "Task " + cardCount,
            Status: "Open",
            Priority: "Normal",
            Assignee: "Andrew Fuller",
            Estimate: 0,
            Tags: "",
            Summary: "",
        };
        kanbanRef.current.openDialog("Add", cardDetails);
    }
    const onClickSaved = () => {
        let v = JSON.parse(JSON.stringify(selectedProject))
        v.updated = new Date().toLocaleString()
        v.kanban = JSON.parse(JSON.stringify(kanbanRef.current["props"]["dataSource"]))
        dispatch(skkProjectUpdate(v))
        setOpenSaveSnackbar(true);
    }

    return (
        <>
            <BaseUi toolbar={<SkkToolbar user={dataStore["user"]}/>}>
                <Box maxWidth="xl" sx={styles.container}>
                    <Breadcrumbs sx={{mb: 1}}>
                        <BrProjectList/>
                        <BrLabel label={"Kanban"}/>
                        <BrProjectOpen label={selectedProject["title"]} hasClick={false}/>
                    </Breadcrumbs>

                    <Grid container direction="row" alignItems="flex-end" justifyContent="space-between">
                        <Grid item>
                            <Button variant="outlined" startIcon={<PlaylistAddOutlinedIcon/>}
                                    sx={{textTransform: 'none', mb: 1, mr: 2}} size={'small'}
                                    onClick={() => onClickAddCard()}>Add Card</Button>
                            <Button variant="outlined" startIcon={<SaveOutlinedIcon/>}
                                    sx={{textTransform: 'none', mb: 1, mr: 2}} size={'small'}
                                    onClick={() => onClickSaved()}>Save</Button>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" color={'error'} startIcon={<DeleteForeverOutlinedIcon/>}
                                    sx={{textTransform: 'none', mb: 1, mr: 2}} size={'small'}
                                    onClick={() => setOpenClearDialog(true)}>Clear Kanban</Button>
                        </Grid>
                    </Grid>
                    {kanban !== undefined &&
                        <KanbanComponent
                            ref={kanbanRef}
                            keyField="Status"
                            dataSource={kanban}
                            cardSettings={{
                                contentField: "Summary",
                                headerField: "Id",
                                tagsField: "Tags",
                            }}
                            dialogSettings={{
                                fields: [
                                    {key: "Id", text: "ID", type: "TextBox"},
                                    {key: "Status", text: "Status", type: "DropDown"},
                                    {key: "Tags", text: "Tags", type: "TextArea"},
                                    {key: "Summary", text: "Summary", type: "TextArea"}]
                            }}
                        >
                            <ColumnsDirective>
                                <ColumnDirective headerText="To Do" keyField="Open"/>
                                <ColumnDirective headerText="In Progress" keyField="InProgress"/>
                                <ColumnDirective headerText="Testing" keyField="Testing"/>
                                <ColumnDirective headerText="Done" keyField="Close"/>
                            </ColumnsDirective>
                        </KanbanComponent>
                    }
                </Box>

                <MuiDialog
                    open={openClearDialog}
                    title={<Box textAlign={'center'}><Typography variant={'h4'}>Clear Data</Typography></Box>}
                    contents={
                        <>
                            <Grid container spacing={2}>
                                <Grid item sx={{maxWidth: '300px'}}>
                                    <Typography>Are you want to clear all kanban data ?</Typography>
                                </Grid>
                            </Grid>
                        </>
                    }
                    cancelText={"No"}
                    confirmText={"Yes"}
                    onCancelClicked={dialogClearOnCancelClicked}
                    onConfirmClicked={dialogClearOnConfirmClicked}
                />

                <Snackbar
                    open={openSaveSnackbar}
                    autoHideDuration={1000}
                    onClose={()=>setOpenSaveSnackbar(false)}
                >
                    <Alert severity="success">Data saved to local storage successfully</Alert>
                </Snackbar>
            </BaseUi>
        </>
    )
}
export default UiProjectKanban
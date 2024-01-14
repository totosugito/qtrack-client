import BaseUi from "../base-ui";
import {Alert, Box, Breadcrumbs, Snackbar, useTheme} from "@mui/material";
import {useParams} from "react-router-dom";
import {BrLabel, BrProjectList, BrProjectOpen, SkkToolbar} from "../../component";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {
    Edit,
    Filter,
    Selection,
    GanttComponent,
    Inject,
    Resize,
    Sort,
    Toolbar,
} from "@syncfusion/ej2-react-gantt";

import '../../../../../node_modules/@syncfusion/ej2-base/styles/material.css';
import '../../../../../node_modules/@syncfusion/ej2-buttons/styles/material.css';
import '../../../../../node_modules/@syncfusion/ej2-calendars/styles/material.css';
import '../../../../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css';
import '../../../../../node_modules/@syncfusion/ej2-inputs/styles/material.css';
import '../../../../../node_modules/@syncfusion/ej2-lists/styles/material.css';
import '../../../../../node_modules/@syncfusion/ej2-layouts/styles/material.css';
import '../../../../../node_modules/@syncfusion/ej2-navigations/styles/material.css';
import '../../../../../node_modules/@syncfusion/ej2-popups/styles/material.css';
import '../../../../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css';
import '../../../../../node_modules/@syncfusion/ej2-grids/styles/material.css';
import '../../../../../node_modules/@syncfusion/ej2-treegrid/styles/material.css';
import '../../../../../node_modules/@syncfusion/ej2-react-gantt/styles/material.css';

import {registerLicense} from '@syncfusion/ej2-base';
import {useRef} from "react";
import {dispatch} from "../../../../store";
import {skkProjectUpdate} from "../../../../store/slice/skk";

registerLicense("Ngo9BigBOggjHTQxAR8/V1NHaF1cWGhIfEx1RHxQdld5ZFRHallYTnNWUj0eQnxTdEZiWH1ZcHdQRWJZWE12Xg==");
const UiProjectGantt = (props) => {
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
        },
        gantt: {
            height: "calc(100vh - 120px)"
        }
    }

    const params = useParams();
    const dataStore = useSelector((state) => state.skk)
    const [project, setProject] = useState(dataStore["project"])
    const [selectedProject, setSelectedProject] = useState({})
    const [gantt, setGantt] = useState(undefined)
    const [openSaveSnackbar, setOpenSaveSnackbar] = useState(false);

    useEffect(() => {
        let selectedId = params["id"] * 1
        for (let i = 0; i < project.length; i++) {
            if (project[i]["id"] === selectedId) {
                let tmp_ = JSON.parse(JSON.stringify(project[i]))
                setSelectedProject(tmp_)
                setGantt(tmp_["gantt"])
                break
            }
        }
        // eslint-disable-next-line
    }, []);

    const ganttRef = useRef(null);
    const toolbarClick = (args) => {
        if (args.item.id === 'save_data') {
            let v = JSON.parse(JSON.stringify(selectedProject))
            v.updated = new Date().toLocaleString()
            v.gantt = JSON.parse(JSON.stringify(ganttRef.current["props"]["dataSource"]))
            // setSelectedProject((prevState) => ({...prevState, updated: new Date().toLocaleString(), gantt: result}))
            dispatch(skkProjectUpdate(v))
            setOpenSaveSnackbar(true);
        }
    };

    return (
        <>
            <BaseUi toolbar={<SkkToolbar user={dataStore["user"]}/>}>
                <Box maxWidth="xl" sx={styles.container}>
                    <Breadcrumbs sx={{mb: 1}}>
                        <BrProjectList/>
                        <BrLabel label={"Gantt"}/>
                        <BrProjectOpen label={selectedProject["title"]} hasClick={false}/>
                    </Breadcrumbs>

                    {gantt !== undefined &&
                        <GanttComponent style={styles.gantt} ref={ganttRef} dataSource={gantt} treeColumnIndex={1}
                                        allowResizing={true} allowSelection={true}
                                        toolbarClick={toolbarClick.bind(this)}
                                        toolbar={[{
                                            text: 'Save',
                                            tooltipText: 'Save data',
                                            id: 'save_data',
                                            prefixIcon: 'e-save'
                                        },
                                            'Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll', 'Indent', 'Outdent']}
                                        taskFields={{
                                            id: 'TaskID',
                                            name: 'TaskName',
                                            startDate: 'StartDate',
                                            endDate: 'EndDate',
                                            duration: 'Duration',
                                            progress: 'Progress',
                                            dependency: 'Predecessor',
                                            child: 'subtasks'
                                        }}
                                        editSettings={{
                                            allowAdding: true,
                                            allowEditing: true,
                                            allowDeleting: true,
                                            allowTaskbarEditing: true,
                                            showDeleteConfirmDialog: true
                                        }}>
                            <Inject services={[Edit, Selection, Toolbar, Filter, Sort, Resize]}/>
                        </GanttComponent>
                    }
                </Box>

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
export default UiProjectGantt
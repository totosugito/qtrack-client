import {useRef, useState} from "react";
import {
    Edit,
    Filter,
    Selection,
    GanttComponent,
    Inject,
    Resize,
    Sort,
    Toolbar, PdfExport,
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
import {registerLicense} from "@syncfusion/ej2-base";
import {Box, Breadcrumbs, Button, useTheme} from "@mui/material";
import {BrLabel, BrProjectList} from "../component";
import dummy_data from "../../skk/data/demo_project.json"
import BrLink from "../component/breadcrumbs/br-link";
import {getRouterUrl} from "../../../router";

registerLicense("Ngo9BigBOggjHTQxAR8/V1NHaF1cWGhIfEx1RHxQdld5ZFRHallYTnNWUj0eQnxTdEZiWH1ZcHdQRWJZWE12Xg==");
const DemoGantt = ({ganttId}) => {
    const theme = useTheme()
    const styles = {
        container: {
            p: 1,
            marginTop: "-10px",
            // width: "100vh"
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
            // height: "calc(100vh - 120px)"
        }
    }
    let ganttChart;
    const [gantt, setGantt] = useState([])
    const ganttRef = useRef(null);

    const createDummyData = () => {
        setGantt(dummy_data["gantt"])
    }
    const toolbarClick = (args) => {
        if (args.item.id === 'pdf_export') {
            ganttChart.pdfExport();
        }
    };
    return (
        <>
            <Box maxWidth="xl" sx={styles.container}>
                <Breadcrumbs sx={{mb: 1}}>
                    <BrProjectList/>
                    <BrLink label={"Board"} href={getRouterUrl("demo-boards", "/", {id: ganttId})}/>
                    <BrLabel label={"Gantt"}/>
                </Breadcrumbs>

                <Box sx={{mb: 1}}>
                    <Button variant={'outlined'} onClick={()=> createDummyData()}>Dummy Data</Button>
                </Box>
                {gantt !== undefined &&
                    <GanttComponent style={styles.gantt} ref={ganttRef => ganttChart = ganttRef} dataSource={gantt} treeColumnIndex={1}
                                    allowResizing={true} allowSelection={true}
                                    toolbarClick={toolbarClick.bind(this)}
                                    toolbar={[
                                        // {
                                        //     text: 'Save',
                                        //     tooltipText: 'Save data',
                                        //     id: 'save_data',
                                        //     prefixIcon: 'e-save'
                                        // },
                                        // {
                                        //     text: 'PDF Export',
                                        //     tooltipText: 'PDF Export',
                                        //     id: 'pdf_export',
                                        //     prefixIcon: 'e-save'
                                        // },
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
                        <Inject services={[Edit, Selection, Toolbar, Filter, Sort, Resize, PdfExport]}/>
                    </GanttComponent>
                }
            </Box>
        </>
    )
}
export default DemoGantt

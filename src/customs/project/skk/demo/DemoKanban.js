import {ColumnDirective, ColumnsDirective, KanbanComponent} from "@syncfusion/ej2-react-kanban";
import {useRef, useState} from "react";
import "../../../../../node_modules/@syncfusion/ej2-base/styles/material.css";
import '../../../../../node_modules/@syncfusion/ej2-buttons/styles/material.css';
import "../../../../../node_modules/@syncfusion/ej2-layouts/styles/material.css";
import '../../../../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css';
import '../../../../../node_modules/@syncfusion/ej2-inputs/styles/material.css';
import "../../../../../node_modules/@syncfusion/ej2-navigations/styles/material.css";
import "../../../../../node_modules/@syncfusion/ej2-popups/styles/material.css";
import "../../../../../node_modules/@syncfusion/ej2-react-kanban/styles/material.css";
import {registerLicense} from "@syncfusion/ej2-base";

registerLicense("Ngo9BigBOggjHTQxAR8/V1NHaF1cWGhIfEx1RHxQdld5ZFRHallYTnNWUj0eQnxTdEZiWH1ZcHdQRWJZWE12Xg==");
const DemoKanban = () => {
    const [kanban, setKanban] = useState(undefined)
    const kanbanRef = useRef(null);

    return(
        <>
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
        </>
    )
}
export default DemoKanban

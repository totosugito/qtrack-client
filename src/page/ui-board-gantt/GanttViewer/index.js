import React, {useRef, useState} from "react";
import {
  Edit,
  Filter,
  Selection,
  GanttComponent,
  Inject,
  Resize,
  Sort,
  Toolbar, PdfExport, ExcelExport,
} from "@syncfusion/ej2-react-gantt";

import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-buttons/styles/material.css';
import '@syncfusion/ej2-calendars/styles/material.css';
import '@syncfusion/ej2-dropdowns/styles/material.css';
import '@syncfusion/ej2-inputs/styles/material.css';
import '@syncfusion/ej2-lists/styles/material.css';
import '@syncfusion/ej2-layouts/styles/material.css';
import '@syncfusion/ej2-navigations/styles/material.css';
import '@syncfusion/ej2-popups/styles/material.css';
import '@syncfusion/ej2-splitbuttons/styles/material.css';
import '@syncfusion/ej2-grids/styles/material.css';
import '@syncfusion/ej2-treegrid/styles/material.css';
import '@syncfusion/ej2-react-gantt/styles/material.css';
import {registerLicense} from "@syncfusion/ej2-base";
import {read, utils} from "xlsx";
import {LTT} from "../../../lib/external";
import styles from "./index.module.scss";
import stylesView from "../../../view/index.module.scss";
import classNames from "classnames";
import {Icon} from "semantic-ui-react";
import {useTranslation} from "react-i18next";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import selectors from "../../../redux/selectors";

registerLicense("Ngo9BigBOggjHTQxAR8/V1NHaF1cWGhIfEx1RHxQdld5ZFRHallYTnNWUj0eQnxTdEZiWH1ZcHdQRWJZWE12Xg==");
const GanttViewer = React.memo(({gantt}) => {
  const [t] = useTranslation();
  let ganttChart;
  // const [gantt, setGantt] = useState([])
  const ganttRef = useRef(null);

  const toolbarClick = (args) => {
    if (args.item.id === 'pdf_export') {
      let exportProperties = {
        includeHiddenColumn: true,
        pageOrientation: 'Landscape',
        pageSize: 'A1',
        fitToWidthSettings: {
          isFitToWidth: false,
        }
      };
      ganttChart.pdfExport(exportProperties);
    } else if (args.item.id === 'excel_export') {
      ganttChart.excelExport();
    }
  }

  // const handleImport = ($event) => {
  //   const files = $event.target.files;
  //   if (files.length) {
  //     const file = files[0];
  //     const reader = new FileReader();
  //     reader.onload = (event) => {
  //       const wb = read(event.target.result);
  //       const sheets = wb.SheetNames;
  //
  //       if (sheets.length) {
  //         const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
  //         let ltt = new LTT(rows, {
  //           key_id: 'TaskID',
  //           key_parent: 'ParentID',
  //         });
  //         let tree = ltt.GetTree();
  //         setGantt(tree);
  //       }
  //     }
  //     reader.readAsArrayBuffer(file);
  //   }
  // }

  return (
    <div className={classNames(styles.container)}>
      <div className={stylesView.toolbarBoardContainer}>
        <div className={stylesView.toolbarItemContainer}>
          {/*<div className={stylesView.toolbarItemSmall}>*/}
          {/*  <div className={classNames(stylesView.toolbarButton)}>*/}
          {/*    <input id="files" type="file" name="file" className="custom-file-input"*/}
          {/*           required onChange={handleImport}*/}
          {/*           accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>*/}
          {/*  </div>*/}
          {/*</div>*/}

          <div className={stylesView.toolbarItemSmall}>
            <div className={classNames(stylesView.toolbarButton)}
                 onClick={() => toolbarClick({item: {id: 'pdf_export'}})}>
              <Icon name='file pdf outline'/>
              <span className={classNames(stylesView.toolbarButtonTitle)}>
                      {t('common.pdfExport')}
                    </span>
            </div>
          </div>

          <div className={stylesView.toolbarItemSmall} onClick={() => toolbarClick({item: {id: 'excel_export'}})}>
            <div className={classNames(stylesView.toolbarButton)}>
              <Icon name='file excel outline'/>
              <span className={classNames(stylesView.toolbarButtonTitle)}>
                      {t('common.excelExport')}
                    </span>
            </div>
          </div>
        </div>
      </div>

      <div className={classNames(styles.gantt)}>
        {gantt !== undefined &&
          <GanttComponent ref={ganttRef => ganttChart = ganttRef} dataSource={gantt}
                          treeColumnIndex={1}
                          allowResizing={true} allowSelection={true}
                          toolbarClick={toolbarClick.bind(this)}
                          allowPdfExport={true}
                          allowExcelExport={true}
                          toolbar={['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll', 'Indent', 'Outdent']}
                          taskFields={{
                            id: 'TaskID',
                            name: 'TaskName',
                            startDate: 'StartDate',
                            endDate: 'EndDate',
                            duration: 'Duration',
                            progress: 'Progress',
                            dependency: 'Predecessor',
                            child: 'child'
                          }}
                          editSettings={{
                            allowAdding: true,
                            allowEditing: true,
                            allowDeleting: true,
                            allowTaskbarEditing: true,
                            showDeleteConfirmDialog: true
                          }}>
            <Inject services={[Edit, Selection, Toolbar, Filter, Sort, Resize, PdfExport, ExcelExport]}/>
          </GanttComponent>
        }
      </div>
    </div>
  )
})

GanttViewer.propTypes = {
  gantt: PropTypes.array.isRequired
};
// export default GanttViewer

const mapStateToProps = (state) => {
  const gantt = []
  const listIds = selectors.selectListIdsForCurrentBoard(state);
  console.log(listIds)
  return({
    gantt
  })
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(GanttViewer);


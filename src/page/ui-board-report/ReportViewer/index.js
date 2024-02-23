import React from "react";
import {useTranslation} from "react-i18next";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import ReactPDF, { PDFViewer , Page, Text, View, Document } from '@react-pdf/renderer'
import {styles, TextWithValue} from './styles'

const ReportViewer = ({}) => {
  const [t] = useTranslation();

  const ProjectInfo = () => {
    return(
      <View>
        <TextWithValue label={"Name"} value={"☑Contohae"}/>
      </View>
    )
  }
  return(
    <>
      <PDFViewer style={{width: '100%', height: 'calc(100vh - 54px)'}}>
        <Document>
          <Page size='A4' style={styles.page}>
            <ProjectInfo/>
          </Page>
        </Document>
      </PDFViewer>
    </>)

}

const mapStateToProps = (state) => {
  return(
    {

    }
  )
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ReportViewer);

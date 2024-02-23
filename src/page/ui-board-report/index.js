import selectors from "../../redux/selectors";
import {connect} from "react-redux";
import {useTheme} from "@mui/material";
import {useTranslation} from "react-i18next";
import BaseProject from "../base-project";
import classNames from "classnames";
import styles from "../ui-project-open/index.module.scss";
import {Icon, Loader} from "semantic-ui-react";
import React from "react";
import ReportViewer from "./ReportViewer";

function UiBoardReport({board}) {
  const theme = useTheme();
  const [t] = useTranslation();

  if (board === null) {
    return (
      <>
        <BaseProject>
          <div className={classNames(styles.wrapper, styles.wrapperFlex)}>
            <div className={styles.message} style={{color: theme.palette.text.secondary}}>
              <Icon name='unlink' size='huge'/>
              <h1>
                {t('common.ganttNotFound_title', {
                  context: 'title',
                })}
              </h1>
            </div>
          </div>
        </BaseProject>
      </>
    )
  }

  if (board.isFetching) {
    return (
      <BaseProject>
        <div className={classNames(styles.wrapper, styles.wrapperLoader, styles.wrapperProject)}>
          <Loader active size="big"/>
        </div>
      </BaseProject>
    );
  }

  return (
    <>
      <BaseProject>
        <ReportViewer/>
      </BaseProject>
    </>
  )
}

const mapStateToProps = (state) => {
  const project = selectors.selectCurrentProject(state);
  const board = selectors.selectCurrentBoard(state);
  return {
    project: project,
    board: board,
  }
}

export default connect(mapStateToProps)(UiBoardReport);

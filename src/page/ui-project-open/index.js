import selectors from "../../redux/selectors";
import {connect} from "react-redux";
import classNames from "classnames";
import styles from "./index.module.scss";
import React from "react";
import {Trans, useTranslation} from "react-i18next";
import Project from "../../view/Project";
import {useTheme} from "@mui/material";
import BaseProject from "../base-project";
import {Icon} from "semantic-ui-react";

function UiProjectOpen({currentProject, projectId, board}) {
    const theme = useTheme();
    const [t] = useTranslation();
    if (projectId === null) {
        return (
            <>
                <BaseProject>
                    <div className={classNames(styles.wrapper, styles.wrapperFlex)}>
                        <div className={styles.message} style={{color: theme.palette.text.secondary}}>
                            <Icon name='unlink' size='huge'/>
                            <h1>
                                {t('common.projectNotFound', {
                                    context: 'title',
                                })}
                            </h1>
                        </div>
                    </div>
                </BaseProject>
            </>
        );
    }

    if (board === undefined) {
        return (
            <>
                <BaseProject>
                    <div style={{height: '100%'}}>
                        <div>
                            {projectId && <Project/>}
                        </div>

                        <div className={classNames(styles.wrapper, styles.wrapperFlex)}>
                            <div className={styles.message}
                                 style={{color: currentProject.background ? theme.palette.background.default : theme.palette.text.secondary}}>
                                <Icon name='hand point up outline' size='huge'/>
                                <h1 className={styles.messageTitle}>
                                    {t('common.openBoard', {
                                        context: 'title',
                                    })}
                                </h1>
                                <div className={styles.messageContent}>
                                    <Trans i18nKey="common.createNewOneOrSelectExistingOne"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </BaseProject>
            </>
        );
    }

    return (
        <>
        </>
    )
}

const mapStateToProps = (state) => {
    const currentProject = selectors.selectCurrentProject(state);
    const {projectId} = selectors.selectPath(state);
    const currentBoard = selectors.selectCurrentBoard(state);

    return {
        currentProject,
        projectId,
        board: currentBoard,
    };
};

export default connect(mapStateToProps)(UiProjectOpen);

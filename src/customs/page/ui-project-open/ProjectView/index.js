import selectors from "../../../../redux/selectors";
import {connect} from "react-redux";
import classNames from "classnames";
import styles from "./index.module.scss";
import React from "react";
import {Trans, useTranslation} from "react-i18next";
import PanToolAltIcon from '@mui/icons-material/PanToolAlt';
import Project from "../../../view/Project";

function ProjectView({projectId, board}) {
    const [t] = useTranslation();
    if (projectId === null) {
        return (
            <div className={classNames(styles.wrapper, styles.wrapperFlex)}>
                <div className={styles.message}>
                    <h1>
                        {t('common.projectNotFound', {
                            context: 'title',
                        })}
                    </h1>
                </div>
            </div>
        );
    }

    if (board === undefined) {
        return (
            <>
                <div>
                    {projectId && <Project/>}
                </div>

                <div className={classNames(styles.wrapper, styles.wrapperFlex)}>
                    <div className={styles.message}>
                        <PanToolAltIcon style={{fontSize: 50}}/>
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
            </>
        );
    }

    return (
        <>
        </>
    )
}

const mapStateToProps = (state) => {
    const {projectId} = selectors.selectPath(state);
    const currentBoard = selectors.selectCurrentBoard(state);

    return {
        projectId,
        board: currentBoard,
    };
};

export default connect(mapStateToProps)(ProjectView);

import selectors from "../../redux/selectors";
import {useTheme} from "@mui/material";
import BaseProject from "../base-project";
import {useTranslation} from "react-i18next";
import {connect} from "react-redux";
import styles from "../ui-project-open/index.module.scss"
import classNames from "classnames";
import {Icon, Loader} from "semantic-ui-react";
import Project from "../../view/Project";
import React from "react";
import BoardActions from "../../view/BoardActions";
import Board from "./Board";

function UiProjectBoard({projectId, board}) {
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
                                {t('common.boardNotFound', {
                                    context: 'title',
                                })}
                            </h1>
                        </div>
                    </div>
                </BaseProject>
            </>
        );
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
                <div style={{height: '100%'}}>
                    <div>
                        {projectId && <Project/>}
                        {board && !board.isFetching && <BoardActions/>}
                    </div>
                    <div className={classNames(styles.wrapper, styles.wrapperFlex, styles.wrapperBoard)}>
                        <Board/>
                    </div>
                </div>
            </BaseProject>
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

export default connect(mapStateToProps)(UiProjectBoard);

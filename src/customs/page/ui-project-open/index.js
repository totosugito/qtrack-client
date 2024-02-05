import React, {useRef} from "react";
import {useEffect} from "react";
import {connect} from "react-redux";
import BaseAuth from "../base-auth";
import {useTranslation} from "react-i18next";
import selectors from "../../../redux/selectors";
import ProjectView from "./ProjectView";

const UiProjectOpen = React.memo(
    ({
         currentModal,
         currentProject,
         currentBoard
     }) => {
        const defaultTitle = useRef(document.title)
        useEffect(() => {
            let title;
            if (currentProject) {
                title = currentProject.name;

                if (currentBoard) {
                    title += ` | ${currentBoard.name}`;
                }
            } else {
                title = defaultTitle.current;
            }

            document.title = title;
        }, [currentProject, currentBoard]);

        const [t] = useTranslation();
        return (
            <>
                <BaseAuth leftToolbar={<div>OK</div>}>
                    <ProjectView/>
                </BaseAuth>
            </>
        )
    })
UiProjectOpen.propTypes = {
}

UiProjectOpen.defaultProps = {};

const mapStateToProps = (state) => {
    const currentModal = selectors.selectCurrentModal(state);
    const currentProject = selectors.selectCurrentProject(state);
    const currentBoard = selectors.selectCurrentBoard(state);
    return {
        currentModal,
        currentProject,
        currentBoard,
    }
}
export default connect(mapStateToProps)(UiProjectOpen)

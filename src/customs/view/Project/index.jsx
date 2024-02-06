import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';
import selectors from "../../../redux/selectors";
import ModalTypes from "../../../constants/ModalTypes";
import {connect} from "react-redux";
import Boards from "../Boards";
import ProjectSettingsModal from "../ProjectSettingsModal";

const Project = React.memo(({ isSettingsModalOpened }) => {
  return (
    <>
      <div className={styles.wrapper}>
        <Boards/>
      </div>
      {isSettingsModalOpened && <ProjectSettingsModal/>}
    </>
  );
});

Project.propTypes = {
  isSettingsModalOpened: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
    const currentModal = selectors.selectCurrentModal(state);

    return {
        isSettingsModalOpened: currentModal === ModalTypes.PROJECT_SETTINGS,
    };
};

export default connect(mapStateToProps)(Project);

import { connect } from 'react-redux';

import selectors from '../../../../../selectors';
import UiProjectList from "../ui-project-list";

const mapStateToProps = (state) => {
  const isInitializing = selectors.selectIsInitializing(state);
  const isSocketDisconnected = selectors.selectIsSocketDisconnected(state);
  const currentModal = selectors.selectCurrentModal(state);
  // const currentProject = selectors.selectCurrentProject(state);
  // const currentBoard = selectors.selectCurrentBoard(state);

  return {
    isInitializing,
    isSocketDisconnected,
    currentModal,
    // currentProject,
    // currentBoard,
  };
};

export default connect(mapStateToProps)(UiProjectList);

import { connect } from 'react-redux';

import selectors from '../selectors';
import Fixed from '../components/Fixed';

const mapStateToProps = (state) => {
  const { projectId, kanbanId } = selectors.selectPath(state);
  const currentBoard = selectors.selectCurrentBoard(state);

  return {
    projectId,
    kanbanId,
    board: currentBoard,
  };
};

export default connect(mapStateToProps)(Fixed);

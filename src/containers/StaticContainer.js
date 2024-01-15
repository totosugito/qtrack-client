import { connect } from 'react-redux';

import selectors from '../selectors';
import Static from '../components/Static';

const mapStateToProps = (state) => {
  const { cardId, kanbanId, projectId } = selectors.selectPath(state);
  const currentBoard = selectors.selectCurrentBoard(state);

  return {
    projectId,
    cardId,
    kanbanId,
    board: currentBoard,
  };
};

export default connect(mapStateToProps)(Static);

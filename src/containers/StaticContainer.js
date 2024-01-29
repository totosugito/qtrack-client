import { connect } from 'react-redux';

import selectors from '../redux/selectors';
import Static from '../components/Static';

const mapStateToProps = (state) => {
  const { cardId, ganttId, projectId } = selectors.selectPath(state);
  const currentBoard = selectors.selectCurrentBoard(state);

  return {
    projectId,
    cardId,
    ganttId,
    board: currentBoard,
  };
};

export default connect(mapStateToProps)(Static);

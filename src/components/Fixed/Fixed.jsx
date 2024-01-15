import React from 'react';
import PropTypes from 'prop-types';

import HeaderContainer from '../../containers/HeaderContainer';
import ProjectContainer from '../../containers/ProjectContainer';
import BoardActionsContainer from '../../containers/BoardActionsContainer';

import styles from './Fixed.module.scss';

function Fixed({ projectId, kanbanId, board }) {
  return (
    <div className={styles.wrapper1}>
      {/*<HeaderContainer />*/}
      {kanbanId && <></>}
      {!kanbanId &&
        <>
        {projectId && <ProjectContainer />}
        {board && !board.isFetching && <BoardActionsContainer />}
        </>
      }
    </div>
  );
}

Fixed.propTypes = {
  projectId: PropTypes.string,
  board: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

Fixed.defaultProps = {
  projectId: undefined,
  board: undefined,
};

export default Fixed;

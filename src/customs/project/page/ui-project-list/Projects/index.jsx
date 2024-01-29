import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';

import Paths from '../../../../../constants/Paths';
import { ProjectBackgroundTypes } from '../../../../../constants/Enums';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import styles from './styles.module.scss';
import globalStyles from '../../../../../styles.module.scss';
import selectors from "../../../../../redux/selectors";
import {bindActionCreators} from "redux";
import entryActions from "../../../../../redux/entry-actions";
import {connect} from "react-redux";

const Projects = React.memo(({ items, canAdd, onAdd }) => {
  const [t] = useTranslation();

  return (
    <div>
      <Grid className={styles.gridFix}>
        {items.map((item) => (
          <Grid.Column key={item.id} mobile={8} computer={4}>
            <Link
              to={
                item.firstBoardId
                  ? Paths.BOARDS.replace(':id', item.firstBoardId)
                  : Paths.PROJECTS.replace(':id', item.id)
              }
            >
              <div
                className={classNames(
                  styles.card,
                  styles.open,
                  item.background &&
                    item.background.type === ProjectBackgroundTypes.GRADIENT &&
                    globalStyles[`background${upperFirst(camelCase(item.background.name))}`],
                )}
                style={{
                  background:
                    item.background &&
                    item.background.type === 'image' &&
                    `url("${item.backgroundImage.coverUrl}") center / cover`,
                }}
              >
                {item.notificationsTotal > 0 && (
                  <span className={styles.notification}>{item.notificationsTotal}</span>
                )}
                <div className={styles.cardOverlay} />
                <div className={styles.openTitle}>{item.name}</div>
              </div>
            </Link>
          </Grid.Column>
        ))}
        {canAdd && (
          <Grid.Column mobile={8} computer={4}>
            <button type="button" className={classNames(styles.card, styles.add)} onClick={onAdd}>
              <div className={styles.addTitleWrapper}>
                <div className={styles.addTitle}>
                    <div><AddCircleOutlineIcon fontSize={'large'} display={'inline'}/></div>
                  {t('action.createProject')}
                </div>
              </div>
            </button>
          </Grid.Column>
        )}
      </Grid>
    </div>
  );
});

Projects.propTypes = {
  items: PropTypes.array.isRequired,
  canAdd: PropTypes.bool.isRequired,
  onAdd: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    const { isAdmin } = selectors.selectCurrentUser(state);
    const projects = selectors.selectProjectsForCurrentUser(state);

    return {
        items: projects,
        canAdd: isAdmin,
    };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            onAdd: entryActions.openProjectAddModal,
        },
        dispatch,
    );

export default connect(mapStateToProps, mapDispatchToProps)(Projects);

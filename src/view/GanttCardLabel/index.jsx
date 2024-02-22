import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './index.module.scss';
import {useTranslation} from "react-i18next";
import upperFirst from "lodash/upperFirst";

const SIZES = {
  TINY: 'tiny',
  SMALL: 'small',
  MEDIUM: 'medium',
};

const GanttCardLabel = React.memo(({eT, size, onClick}) => {
  const [t] = useTranslation();

  const getGanttVar = () => {
    return (eT.gantt ? eT.gantt : {isEnable: false, progress: 0})
  }

  const ContentNode = ({progress}) => {
    return (
      <>
        <span
          title={'Gantt'}
          className={classNames(
            styles.wrapper,
            styles[`wrapper${upperFirst(size)}`],
            onClick && styles.wrapperHoverable,
          )}
        >
          {t('common.gantt')} : {progress}%
        </span>
      </>
    )
  }

  let gantt = getGanttVar()
  let isEnable = gantt.isEnable
  return isEnable ? (onClick ? (
    <button type="button" className={styles.button} onClick={onClick}>
      <ContentNode progress={gantt.progress}/>
    </button>
  ) : (
    <ContentNode progress={gantt.progress}/>
  )) : <></>
});

GanttCardLabel.propTypes = {
  eT: PropTypes.object,
  size: PropTypes.oneOf(Object.values(SIZES)),
  onClick: PropTypes.func,
};

GanttCardLabel.defaultProps = {
  eT: undefined,
  size: SIZES.MEDIUM,
  onClick: undefined,
};

export default GanttCardLabel;

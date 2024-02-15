import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {Button, Modal, Tab} from 'semantic-ui-react';

import ManagersPane from './ManagersPane';
import BackgroundPane from './BackgroundPane';
import GeneralPane from './GeneralPane';
import selectors from "../../redux/selectors";
import {bindActionCreators} from "redux";
import entryActions from "../../redux/entry-actions";
import {connect} from "react-redux";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import styles from '../index.module.scss';
import classNames from "classnames";

const ProjectSettingsModal = React.memo(
  ({
    name,
    background,
    backgroundImage,
    isBackgroundImageUpdating,
    managers,
    allUsers,
    onUpdate,
    onBackgroundImageUpdate,
    onDelete,
    onManagerCreate,
    onManagerDelete,
    onClose,
  }) => {
    const [t] = useTranslation();

    const handleBackgroundUpdate = useCallback(
      (newBackground) => {
        onUpdate({
          background: newBackground,
        });
      },
      [onUpdate],
    );

    const handleBackgroundImageDelete = useCallback(() => {
      onUpdate({
        backgroundImage: null,
      });
    }, [onUpdate]);

    const panes = [
      {
        menuItem: t('common.general', {
          context: 'title',
        }),
        render: () => <GeneralPane name={name} onUpdate={onUpdate} onDelete={onDelete} />,
      },
      {
        menuItem: t('common.managers', {
          context: 'title',
        }),
        render: () => (
          <ManagersPane
            items={managers}
            allUsers={allUsers}
            onCreate={onManagerCreate}
            onDelete={onManagerDelete}
          />
        ),
      },
      {
        menuItem: t('common.background', {
          context: 'title',
        }),
        render: () => (
          <BackgroundPane
            item={background}
            imageCoverUrl={backgroundImage && backgroundImage.coverUrl}
            isImageUpdating={isBackgroundImageUpdating}
            onUpdate={handleBackgroundUpdate}
            onImageUpdate={onBackgroundImageUpdate}
            onImageDelete={handleBackgroundImageDelete}
          />
        ),
      },
    ];

    return (
      <Modal open closeIcon={
        <div className={classNames(styles.dialogCloseButton)}>
            <CloseOutlinedIcon/>
        </div>
      } size="small" centered={true} onClose={onClose} className={classNames(styles.dialog)}>
        <Modal.Content>
          <Tab
            menu={{
              secondary: true,
              pointing: true,
            }}
            panes={panes}
          />
        </Modal.Content>
      </Modal>
    );
  },
);

ProjectSettingsModal.propTypes = {
  name: PropTypes.string.isRequired,
  /* eslint-disable react/forbid-prop-types */
  background: PropTypes.object,
  backgroundImage: PropTypes.object,
  /* eslint-enable react/forbid-prop-types */
  isBackgroundImageUpdating: PropTypes.bool.isRequired,
  /* eslint-disable react/forbid-prop-types */
  managers: PropTypes.array.isRequired,
  allUsers: PropTypes.array.isRequired,
  /* eslint-enable react/forbid-prop-types */
  onUpdate: PropTypes.func.isRequired,
  onBackgroundImageUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onManagerCreate: PropTypes.func.isRequired,
  onManagerDelete: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

ProjectSettingsModal.defaultProps = {
  background: undefined,
  backgroundImage: undefined,
};

const mapStateToProps = (state) => {
    const users = selectors.selectUsers(state);

    const { name, background, backgroundImage, isBackgroundImageUpdating } =
        selectors.selectCurrentProject(state);

    const managers = selectors.selectManagersForCurrentProject(state);

    return {
        name,
        background,
        backgroundImage,
        isBackgroundImageUpdating,
        managers,
        allUsers: users,
    };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            onUpdate: entryActions.updateCurrentProject,
            onBackgroundImageUpdate: entryActions.updateCurrentProjectBackgroundImage,
            onDelete: entryActions.deleteCurrentProject,
            onManagerCreate: entryActions.createManagerInCurrentProject,
            onManagerDelete: entryActions.deleteProjectManager,
            onClose: entryActions.closeModal,
        },
        dispatch,
    );

export default connect(mapStateToProps, mapDispatchToProps)(ProjectSettingsModal);

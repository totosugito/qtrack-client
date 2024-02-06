import pick from 'lodash/pick';
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Button } from 'semantic-ui-react';

import { useSteps } from '../../../lib/hooks-ui';
import User from '../User';
import DeleteStep from '../DeleteStep';

import styles from './ActionsStep.module.scss';

const StepTypes = {
  EDIT_PERMISSIONS: 'EDIT_PERMISSIONS',
  DELETE: 'DELETE',
};

const ActionsStep = React.memo(
  ({
    membership,
    permissionsSelectStep,
    leaveButtonContent,
    leaveConfirmationTitle,
    leaveConfirmationContent,
    leaveConfirmationButtonContent,
    deleteButtonContent,
    deleteConfirmationTitle,
    deleteConfirmationContent,
    deleteConfirmationButtonContent,
    canEdit,
    canLeave,
    onUpdate,
    onDelete,
    onClose,
  }) => {
    const [t] = useTranslation();
    const [step, openStep, handleBack] = useSteps();

    const handleEditPermissionsClick = useCallback(() => {
      openStep(StepTypes.EDIT_PERMISSIONS);
    }, [openStep]);

    const handleDeleteClick = useCallback(() => {
      openStep(StepTypes.DELETE);
    }, [openStep]);

    const handleRoleSelect = useCallback(
      (data) => {
        if (onUpdate) {
          onUpdate(data);
        }
      },
      [onUpdate],
    );

    if (step) {
      switch (step.type) {
        case StepTypes.EDIT_PERMISSIONS: {
          const PermissionsSelectStep = permissionsSelectStep;

          return (
            <PermissionsSelectStep
              defaultData={pick(membership, ['role', 'canComment'])}
              title="common.editPermissions"
              buttonContent="action.save"
              onSelect={handleRoleSelect}
              onBack={handleBack}
              onClose={onClose}
            />
          );
        }
        case StepTypes.DELETE:
          return (
            <DeleteStep
              title={membership.user.isCurrent ? leaveConfirmationTitle : deleteConfirmationTitle}
              content={
                membership.user.isCurrent ? leaveConfirmationContent : deleteConfirmationContent
              }
              buttonContent={
                membership.user.isCurrent
                  ? leaveConfirmationButtonContent
                  : deleteConfirmationButtonContent
              }
              onConfirm={onDelete}
              onBack={handleBack}
            />
          );
        default:
      }
    }

    return (
      <>
        <span className={styles.user}>
          <User name={membership.user.name} avatarUrl={membership.user.avatarUrl} size="large" />
        </span>
        <span className={styles.content}>
          <div className={styles.name}>{membership.user.name}</div>
          <div className={styles.email}>{membership.user.email}</div>
        </span>
        {permissionsSelectStep && canEdit && (
          <Button
            fluid
            content={t('action.editPermissions')}
            className={styles.button}
            onClick={handleEditPermissionsClick}
          />
        )}
        {membership.user.isCurrent
          ? canLeave && (
              <Button
                fluid
                content={t(leaveButtonContent)}
                className={styles.button}
                onClick={handleDeleteClick}
              />
            )
          : canEdit && (
              <Button
                fluid
                content={t(deleteButtonContent)}
                className={styles.button}
                onClick={handleDeleteClick}
              />
            )}
      </>
    );
  },
);

ActionsStep.propTypes = {
  membership: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  permissionsSelectStep: PropTypes.elementType,
  leaveButtonContent: PropTypes.string,
  leaveConfirmationTitle: PropTypes.string,
  leaveConfirmationContent: PropTypes.string,
  leaveConfirmationButtonContent: PropTypes.string,
  deleteButtonContent: PropTypes.string,
  deleteConfirmationTitle: PropTypes.string,
  deleteConfirmationContent: PropTypes.string,
  deleteConfirmationButtonContent: PropTypes.string,
  canEdit: PropTypes.bool.isRequired,
  canLeave: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

ActionsStep.defaultProps = {
  permissionsSelectStep: undefined,
  leaveButtonContent: 'action.leaveBoard',
  leaveConfirmationTitle: 'common.leaveBoard',
  leaveConfirmationContent: 'common.areYouSureYouWantToLeaveBoard',
  leaveConfirmationButtonContent: 'action.leaveBoard',
  deleteButtonContent: 'action.removeFromBoard',
  deleteConfirmationTitle: 'common.removeMember',
  deleteConfirmationContent: 'common.areYouSureYouWantToRemoveThisMemberFromBoard',
  deleteConfirmationButtonContent: 'action.removeMember',
  onUpdate: undefined,
};

export default ActionsStep;

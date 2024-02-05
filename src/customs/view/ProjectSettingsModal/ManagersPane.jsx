import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from 'semantic-ui-react';
import styles from './ManagersPane.module.scss';
import Memberships from "../../../components/Memberships";

const ManagersPane = React.memo(({ items, allUsers, onCreate, onDelete }) => {
  return (
    <Tab.Pane attached={false} className={styles.wrapper}>
      <Memberships
        items={items}
        allUsers={allUsers}
        addTitle="common.addManager"
        leaveButtonContent="action.leaveProject"
        leaveConfirmationTitle="common.leaveProject"
        leaveConfirmationContent="common.areYouSureYouWantToLeaveProject"
        leaveConfirmationButtonContent="action.leaveProject"
        deleteButtonContent="action.removeFromProject"
        deleteConfirmationTitle="common.removeManager"
        deleteConfirmationContent="common.areYouSureYouWantToRemoveThisManagerFromProject"
        deleteConfirmationButtonContent="action.removeManager"
        canLeaveIfLast={false}
        onCreate={onCreate}
        onDelete={onDelete}
      />
    </Tab.Pane>
  );
});

ManagersPane.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  items: PropTypes.array.isRequired,
  allUsers: PropTypes.array.isRequired,
  /* eslint-enable react/forbid-prop-types */
  onCreate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ManagersPane;

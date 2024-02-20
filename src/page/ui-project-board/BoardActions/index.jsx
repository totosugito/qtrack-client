import React from 'react';
import PropTypes from 'prop-types';

import Filters from './Filters';
import Memberships from '../../../view/Memberships';
import stylesView from '../../../view/index.module.scss';
import selectors from "../../../redux/selectors";
import {BoardMembershipRoles} from "../../../constants/Enums";
import {bindActionCreators} from "redux";
import entryActions from "../../../redux/entry-actions";
import {connect} from "react-redux";
import BoardMembershipPermissionsSelectStep from "../BoardMembershipPermissionsSelectStep";
import {Icon} from "semantic-ui-react";
import classNames from "classnames";
import Paths from "../../../constants/Paths";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

const BoardActions = React.memo(
  ({
     boardId,
     memberships,
     labels,
     filterUsers,
     filterLabels,
     allUsers,
     canEdit,
     canEditMemberships,
     onMembershipCreate,
     onMembershipUpdate,
     onMembershipDelete,
     onUserToFilterAdd,
     onUserFromFilterRemove,
     onLabelToFilterAdd,
     onLabelFromFilterRemove,
     onLabelCreate,
     onLabelUpdate,
     onLabelMove,
     onLabelDelete,
   }) => {
    const [t] = useTranslation();

    return (
      <div className={stylesView.toolbarBoardContainer}>
        <div className={stylesView.toolbarItemContainer}>
          <div className={stylesView.toolbarItem}>
            <Memberships
              items={memberships}
              allUsers={allUsers}
              permissionsSelectStep={BoardMembershipPermissionsSelectStep}
              canEdit={canEditMemberships}
              onCreate={onMembershipCreate}
              onUpdate={onMembershipUpdate}
              onDelete={onMembershipDelete}
            />
          </div>
          <div className={stylesView.toolbarItem}>
            <Filters
              users={filterUsers}
              labels={filterLabels}
              allBoardMemberships={memberships}
              allLabels={labels}
              canEdit={canEdit}
              onUserAdd={onUserToFilterAdd}
              onUserRemove={onUserFromFilterRemove}
              onLabelAdd={onLabelToFilterAdd}
              onLabelRemove={onLabelFromFilterRemove}
              onLabelCreate={onLabelCreate}
              onLabelUpdate={onLabelUpdate}
              onLabelMove={onLabelMove}
              onLabelDelete={onLabelDelete}
            />
          </div>

          <Link to={Paths.GANTT.replace(':id', boardId)}>
            <div className={classNames(stylesView.toolbarButton)}>
              <Icon name='calendar alternate outline'/>
              <span className={classNames(stylesView.toolbarButtonTitle)}>
              {t('common.gantt')}
            </span>
            </div>
          </Link>
        </div>
      </div>
    );
  },
);

BoardActions.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  memberships: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired,
  filterUsers: PropTypes.array.isRequired,
  filterLabels: PropTypes.array.isRequired,
  allUsers: PropTypes.array.isRequired,
  /* eslint-enable react/forbid-prop-types */
  canEdit: PropTypes.bool.isRequired,
  canEditMemberships: PropTypes.bool.isRequired,
  onMembershipCreate: PropTypes.func.isRequired,
  onMembershipUpdate: PropTypes.func.isRequired,
  onMembershipDelete: PropTypes.func.isRequired,
  onUserToFilterAdd: PropTypes.func.isRequired,
  onUserFromFilterRemove: PropTypes.func.isRequired,
  onLabelToFilterAdd: PropTypes.func.isRequired,
  onLabelFromFilterRemove: PropTypes.func.isRequired,
  onLabelCreate: PropTypes.func.isRequired,
  onLabelUpdate: PropTypes.func.isRequired,
  onLabelMove: PropTypes.func.isRequired,
  onLabelDelete: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const {boardId} = selectors.selectPath(state);
  const allUsers = selectors.selectUsers(state);
  const isCurrentUserManager = selectors.selectIsCurrentUserManagerForCurrentProject(state);
  const memberships = selectors.selectMembershipsForCurrentBoard(state);
  const labels = selectors.selectLabelsForCurrentBoard(state);
  const filterUsers = selectors.selectFilterUsersForCurrentBoard(state);
  const filterLabels = selectors.selectFilterLabelsForCurrentBoard(state);
  const currentUserMembership = selectors.selectCurrentUserMembershipForCurrentBoard(state);

  const isCurrentUserEditor =
    !!currentUserMembership && currentUserMembership.role === BoardMembershipRoles.EDITOR;

  return {
    boardId,
    memberships,
    labels,
    filterUsers,
    filterLabels,
    allUsers,
    canEdit: isCurrentUserEditor,
    canEditMemberships: isCurrentUserManager,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      onMembershipCreate: entryActions.createMembershipInCurrentBoard,
      onMembershipUpdate: entryActions.updateBoardMembership,
      onMembershipDelete: entryActions.deleteBoardMembership,
      onUserToFilterAdd: entryActions.addUserToFilterInCurrentBoard,
      onUserFromFilterRemove: entryActions.removeUserFromFilterInCurrentBoard,
      onLabelToFilterAdd: entryActions.addLabelToFilterInCurrentBoard,
      onLabelFromFilterRemove: entryActions.removeLabelFromFilterInCurrentBoard,
      onLabelCreate: entryActions.createLabelInCurrentBoard,
      onLabelUpdate: entryActions.updateLabel,
      onLabelMove: entryActions.moveLabel,
      onLabelDelete: entryActions.deleteLabel,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(BoardActions);

import React, {useCallback, useRef} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {useTranslation} from 'react-i18next';
import {Button, Grid, Modal} from 'semantic-ui-react';
import {usePopup} from '../../../lib/use-popup';
import {QuillViewer} from '../../../lib';

import {startStopwatch, stopStopwatch} from '../../../lib/utils/stopwatch';
import NameField from './NameField';
import DescriptionEdit from './DescriptionEdit';
import Tasks from './Tasks';
import Attachments from './Attachments';
import AttachmentAddStep from './AttachmentAddStep';
import Activities from './Activities';
import User from '../../../view/User';
import Label from '../../../view/Label';
import Stopwatch from '../../../view/Stopwatch';
import BoardMembershipsStep from '../../../view/BoardMembershipsStep';
import LabelsStep from '../../../view/LabelsStep';
import StopwatchEditStep from '../../../view/StopwatchEditStep';
import CardMoveStep from '../../../view/CardMoveStep';
import DeleteStep from '../../../view/DeleteStep';

import styles from './index.module.scss';
import selectors from "../../../redux/selectors";
import {BoardMembershipRoles} from "../../../constants/Enums";
import {bindActionCreators} from "redux";
import entryActions from "../../../redux/entry-actions";
import {push} from "../../../lib/redux-router";
import omit from "lodash/omit";
import Paths from "../../../constants/Paths";
import {connect} from "react-redux";
import DateTimeRangeStep from "../../../view/DateTimeRangeStep";
import DateTimeRange from "../../../view/DateTimeRange";
import DriveFileMoveOutlinedIcon from '@mui/icons-material/DriveFileMoveOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';
import AttachmentOutlinedIcon from '@mui/icons-material/AttachmentOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import FormatAlignJustifyOutlinedIcon from '@mui/icons-material/FormatAlignJustifyOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import stylesDialog from '../../../view/index.module.scss';

const CardModal = React.memo(
  ({
     name,
     description,
     startDate,
     dueDate,
     stopwatch,
     isSubscribed,
     isActivitiesFetching,
     isAllActivitiesFetched,
     isActivitiesDetailsVisible,
     isActivitiesDetailsFetching,
     listId,
     boardId,
     projectId,
     users,
     labels,
     tasks,
     attachments,
     activities,
     allProjectsToLists,
     allBoardMemberships,
     allLabels,
     canEdit,
     canEditCommentActivities,
     canEditAllCommentActivities,
     onUpdate,
     onMove,
     onTransfer,
     onDelete,
     onUserAdd,
     onUserRemove,
     onBoardFetch,
     onLabelAdd,
     onLabelRemove,
     onLabelCreate,
     onLabelUpdate,
     onLabelMove,
     onLabelDelete,
     onTaskCreate,
     onTaskUpdate,
     onTaskMove,
     onTaskDelete,
     onAttachmentCreate,
     onAttachmentUpdate,
     onAttachmentDelete,
     onActivitiesFetch,
     onActivitiesDetailsToggle,
     onCommentActivityCreate,
     onCommentActivityUpdate,
     onCommentActivityDelete,
     onClose,
   }) => {
    const [t] = useTranslation();

    const isGalleryOpened = useRef(false);

    const handleToggleStopwatchClick = useCallback(() => {
      onUpdate({
        stopwatch: stopwatch.startedAt ? stopStopwatch(stopwatch) : startStopwatch(stopwatch),
      });
    }, [stopwatch, onUpdate]);

    const handleNameUpdate = useCallback(
      (newName) => {
        onUpdate({
          name: newName,
        });
      },
      [onUpdate],
    );

    const handleDescriptionUpdate = useCallback(
      (newDescription) => {
        onUpdate({
          description: newDescription,
        });
      },
      [onUpdate],
    );

    const handleDueDateUpdate = useCallback(
      (newStartDate, newDueDate) => {
        onUpdate({
          startDate: newStartDate,
          dueDate: newDueDate,
        });
      },
      [onUpdate],
    );

    const handleStopwatchUpdate = useCallback(
      (newStopwatch) => {
        onUpdate({
          stopwatch: newStopwatch,
        });
      },
      [onUpdate],
    );

    const handleCoverUpdate = useCallback(
      (newCoverAttachmentId) => {
        onUpdate({
          coverAttachmentId: newCoverAttachmentId,
        });
      },
      [onUpdate],
    );

    const handleToggleSubscriptionClick = useCallback(() => {
      onUpdate({
        isSubscribed: !isSubscribed,
      });
    }, [isSubscribed, onUpdate]);

    const handleGalleryOpen = useCallback(() => {
      isGalleryOpened.current = true;
    }, []);

    const handleGalleryClose = useCallback(() => {
      isGalleryOpened.current = false;
    }, []);

    const handleClose = useCallback(() => {
      if (isGalleryOpened.current) {
        return;
      }

      onClose();
    }, [onClose]);

    const AttachmentAddPopup = usePopup(AttachmentAddStep);
    const BoardMembershipsPopup = usePopup(BoardMembershipsStep);
    const LabelsPopup = usePopup(LabelsStep);
    const DueDateEditPopup = usePopup(DateTimeRangeStep);
    const StopwatchEditPopup = usePopup(StopwatchEditStep);
    const CardMovePopup = usePopup(CardMoveStep);
    const DeletePopup = usePopup(DeleteStep);

    const userIds = users.map((user) => user.id);
    const labelIds = labels.map((label) => label.id);

    const contentNode = (
      <Grid className={styles.grid}>
        <Grid.Row className={styles.headerPadding}>
          <Grid.Column width={16} className={styles.headerPadding}>
            <div className={styles.headerWrapper}>
              <ListAltOutlinedIcon className={styles.moduleIcon}/>
              <div className={styles.headerTitleWrapper}>
                {canEdit ? (
                  <NameField defaultValue={name} onUpdate={handleNameUpdate}/>
                ) : (
                  <div className={styles.headerTitle}>{name}</div>
                )}
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className={styles.modalPadding}>
          <Grid.Column width={canEdit ? 12 : 16} className={styles.contentPadding}>
            {(users.length > 0 || labels.length > 0 || dueDate || stopwatch) && (
              <div className={styles.moduleWrapper}>
                {users.length > 0 && (
                  <div className={styles.attachments}>
                    <div className={styles.text}>
                      {t('common.members', {
                        context: 'title',
                      })}
                    </div>
                    {users.map((user) => (
                      <span key={user.id} className={styles.attachment}>
                        {canEdit ? (
                          <BoardMembershipsPopup
                            items={allBoardMemberships}
                            currentUserIds={userIds}
                            onUserSelect={onUserAdd}
                            onUserDeselect={onUserRemove}
                          >
                            <User name={user.name} avatarUrl={user.avatarUrl}/>
                          </BoardMembershipsPopup>
                        ) : (
                          <User name={user.name} avatarUrl={user.avatarUrl}/>
                        )}
                      </span>
                    ))}
                    {canEdit && (
                      <BoardMembershipsPopup
                        items={allBoardMemberships}
                        currentUserIds={userIds}
                        onUserSelect={onUserAdd}
                        onUserDeselect={onUserRemove}
                      >
                        <button
                          type="button"
                          className={classNames(styles.attachment, styles.dueDate)}
                        >
                          <AddOutlinedIcon fontSize='small' className={styles.addAttachment}/>
                        </button>
                      </BoardMembershipsPopup>
                    )}
                  </div>
                )}
                {labels.length > 0 && (
                  <div className={styles.attachments}>
                    <div className={styles.text}>
                      {t('common.labels', {
                        context: 'title',
                      })}
                    </div>
                    {labels.map((label) => (
                      <span key={label.id} className={styles.attachment}>
                        {canEdit ? (
                          <LabelsPopup
                            key={label.id}
                            items={allLabels}
                            currentIds={labelIds}
                            onSelect={onLabelAdd}
                            onDeselect={onLabelRemove}
                            onCreate={onLabelCreate}
                            onUpdate={onLabelUpdate}
                            onMove={onLabelMove}
                            onDelete={onLabelDelete}
                          >
                            <Label name={label.name} color={label.color}/>
                          </LabelsPopup>
                        ) : (
                          <Label name={label.name} color={label.color}/>
                        )}
                      </span>
                    ))}
                    {canEdit && (
                      <LabelsPopup
                        items={allLabels}
                        currentIds={labelIds}
                        onSelect={onLabelAdd}
                        onDeselect={onLabelRemove}
                        onCreate={onLabelCreate}
                        onUpdate={onLabelUpdate}
                        onMove={onLabelMove}
                        onDelete={onLabelDelete}
                      >
                        <button
                          type="button"
                          className={classNames(styles.attachment, styles.dueDate)}
                        >
                          <AddOutlinedIcon fontSize='small' className={styles.addAttachment}/>
                        </button>
                      </LabelsPopup>
                    )}
                  </div>
                )}
                {(startDate && dueDate) && (
                  <div className={styles.attachments}>
                    <span className={styles.attachment}>
                      {canEdit ? (
                        <>
                          <DueDateEditPopup startDate={startDate} dueDate={dueDate} onUpdate={handleDueDateUpdate}>
                            <DateTimeRange startDate={startDate} dueDate={dueDate}/>
                          </DueDateEditPopup>
                        </>
                      ) : (
                        <DateTimeRange startDate={startDate} dueDate={dueDate}/>
                      )}
                    </span>
                  </div>
                )}
                {stopwatch && (
                  <div className={styles.attachments}>
                    <div className={styles.text}>
                      {t('common.stopwatch', {
                        context: 'title',
                      })}
                    </div>
                    <span className={styles.attachment}>
                      {canEdit ? (
                        <StopwatchEditPopup
                          defaultValue={stopwatch}
                          onUpdate={handleStopwatchUpdate}
                        >
                          <Stopwatch startedAt={stopwatch.startedAt} total={stopwatch.total}/>
                        </StopwatchEditPopup>
                      ) : (
                        <Stopwatch startedAt={stopwatch.startedAt} total={stopwatch.total}/>
                      )}
                    </span>
                    {canEdit && (
                      <button
                        type="button"
                        className={classNames(styles.attachment, styles.dueDate)}
                        onClick={handleToggleStopwatchClick}
                      >
                        {
                          stopwatch.startedAt ? <PauseIcon fontSize='small' className={styles.addAttachment}/> :
                            <PlayArrowIcon fontSize='small' className={styles.addAttachment}/>
                        }
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
            {(description || canEdit) && (
              <div className={styles.contentModule}>
                <div className={styles.moduleWrapper}>
                  <FormatAlignJustifyOutlinedIcon className={styles.moduleIcon}/>
                  <div className={styles.moduleHeader}>{t('common.description')}</div>
                  {canEdit ? (
                    <DescriptionEdit defaultValue={description} onUpdate={handleDescriptionUpdate}>
                      {description ? (
                        <button
                          type="button"
                          className={classNames(styles.descriptionText, styles.cursorPointer)}
                        >
                          <QuillViewer content={description}/>
                        </button>
                      ) : (
                        <button type="button" className={styles.descriptionButton}>
                          <span className={styles.descriptionButtonText}>
                            {t('action.addMoreDetailedDescription')}
                          </span>
                        </button>
                      )}
                    </DescriptionEdit>
                  ) : (
                    <div className={styles.descriptionText}>
                      <QuillViewer content={description}/>
                    </div>
                  )}
                </div>
              </div>
            )}
            {(tasks.length > 0 || canEdit) && (
              <div className={styles.contentModule}>
                <div className={styles.moduleWrapper}>
                  <CheckBoxOutlinedIcon className={styles.moduleIcon}/>
                  <div className={styles.moduleHeader}>{t('common.tasks')}</div>
                  <Tasks
                    items={tasks}
                    canEdit={canEdit}
                    onCreate={onTaskCreate}
                    onUpdate={onTaskUpdate}
                    onMove={onTaskMove}
                    onDelete={onTaskDelete}
                  />
                </div>
              </div>
            )}
            {attachments.length > 0 && (
              <div className={styles.contentModule}>
                <div className={styles.moduleWrapper}>
                  <AttachmentOutlinedIcon className={styles.moduleIcon}/>
                  <div className={styles.moduleHeader}>{t('common.attachments')}</div>
                  <Attachments
                    items={attachments}
                    canEdit={canEdit}
                    onUpdate={onAttachmentUpdate}
                    onDelete={onAttachmentDelete}
                    onCoverUpdate={handleCoverUpdate}
                    onGalleryOpen={handleGalleryOpen}
                    onGalleryClose={handleGalleryClose}
                  />
                </div>
              </div>
            )}
            <Activities
              items={activities}
              isFetching={isActivitiesFetching}
              isAllFetched={isAllActivitiesFetched}
              isDetailsVisible={isActivitiesDetailsVisible}
              isDetailsFetching={isActivitiesDetailsFetching}
              canEdit={canEditCommentActivities}
              canEditAllComments={canEditAllCommentActivities}
              onFetch={onActivitiesFetch}
              onDetailsToggle={onActivitiesDetailsToggle}
              onCommentCreate={onCommentActivityCreate}
              onCommentUpdate={onCommentActivityUpdate}
              onCommentDelete={onCommentActivityDelete}
            />
          </Grid.Column>
          {canEdit && (
            <Grid.Column width={4} className={styles.sidebarPadding}>
              <div className={styles.actions}>
                <span className={styles.actionsTitle}>{t('action.addToCard')}</span>
                <BoardMembershipsPopup
                  items={allBoardMemberships}
                  currentUserIds={userIds}
                  onUserSelect={onUserAdd}
                  onUserDeselect={onUserRemove}
                >
                  <Button fluid className={styles.actionButton}>
                    <PeopleOutlineOutlinedIcon fontSize='small' className={styles.actionIcon}/>
                    {t('common.members')}
                  </Button>
                </BoardMembershipsPopup>
                <LabelsPopup
                  items={allLabels}
                  currentIds={labelIds}
                  onSelect={onLabelAdd}
                  onDeselect={onLabelRemove}
                  onCreate={onLabelCreate}
                  onUpdate={onLabelUpdate}
                  onMove={onLabelMove}
                  onDelete={onLabelDelete}
                >
                  <Button fluid className={styles.actionButton}>
                    <BookmarksOutlinedIcon fontSize='small' className={styles.actionIcon}/>
                    {t('common.labels')}
                  </Button>
                </LabelsPopup>
                <DueDateEditPopup startDate={startDate} dueDate={dueDate} onUpdate={handleDueDateUpdate}>
                  <Button fluid className={styles.actionButton}>
                    <EventAvailableOutlinedIcon fontSize='small' className={styles.actionIcon}/>
                    {t('common.dateRange', {
                      context: 'title',
                    })}
                  </Button>
                </DueDateEditPopup>
                <StopwatchEditPopup defaultValue={stopwatch} onUpdate={handleStopwatchUpdate}>
                  <Button fluid className={styles.actionButton}>
                    <AccessTimeOutlinedIcon fontSize='small' className={styles.actionIcon}/>
                    {t('common.stopwatch')}
                  </Button>
                </StopwatchEditPopup>
                <AttachmentAddPopup onCreate={onAttachmentCreate}>
                  <Button fluid className={styles.actionButton}>
                    <AttachmentOutlinedIcon fontSize='small' className={styles.actionIcon}/>
                    {t('common.attachment')}
                  </Button>
                </AttachmentAddPopup>
              </div>
              <div className={styles.actions}>
                <span className={styles.actionsTitle}>{t('common.actions')}</span>
                <Button
                  fluid
                  className={styles.actionButton}
                  onClick={handleToggleSubscriptionClick}
                >
                  <SendOutlinedIcon fontSize='small' className={styles.actionIcon}/>
                  {isSubscribed ? t('action.unsubscribe') : t('action.subscribe')}
                </Button>
                <CardMovePopup
                  projectsToLists={allProjectsToLists}
                  defaultPath={{
                    projectId,
                    boardId,
                    listId,
                  }}
                  onMove={onMove}
                  onTransfer={onTransfer}
                  onBoardFetch={onBoardFetch}
                >
                  <Button
                    fluid
                    className={styles.actionButton}
                    onClick={handleToggleSubscriptionClick}
                  >
                    <DriveFileMoveOutlinedIcon fontSize='small' className={styles.actionIcon}/>
                    {t('action.move')}
                  </Button>
                </CardMovePopup>
                <DeletePopup
                  title="common.deleteCard"
                  content="common.areYouSureYouWantToDeleteThisCard"
                  buttonContent="action.deleteCard"
                  onConfirm={onDelete}
                >
                  <Button fluid className={styles.actionButton}>
                    <DeleteSweepOutlinedIcon fontSize='small' className={styles.actionIcon}/>
                    {t('action.delete')}
                  </Button>
                </DeletePopup>
              </div>
            </Grid.Column>
          )}
        </Grid.Row>
      </Grid>
    );

    return (
      <Modal open closeIcon={
        <div className={classNames(stylesDialog.dialogCloseButton)}>
          <CloseOutlinedIcon/>
        </div>
      } centered={false} onClose={handleClose} className={classNames(stylesDialog.dialog)}>
        {canEdit ? (
          <div>{contentNode}</div>
        ) : (
          contentNode
        )}
      </Modal>
    );
  },
);

CardModal.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  startDate: PropTypes.instanceOf(Date),
  dueDate: PropTypes.instanceOf(Date),
  stopwatch: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  isSubscribed: PropTypes.bool.isRequired,
  isActivitiesFetching: PropTypes.bool.isRequired,
  isAllActivitiesFetched: PropTypes.bool.isRequired,
  isActivitiesDetailsVisible: PropTypes.bool.isRequired,
  isActivitiesDetailsFetching: PropTypes.bool.isRequired,
  listId: PropTypes.string.isRequired,
  boardId: PropTypes.string.isRequired,
  projectId: PropTypes.string.isRequired,
  /* eslint-disable react/forbid-prop-types */
  users: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired,
  tasks: PropTypes.array.isRequired,
  attachments: PropTypes.array.isRequired,
  activities: PropTypes.array.isRequired,
  allProjectsToLists: PropTypes.array.isRequired,
  allBoardMemberships: PropTypes.array.isRequired,
  allLabels: PropTypes.array.isRequired,
  /* eslint-enable react/forbid-prop-types */
  canEdit: PropTypes.bool.isRequired,
  canEditCommentActivities: PropTypes.bool.isRequired,
  canEditAllCommentActivities: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
  onTransfer: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUserAdd: PropTypes.func.isRequired,
  onUserRemove: PropTypes.func.isRequired,
  onBoardFetch: PropTypes.func.isRequired,
  onLabelAdd: PropTypes.func.isRequired,
  onLabelRemove: PropTypes.func.isRequired,
  onLabelCreate: PropTypes.func.isRequired,
  onLabelUpdate: PropTypes.func.isRequired,
  onLabelMove: PropTypes.func.isRequired,
  onLabelDelete: PropTypes.func.isRequired,
  onTaskCreate: PropTypes.func.isRequired,
  onTaskUpdate: PropTypes.func.isRequired,
  onTaskMove: PropTypes.func.isRequired,
  onTaskDelete: PropTypes.func.isRequired,
  onAttachmentCreate: PropTypes.func.isRequired,
  onAttachmentUpdate: PropTypes.func.isRequired,
  onAttachmentDelete: PropTypes.func.isRequired,
  onActivitiesFetch: PropTypes.func.isRequired,
  onActivitiesDetailsToggle: PropTypes.func.isRequired,
  onCommentActivityCreate: PropTypes.func.isRequired,
  onCommentActivityUpdate: PropTypes.func.isRequired,
  onCommentActivityDelete: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

CardModal.defaultProps = {
  description: undefined,
  startDate: undefined,
  dueDate: undefined,
  stopwatch: undefined,
};

const mapStateToProps = (state) => {
  const {projectId} = selectors.selectPath(state);
  const allProjectsToLists = selectors.selectProjectsToListsForCurrentUser(state);
  const isCurrentUserManager = selectors.selectIsCurrentUserManagerForCurrentProject(state);
  const allBoardMemberships = selectors.selectMembershipsForCurrentBoard(state);
  const allLabels = selectors.selectLabelsForCurrentBoard(state);
  const currentUserMembership = selectors.selectCurrentUserMembershipForCurrentBoard(state);

  const {
    name,
    description,
    startDate,
    dueDate,
    stopwatch,
    isSubscribed,
    isActivitiesFetching,
    isAllActivitiesFetched,
    isActivitiesDetailsVisible,
    isActivitiesDetailsFetching,
    boardId,
    listId,
  } = selectors.selectCurrentCard(state);

  const users = selectors.selectUsersForCurrentCard(state);
  const labels = selectors.selectLabelsForCurrentCard(state);
  const tasks = selectors.selectTasksForCurrentCard(state);
  const attachments = selectors.selectAttachmentsForCurrentCard(state);
  const activities = selectors.selectActivitiesForCurrentCard(state);

  let isCurrentUserEditor = false;
  let isCurrentUserEditorOrCanComment = false;

  if (currentUserMembership) {
    isCurrentUserEditor = currentUserMembership.role === BoardMembershipRoles.EDITOR;
    isCurrentUserEditorOrCanComment = isCurrentUserEditor || currentUserMembership.canComment;
  }

  return {
    name,
    description,
    startDate,
    dueDate,
    stopwatch,
    isSubscribed,
    isActivitiesFetching,
    isAllActivitiesFetched,
    isActivitiesDetailsVisible,
    isActivitiesDetailsFetching,
    listId,
    boardId,
    projectId,
    users,
    labels,
    tasks,
    attachments,
    activities,
    allProjectsToLists,
    allBoardMemberships,
    allLabels,
    canEdit: isCurrentUserEditor,
    canEditCommentActivities: isCurrentUserEditorOrCanComment,
    canEditAllCommentActivities: isCurrentUserManager,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      onUpdate: entryActions.updateCurrentCard,
      onMove: entryActions.moveCurrentCard,
      onTransfer: entryActions.transferCurrentCard,
      onDelete: entryActions.deleteCurrentCard,
      onUserAdd: entryActions.addUserToCurrentCard,
      onUserRemove: entryActions.removeUserFromCurrentCard,
      onBoardFetch: entryActions.fetchBoard,
      onLabelAdd: entryActions.addLabelToCurrentCard,
      onLabelRemove: entryActions.removeLabelFromCurrentCard,
      onLabelCreate: entryActions.createLabelInCurrentBoard,
      onLabelUpdate: entryActions.updateLabel,
      onLabelMove: entryActions.moveLabel,
      onLabelDelete: entryActions.deleteLabel,
      onTaskCreate: entryActions.createTaskInCurrentCard,
      onTaskUpdate: entryActions.updateTask,
      onTaskMove: entryActions.moveTask,
      onTaskDelete: entryActions.deleteTask,
      onAttachmentCreate: entryActions.createAttachmentInCurrentCard,
      onAttachmentUpdate: entryActions.updateAttachment,
      onAttachmentDelete: entryActions.deleteAttachment,
      onActivitiesFetch: entryActions.fetchActivitiesInCurrentCard,
      onActivitiesDetailsToggle: entryActions.toggleActivitiesDetailsInCurrentCard,
      onCommentActivityCreate: entryActions.createCommentActivityInCurrentCard,
      onCommentActivityUpdate: entryActions.updateCommentActivity,
      onCommentActivityDelete: entryActions.deleteCommentActivity,
      push,
    },
    dispatch,
  );

const mergeProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  ...omit(dispatchProps, 'push'),
  onClose: () => dispatchProps.push(Paths.BOARDS.replace(':id', stateProps.boardId)),
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CardModal);

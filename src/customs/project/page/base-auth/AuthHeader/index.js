import selectors from "../../../../../redux/selectors";
import {bindActionCreators} from "redux";
import entryActions from "../../../../../redux/entry-actions";
import {connect} from "react-redux";
import React from "react";
import {usePopup} from "../../../../../lib/popup";
import NotificationsStep from "./NotificationsStep";
import UserStep from "./UserStep";
import styles from "./styles.module.scss";
import {Icon, Menu} from "semantic-ui-react";
import classNames from "classnames";
import PropTypes from "prop-types";

const POPUP_PROPS = {
    position: 'bottom right',
};

const Header = React.memo(
    ({
         user,
         notifications,
         isLogOuting,
         canEditUsers,
         onUsersClick,
         onNotificationDelete,
         onUserSettingsClick,
         onLogout,
     }) => {
        const NotificationsPopup = usePopup(NotificationsStep, POPUP_PROPS);
        const UserPopup = usePopup(UserStep, POPUP_PROPS);

        return (
            <div className={styles.wrapper1}>
                <Menu inverted size="large" className={styles.menu}>
                    <Menu.Menu position="right">
                        {canEditUsers && (
                            <Menu.Item
                                className={classNames(styles.item, styles.itemHoverable)}
                                onClick={onUsersClick}
                            >
                                <Icon fitted name="users" />
                            </Menu.Item>
                        )}
                        <NotificationsPopup items={notifications} onDelete={onNotificationDelete}>
                            <Menu.Item className={classNames(styles.item, styles.itemHoverable)}>
                                <Icon fitted name="bell" />
                                {notifications.length > 0 && (
                                    <span className={styles.notification}>{notifications.length}</span>
                                )}
                            </Menu.Item>
                        </NotificationsPopup>
                        <UserPopup
                            isLogouting={isLogOuting}
                            onSettingsClick={onUserSettingsClick}
                            onLogout={onLogout}
                        >
                            <Menu.Item className={classNames(styles.item, styles.itemHoverable)}>
                                {user.name}
                            </Menu.Item>
                        </UserPopup>
                    </Menu.Menu>
                </Menu>
            </div>
        );
    },
);

Header.propTypes = {
    user: PropTypes.object.isRequired,
    notifications: PropTypes.array.isRequired,
    isLogOuting: PropTypes.bool.isRequired,
    canEditUsers: PropTypes.bool.isRequired,
    onUsersClick: PropTypes.func.isRequired,
    onNotificationDelete: PropTypes.func.isRequired,
    onUserSettingsClick: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
}

Header.defaultProps = {
}

const mapStateToProps = (state) => {
    const isLogOuting = selectors.selectIsLogouting(state);
    const currentUser = selectors.selectCurrentUser(state);
    const notifications = selectors.selectNotificationsForCurrentUser(state);
    return {
        notifications,
        isLogOuting,
        user: currentUser,
        canEditUsers: currentUser.isAdmin,
    };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            onUsersClick: entryActions.openUsersModal,
            onNotificationDelete: entryActions.deleteNotification,
            onUserSettingsClick: entryActions.openUserSettingsModal,
            onLogout: entryActions.logout,
        },
        dispatch,
    );

export default connect(mapStateToProps, mapDispatchToProps)(Header);

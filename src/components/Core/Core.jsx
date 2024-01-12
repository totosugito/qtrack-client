import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useTranslation, Trans } from 'react-i18next';
import { Loader } from 'semantic-ui-react';

import ModalTypes from '../../constants/ModalTypes';
import FixedContainer from '../../containers/FixedContainer';
import StaticContainer from '../../containers/StaticContainer';
import UsersModalContainer from '../../containers/UsersModalContainer';
import UserSettingsModalContainer from '../../containers/UserSettingsModalContainer';
import ProjectAddModalContainer from '../../containers/ProjectAddModalContainer';
import Background from '../Background';

import styles from './Core.module.scss';
import { AppBar, Box, Drawer, Toolbar } from '@mui/material';
import DrawerWeb from './component/drawer-web';

const Core = React.memo(
  ({
    isInitializing,
    isSocketDisconnected,
    currentModal,
    currentProject,
    currentBoard
  }) => {
    const [t] = useTranslation();

    const defaultTitle = useRef(document.title);

    useEffect(() => {
      let title;
      if (currentProject) {
        title = currentProject.name;

        if (currentBoard) {
          title += ` | ${currentBoard.name}`;
        }
      } else {
        title = defaultTitle.current;
      }

      document.title = title;
    }, [currentProject, currentBoard]);

    const drawerWidth = 240;
    const ui_styles = {
      drawer: {
        display: {xs: 'none', sm: 'block'},
        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth}
      },
      drawerMobile: {
        display: {xs: 'block', sm: 'none'},
        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
      },
      boxToolbar: {
        // flexGrow: 1,
        width: {sm: `calc(100% - ${drawerWidth}px)`},
        marginLeft: {sm: `${drawerWidth}px`},
      },
      boxContent: {
        // display: 'flex',
        // flexGrow: 1,
        width: {sm: `calc(100% - ${drawerWidth}px)`},
        // marginTop: '32px',
        marginLeft: {sm: `${drawerWidth}px`},
        alignContent: 'center',
        alignItems: 'center',
        alignJustify: 'center',
      },
    }
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };

    return (
      <>
        {isInitializing ? (
          <Loader active size="massive"/>
        ) : (
          <>
            {currentProject && currentProject.background && (
              <Background
                type={currentProject.background.type}
                name={currentProject.background.name}
                imageUrl={currentProject.backgroundImage && currentProject.backgroundImage.url}
              />
            )}
            <Box component="nav" sx={{width: {sm: drawerWidth}, flexShrink: {sm: 768}}}>
              <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
                sx={ui_styles.drawerMobile}>
                <DrawerWeb/>
              </Drawer>
              <Drawer variant="permanent" open sx={ui_styles.drawer}>
                <DrawerWeb/>
              </Drawer>
            </Box>
            {/* <Box> */}
            {/*   <FixedContainer/> */}
            {/* </Box> */}
            {/* <Box component="nav" sx={{width: {sm: drawerWidth}, flexShrink: {sm: 768}}}> */}
            {/* </Box> */}
            <Box sx={ui_styles.boxToolbar}>
              <FixedContainer/>
            </Box>
            <Box sx={ui_styles.boxContent}>
              <StaticContainer/>
            </Box>
            {currentModal === ModalTypes.USERS && <UsersModalContainer/>}
            {currentModal === ModalTypes.USER_SETTINGS && <UserSettingsModalContainer/>}
            {currentModal === ModalTypes.PROJECT_ADD && <ProjectAddModalContainer/>}
          </>
        )}
        {isSocketDisconnected && (
          <div className={styles.message}>
            <div className={styles.messageHeader}>{t('common.noConnectionToServer')}</div>
            <div className={styles.messageContent}>
              <Trans i18nKey="common.allChangesWillBeAutomaticallySavedAfterConnectionRestored">
                All changes will be automatically saved
                <br/>
                after connection restored
              </Trans>
            </div>
          </div>
        )}
      </>
    );
  },
);

Core.propTypes = {
  isInitializing: PropTypes.bool.isRequired,
  isSocketDisconnected: PropTypes.bool.isRequired,
  currentModal: PropTypes.oneOf(Object.values(ModalTypes)),
  /* eslint-disable react/forbid-prop-types */
  currentProject: PropTypes.object,
  currentBoard: PropTypes.object,
  /* eslint-enable react/forbid-prop-types */
};

Core.defaultProps = {
  currentModal: undefined,
  currentProject: undefined,
  currentBoard: undefined,
};

export default Core;

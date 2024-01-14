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
import {AppBar, Box, Drawer, Grid, IconButton, Toolbar, Typography} from '@mui/material';
import DrawerWeb from "../../customs/project/skk/page/base-ui/component/drawer-web";
import {Menu as MenuIcon} from "@mui/icons-material";
import WebLogo from "../../customs/project/skk/page/base-ui/component/web-logo";
import HeaderContainer from "../../containers/HeaderContainer";

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
      boxContainer: {},
      title: {
        ml: 1,
        color: 'white',
        fontSize: '25px'
      },
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
        backgroundColor: 'silver',
      },
      boxContent: {
        display: 'flex',
        flexGrow: 1,
        // width: {sm: `calc(100% - ${drawerWidth}px)`},
        marginTop: '180px',
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

            <Box sx={ui_styles.boxContainer}>
              <AppBar >
                <Toolbar>
                  <Grid container direction="row" alignItems="flex-end" justifyContent="space-between">
                    <Grid item>
                      <Box sx={{
                        mr: 2,
                        display: {sm: 'none'},
                        alignContent: 'center',
                        alignItems: 'center',
                      }}>
                        <IconButton edge="start" onClick={handleDrawerToggle}>
                          <MenuIcon sx={ui_styles.toolbarIcon} style={{color: 'white'}}/>
                        </IconButton>
                        {/*<WebLogo color={'white'}/>*/}
                      </Box>
                    </Grid>
                    <Grid item>
                      {/*<FixedContainer/>*/}
                      <HeaderContainer />
                    </Grid>
                  </Grid>
                </Toolbar>
              </AppBar>
            </Box>

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

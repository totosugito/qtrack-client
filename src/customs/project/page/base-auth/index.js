import {
    AppBar,
    Box, Drawer,
    Grid, IconButton, Stack,
    Typography, useTheme,
} from "@mui/material";
import DrawerWeb from "./Views/drawer-web";
import React from "react";
import {Menu as MenuIcon} from '@mui/icons-material';
import styles from "../../../../components/Core/Core.module.scss";
import {Trans, useTranslation} from "react-i18next";
import AuthHeader from "./AuthHeader";
import ModalTypes from "../../../../constants/ModalTypes";
import UserSettingsModalContainer from "../../../../containers/UserSettingsModalContainer";
import selectors from "../../../../redux/selectors";
import {useSelector} from "react-redux";
import {Loader} from "semantic-ui-react";

const BaseAuth = (props) => {
    const theme = useTheme();
    const drawerWidth = 240;
    const stylesMui = {
        logo: {
            width: "30px",
            height: "30px"
        },
        title: {
            ml: 1,
            color: 'white',
            fontSize: '25px'
        },
        boxContainer: {},
        appBar: {
            width: {sm: `calc(100% - ${drawerWidth}px)`},
            marginLeft: {sm: `${drawerWidth}px`},
            backgroundColor: theme.palette.background.default
        },
        drawer: {
            display: {xs: 'none', sm: 'block'},
            '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth}
        },
        drawerMobile: {
            display: {xs: 'block', sm: 'none'},
            '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
        },
        boxContent: {
            flexGrow: 1,
            width: {sm: `calc(100% - ${drawerWidth}px)`},
            marginLeft: {sm: `${drawerWidth}px`},
            alignContent: 'center',
            alignItems: 'center',
            alignJustify: 'center',
        },
        toolbarIcon: {
            fontSize: 25,
            color: 'inherit'
        }
    }

    const [t] = useTranslation();
    const isInitializing = useSelector((state) => selectors.selectIsInitializing(state))
    const isSocketDisconnected = useSelector((state) => selectors.selectIsSocketDisconnected(state))
    const currentModal = useSelector((state) => selectors.selectCurrentModal(state))

    const [mobileOpen, setMobileOpen] = React.useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <>
            <Box sx={stylesMui.boxContainer}>
                <AppBar position="static">
                    <Grid container direction="row" alignItems="flex-end" justifyContent="space-between">
                        <Grid item>
                            <Box sx={{
                                ml: 2,
                                display: {sm: 'none'},
                                alignContent: 'center',
                                alignItems: 'center',
                            }}>
                                <IconButton edge="start" onClick={handleDrawerToggle}>
                                    <MenuIcon sx={stylesMui.toolbarIcon} style={{color: 'white'}}/>
                                </IconButton>
                            </Box>
                            <Typography sx={stylesMui.title}>{props.title}</Typography>
                        </Grid>
                        <Grid item>
                            <Stack direction={'row'}>
                                {props.toolbar}
                                {!isInitializing && <AuthHeader/>}
                            </Stack>
                        </Grid>
                    </Grid>
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
                    sx={stylesMui.drawerMobile}>
                    <DrawerWeb hideMenuGeneral={props["hideMenuGeneral"]}/>
                </Drawer>
                <Drawer variant="permanent" open sx={stylesMui.drawer}>
                    <DrawerWeb hideMenuGeneral={props["hideMenuGeneral"]}/>
                </Drawer>
            </Box>

            <Box sx={stylesMui.boxContent}>
                {isInitializing ? (<Loader active size="massive"/>) : (props.children)}
            </Box>

            {currentModal === ModalTypes.USER_SETTINGS && <UserSettingsModalContainer/>}

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
    )
}
export default BaseAuth

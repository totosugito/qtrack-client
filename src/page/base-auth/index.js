import {
    Box,
    Grid, IconButton,
    Typography, useTheme,
} from "@mui/material";
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import DrawerWeb from "./Views/drawer-web";
import React from "react";
import styles from "./index.module.scss";
import {Trans, useTranslation} from "react-i18next";
import AuthHeader from "./AuthHeader";
import ModalTypes from "../../constants/ModalTypes";
import UserSettingsModal from "./AuthHeader/UserSettingsModal";
import selectors from "../../redux/selectors";
import {useSelector} from "react-redux";
import {Loader} from "semantic-ui-react";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {styled} from "@mui/material/styles";

const drawerWidth = 240
const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
)

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
        boxContainer: {
            display: 'flex'
        },
        appBar: {
            width: {sm: `calc(100% - ${drawerWidth}px)`},
            marginLeft: {sm: `${drawerWidth}px`},
            backgroundColor: theme.palette.background.default
        },
        drawer: {
            display: {xs: 'none', sm: 'block'},
            '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth}
        },
        boxContent: {
            flexGrow: 1,
            // width: {sm: `calc(100% - ${drawerWidth}px)`},
            // marginLeft: {sm: `${drawerWidth}px`},
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

    const [open, setOpen] = React.useState(false);
    const handleDrawer = () => {
        setOpen(!open)
    }

    return (
        <>
            { props.hasBg && props.background}
            <Box sx={stylesMui.boxContainer} display={'flex'}>
                <AppBar position="fixed" open={open} style={{ background: props.hasBg ? "rgba(0, 0, 0, 0.4)" : theme.palette.primary.main,
                    boxShadow: props.hasBg ? 'none' : 'inherit'}}>
                    <Grid container direction="row" justifyContent="space-between" alignItems="stretch" display={'flex'}>
                        <Grid item>
                            {/*<Box sx={{*/}
                            {/*    ml: 2,*/}
                            {/*    display: {sm: 'none'},*/}
                            {/*    alignContent: 'center',*/}
                            {/*    alignItems: 'center',*/}
                            {/*}}>*/}
                            {/*    <IconButton edge="start" onClick={handleDrawerOpen}>*/}
                            {/*        <MenuIcon sx={stylesMui.toolbarIcon} style={{color: 'white'}}/>*/}
                            {/*    </IconButton>*/}
                            {/*</Box>*/}
                            <Typography sx={stylesMui.title}>{props.title}</Typography>
                        </Grid>
                        <Grid item>
                            {/*<Stack direction={'row'}>*/}
                            {/*    {props.toolbar}*/}
                                {!isInitializing && <AuthHeader/>}
                            {/*</Stack>*/}
                        </Grid>
                    </Grid>
                </AppBar>

                    <Drawer
                        variant="permanent"
                        open={open}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}>

                        <DrawerWeb open={open} header={
                            <IconButton onClick={handleDrawer}>
                                {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                            </IconButton>
                        }/>
                    </Drawer>

                <Box component="main" sx={{ flexGrow: 1, mt: "50px"}}>
                    {isInitializing ? (<Loader active size="massive"/>) : (props.children)}
                </Box>
            </Box>

            {currentModal === ModalTypes.USER_SETTINGS && <UserSettingsModal/>}

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

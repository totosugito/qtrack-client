import {
    AppBar,
    Box, Drawer,
    Grid, IconButton, Link,
    Toolbar, Typography, useTheme,
} from "@mui/material";
import DrawerWeb from "./component/drawer-web";
import React from "react";
import WebLogo from "./component/web-logo";
import {Menu as MenuIcon} from '@mui/icons-material';

const BaseUi = (props) => {
    const theme = useTheme();
    const drawerWidth = 240;
    const styles = {
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

    const [mobileOpen, setMobileOpen] = React.useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <>
            <Box sx={styles.boxContainer}>
                <AppBar position="static">
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
                                        <MenuIcon sx={styles.toolbarIcon} style={{color: 'white'}}/>
                                    </IconButton>
                                    <WebLogo color={theme.palette.background.default}/>
                                </Box>
                                <Typography sx={styles.title}>{props.title}</Typography>
                            </Grid>
                            <Grid item>{props.toolbar}</Grid>
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
                    sx={styles.drawerMobile}>
                    <DrawerWeb hideMenuGeneral={props["hideMenuGeneral"]}/>
                </Drawer>
                <Drawer variant="permanent" open sx={styles.drawer}>
                    <DrawerWeb hideMenuGeneral={props["hideMenuGeneral"]}/>
                </Drawer>
            </Box>

            <Box sx={styles.boxContent}>
                {props.children}
            </Box>
        </>
    )
}
export default BaseUi
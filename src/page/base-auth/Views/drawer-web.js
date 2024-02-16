import {
    AppBar,
    Divider, Grid,
    Link,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    useTheme
} from "@mui/material";

import InfoIcon from '@mui/icons-material/Info';
import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import FolderIcon from '@mui/icons-material/Folder';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import ApartmentIcon from '@mui/icons-material/Apartment';
import MarkChatReadIcon from '@mui/icons-material/MarkChatRead';
import PinDropIcon from '@mui/icons-material/PinDrop';
import Paths from "../../../constants/Paths";

const DrawerMenu = ({open, path, icon, text}) => {
    const theme = useTheme()
    const styles = {
        menuItem: {
            color: theme.palette.text.primary,
        },
    }
    return (
        <>
            <Link underline={'none'} href={path}>
                <ListItem disablePadding={true} disableGutters={true}>
                    <ListItemButton sx={styles.menuItem}>
                        {icon}
                        <ListItemText primary={text} sx={{ml: '5px', opacity: open ? 1 : 0}}/>
                    </ListItemButton>
                </ListItem>
            </Link>
        </>
    )
}

export default function DrawerWeb(props) {
    const theme = useTheme()
    const styles = {
        title: {
            color: theme.palette.text.secondary,
            mt: "5px",
            ml: "10px",
        },
        headerAppbar: {
            background: 'transparent',
            alignItems: 'center',
            justifyContent: 'right'
        },
        headerContainer: {
            background: theme.palette.background.default,
            color: 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
        }
    }

    return (
        <div>
            <Grid container direction='row' sx={styles.headerContainer} style={{height: '50px'}}>
                {(props.header && props.open) && props.header}
            </Grid>
            {
                !props.open && (
                    <Grid container direction='row' sx={styles.headerContainer}>
                        {props.header && props.header}
                    </Grid>
                )
            }
            <Divider/>
            <List>
                <DrawerMenu open={props.open} path={Paths.ROOT} icon={<HomeIcon/>} text={"Home"}/>
                <DrawerMenu open={props.open} path={Paths.HOME_MAP} icon={<PinDropIcon/>} text={"Map"}/>
                <DrawerMenu open={props.open} path={Paths.PROJECTS_LIST} icon={<FolderIcon/>} text={"Projects"}/>
            </List>

            <Divider/>
            <List>
                {/*<ListItemText primary={"INFO"} sx={styles.title}/>*/}
                <DrawerMenu open={props.open} path={'#'} icon={<MarkChatReadIcon/>} text={"Testimonials"}/>
                <DrawerMenu open={props.open} path={'#'} icon={<ApartmentIcon/>} text={"Clients"}/>
                <DrawerMenu open={props.open} path={'#'} icon={<MarkEmailUnreadIcon/>} text={"Contact Us"}/>
                <DrawerMenu open={props.open} path={'#'} icon={<InfoIcon/>} text={"About Us"}/>
            </List>
        </div>
    );
}

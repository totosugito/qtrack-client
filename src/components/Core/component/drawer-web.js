import {
    Divider,
    Link,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Toolbar,
    useTheme
} from "@mui/material";

import InfoIcon from '@mui/icons-material/Info';
import React from "react";
import WebLogo from "./web-logo";
import HomeIcon from '@mui/icons-material/Home';
import FolderIcon from '@mui/icons-material/Folder';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import ApartmentIcon from '@mui/icons-material/Apartment';
import MarkChatReadIcon from '@mui/icons-material/MarkChatRead';
import PinDropIcon from '@mui/icons-material/PinDrop';

export default function DrawerWeb(props) {
    const theme = useTheme()
    const styles = {
        title: {
            color: theme.palette.text.secondary,
            mt: "5px",
            ml: "10px",
        },
        menuText: {
            marginLeft: "8px",
            color: theme.palette.text.primary
        },
        iconMenu: {
            color: theme.palette.text.primary
        },
        logoImage: {
            width: 48,
            height: 48,
        },
        logoTitle: {
            color: theme.palette.text.secondary,
            mb: 1
        },
        logoAppName: {
            color: theme.palette.text.primary,
            fontSize: '95%'
        },
    }

    return (
        <div>
            <Toolbar><WebLogo mode={0}/></Toolbar>
            <Divider/>
            <List>
                <Link underline={'none'} href="#">
                    <ListItem disablePadding>
                        <ListItemButton sx={styles.iconMenu}>
                            <HomeIcon/>
                            <ListItemText sx={styles.menuText} primary={"Home"}/>
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Link underline={'none'} href="#">
                    <ListItem disablePadding>
                        <ListItemButton sx={styles.iconMenu}>
                            <PinDropIcon/>
                            <ListItemText sx={styles.menuText} primary={"Map"}/>
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Link underline={'none'} href="#">
                    <ListItem disablePadding>
                        <ListItemButton sx={styles.iconMenu}>
                            <FolderIcon/>
                            <ListItemText sx={styles.menuText} primary={"Project"}/>
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Link underline={'none'} href="#">
                    <ListItem disablePadding>
                        <ListItemButton sx={styles.iconMenu}>
                            <PeopleAltIcon/>
                            <ListItemText sx={styles.menuText} primary={"User"}/>
                        </ListItemButton>
                    </ListItem>
                </Link>
            </List>

            <Divider/>
            <List>
                <ListItemText primary={"INFO"} sx={styles.title}/>
                <Link underline={'none'} href="#">
                    <ListItem disablePadding>
                        <ListItemButton sx={styles.iconMenu}>
                            <MarkChatReadIcon/>
                            <ListItemText sx={styles.menuText} primary={"Testimonials"}/>
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Link underline={'none'} href="#">
                    <ListItem disablePadding>
                        <ListItemButton sx={styles.iconMenu}>
                            <ApartmentIcon/>
                            <ListItemText sx={styles.menuText} primary={"Clients"}/>
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Link underline={'none'} href="#">
                    <ListItem disablePadding>
                        <ListItemButton sx={styles.iconMenu}>
                            <MarkEmailUnreadIcon/>
                            <ListItemText sx={styles.menuText} primary={"Contact Us"}/>
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Link underline={'none'} href="#">
                    <ListItem disablePadding>
                        <ListItemButton sx={styles.iconMenu}>
                            <InfoIcon/>
                            <ListItemText sx={styles.menuText} primary={"About Us"}/>
                        </ListItemButton>
                    </ListItem>
                </Link>
            </List>
        </div>
    );
}

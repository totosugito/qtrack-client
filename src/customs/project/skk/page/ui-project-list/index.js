import {Box, Breadcrumbs, Button, Grid, Typography, useTheme} from "@mui/material";
import React from "react";
import {useEffect} from "react";
import {dispatch} from "../../../../store";
import {LOCATION_CHANGE_HANDLE} from "../../../../store/slice/router";
import {useLocation} from "react-router-dom";
import {AUTHENTICATE} from "../../../../store/slice/auth";

const UiProjectList = React.memo(
    ({
         isInitializing,
         isSocketDisconnected,
         currentModal,
         currentProject,
         currentBoard
     }) => {
        const theme = useTheme()
        const styles = {
            title: {
                mt: 2,
                mb: 1,
                fontSize: '120%',
                fontWeight: 'bold',
                color: theme.palette.secondary.main
            },
            container: {
                p: 1,
                mt: 1,
            },
            card: {
                p: 0,
                boxShadow: 0,
            }
        }

        // const history = useLocation()
        // useEffect(() => {
        //     // dispatch(AUTHENTICATE())
        //     // dispatch(LOCATION_CHANGE_HANDLE({location: history}))
        // }, []);

        // const dataStore = useSelector((state) => state.skk)
        // const [project, setProject] = useState(dataStore["project"])
        // const navigate = useNavigate()
        // const [openClearDialog, setOpenClearDialog] = useState(false)
        // const dialogClearOnCancelClicked = () => {
        //     setOpenClearDialog(false)
        // }
        // const dialogClearOnConfirmClicked = () => {
        //     dispatch(skkProjectClear())
        //     setOpenClearDialog(false)
        //     window.location.reload()
        // }
        //
        // const createDummyProject = () => {
        //     dummy_data.id = Math.floor(Math.random() * 1000000);
        //     dummy_data.title = "Dummy Project - " + dummy_data.id
        //     dispatch(skkProjectAdd(dummy_data))
        //     window.location.reload()
        // }

        return (
            <>
                halo
            </>
        )
    })
export default UiProjectList

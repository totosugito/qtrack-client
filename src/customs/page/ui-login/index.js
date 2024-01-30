import {useLocation, useNavigate} from "react-router-dom";
import {Box, CircularProgress, Grid, useTheme} from "@mui/material";
import {AuthFooter, WebLogo} from "../../component";
import LoginForm from "./component/login-form";
import {dispatch} from "../../../redux/store-reduxjs";
import {useSelector} from "react-redux";
import React from "react";
import entryActions from "../../../redux/entry-actions";
import {useMemo} from "react";

const UiLogin = (props) => {
    const theme = useTheme()
    const styles = {}

    const storeRoot = useSelector((state) => state["root"])
    const error = useSelector((state) => state["ui"]["authenticateForm"]["error"])
    const message = useMemo(() => error, [error]);
    const [msg, setMsg] = React.useState({hasErrors: false, data: null});


    const onLoginSubmit = (bodyFormData) => {
        dispatch(entryActions.authenticate(bodyFormData))
    }

    return (
        <>
            <Box sx={{minHeight: '100vh'}}>
                <Grid
                    container
                    direction="column"
                    justifyContent="flex-end"
                    sx={{
                        minHeight: '100vh'
                    }}
                >
                    <Grid item xs={12} sx={{ml: 3, mt: 3}}>
                        <WebLogo/>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid
                            item
                            xs={12}
                            container
                            justifyContent="center"
                            alignItems="center"
                            sx={{minHeight: {xs: 'calc(100vh - 134px)', md: 'calc(100vh - 112px)'}}}
                        >
                            <Grid item>
                                {
                                    storeRoot.isInitializing ? <CircularProgress/> : <LoginForm msg={message} onSubmit={onLoginSubmit}/>
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{m: 3, mt: 1}}>
                        <AuthFooter/>
                    </Grid>
                </Grid>
            </Box>
        </>)
}
export default UiLogin

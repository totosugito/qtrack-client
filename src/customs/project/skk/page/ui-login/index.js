import {useLocation, useNavigate} from "react-router-dom";
import {Box, CircularProgress, Grid, useTheme} from "@mui/material";
import {AuthFooter, WebLogo} from "../../component";
import LoginForm from "./component/login-form";
import {useEffect} from "react";
import {LOCATION_CHANGE_HANDLE} from "../../../../store/slice/router";
import {dispatch} from "../../../../store";
import {useSelector} from "react-redux";
import React from "react";
import {httpGet, httpPost} from "../../../../service/http-api";
import {getRouterApi, getRouterUrl} from "../../../../router";
import {LOGIN_INITIALIZE} from "../../../../store/slice/root";
import {AUTHENTICATE, AUTHENTICATE__FAILURE, AUTHENTICATE__SUCCESS} from "../../../../store/slice/auth";

const UiLogin = (props) => {
    const history = useLocation()
    const navigate = useNavigate()
    const theme = useTheme()
    const styles = {}

    const storeRoot = useSelector((state) => state["root"])
    const [msg, setMsg] = React.useState({hasErrors: false, data: null});

    useEffect(() => {
        // dispatch(AUTHENTICATE())
        // dispatch(LOCATION_CHANGE_HANDLE({location: history}))
        get_data().then(r => {
        });
    }, []);

    const get_data = async () => {
        await httpGet(getRouterApi("config"), {}).then((v) => {
            dispatch(LOGIN_INITIALIZE({config: v.data}))
        });
    }

    const onLoginSubmit = async (bodyFormData) => {
        await httpPost(getRouterApi("access-tokens"), bodyFormData).then((v) => {
            if(v.hasErrors) {
                setMsg({hasErrors: v.hasErrors, data: v.data})
                dispatch(AUTHENTICATE__FAILURE())
            }
            else {
                setMsg({hasErrors: v.hasErrors, data: null})
                dispatch(AUTHENTICATE__SUCCESS({accessToken: v.data["item"]}))
                navigate(getRouterUrl("root"))
            }
        });
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
                                    storeRoot.isInitializing ? <CircularProgress/> : <LoginForm msg={msg} onSubmit={onLoginSubmit}/>
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

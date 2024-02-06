import {Box, CircularProgress, Grid, useTheme} from "@mui/material";
import {AuthFooter, WebLogo} from "../../component";
import LoginForm from "./component/login-form";
import {dispatch} from "../../../redux/store-reduxjs";
import {connect} from "react-redux";
import React from "react";
import entryActions from "../../../redux/entry-actions";
import selectors from "../../../redux/selectors";
import {bindActionCreators} from "redux";

const UiLogin = React.memo(({ isInitializing,
                                defaultData,
                                isSubmitting,
                                error,
                                onAuthenticate,
                                onMessageDismiss}) => {
    const theme = useTheme()
    const styles = {}

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
                                    isInitializing ? <CircularProgress/> : <LoginForm msg={error} onSubmit={onAuthenticate}/>
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
})

const mapStateToProps = (state) => {
    const {
        ui: {
            authenticateForm: { data: defaultData, isSubmitting, error },
        },
    } = state;

    const isInitializing = selectors.selectIsInitializing(state);
    return {
        isInitializing,
        defaultData,
        isSubmitting,
        error,
    };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            onAuthenticate: entryActions.authenticate,
            onMessageDismiss: entryActions.clearAuthenticateError,
        },
        dispatch,
    );

export default connect(mapStateToProps, mapDispatchToProps)(UiLogin);

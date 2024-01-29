import React from "react";
import {useEffect} from "react";
import {connect} from "react-redux";
import BaseAuth from "../base-auth";
import Projects from "./Projects";

const UiProjectList = React.memo(
    ({
     }) => {
        useEffect(() => {
            document.title = "Project List";
        }, []);

        return (
            <>
                <BaseAuth>
                    <Projects/>
                </BaseAuth>
            </>
        )
    })
UiProjectList.propTypes = {
}

UiProjectList.defaultProps = {};

const mapStateToProps = (state) => {
    return {
    }
}
export default connect(mapStateToProps)(UiProjectList)

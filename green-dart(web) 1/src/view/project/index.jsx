import React from "react";
import DefaultLayout from "../../layout/defaultLayout/index";
import Project_banner from "../../component/project_components/banner";
import Project_detailes from "../../component/project_components/project_detailes";


function Project () {
    return(
        <>
        <DefaultLayout>
        <Project_banner/>
        <Project_detailes/>
        </DefaultLayout>
        </>
    );
}
export default Project;
import React from "react";
import DefaultLayout from "../../layouts/defaultLayout";
import Title from '../../components/Title'
import Managed_Component from "../../components/Managed-component";

function Managed() {
    return (
        <>
            <Title title="Managed | Ruposhi Global">
                <DefaultLayout>
                    <Managed_Component />
                </DefaultLayout>
            </Title>
        </>
    );
}

export default Managed;

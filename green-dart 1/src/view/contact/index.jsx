import React from "react";
import DefaultLayout from "../../layout/defaultLayout";
import Contact_banner from "../../component/contact_components/banner";
import Contact_detailes from "../../component/contact_components/contact-detailes";
function Contact(){
    return(
        <DefaultLayout>
        <Contact_banner/>
        <Contact_detailes/>
        </DefaultLayout>
    )
}
export default Contact;
import React from "react";
import DefaultLayout from "../../layout/defaultLayout";
import GalleryBanner from "../../component/gallery_components/banner_gallery";
import Gallery_info from "../../component/gallery_components/galley-info";

function Gallery(){
    return(
<DefaultLayout>
    <GalleryBanner/>
    <Gallery_info/>
</DefaultLayout>
    )
}
export default Gallery;
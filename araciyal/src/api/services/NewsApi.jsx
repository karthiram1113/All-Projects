import API_EP_BOOK from "../endpoints";
import API from "../api";
import LoginAPI from "./LoginApi";


// Tamilnadu list
const Tamilnadu = API_EP_BOOK.TAMILNADU_API_EP;
console.log("lists",Tamilnadu);

const TamilNadu = {
  
    Tamilnadulist: function (token,pageIndex, dataLength) {
        console.log(token,pageIndex, dataLength,"token page length");
        
      const requestAPIData = {
        
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            bodyData: 
                {
                pageIndex: pageIndex,
                dataLength: dataLength,
                filter: {
                    date: "",
                    tags: "",
                    news_speciality_id: "",
                    subcategory_id: "3",
                    category_id: null
                }

            },

                  };
                  console.log(requestAPIData,);
                  
             const getResponse = API(Tamilnadu, requestAPIData);
      return getResponse;
    }

}
export default TamilNadu;



// tamilnadu create,

export const TNcreate = async (
    settitle,
    sub_title,
    description,
    news_category,
    news_sub_category,
    date,
    tags,
    specification,
    news_reporter,
    image,
    video_link
) => {
    
    try {

        const formData = new FormData();

        formData.append('title', settitle);
        formData.append('sub_title', sub_title);
        formData.append('description', description);
        formData.append('news_category', news_category);
        formData.append('news_sub_category', news_sub_category);
        formData.append('date', date);
        formData.append('tags', tags);
        formData.append('news_speciality', specification);
        formData.append('news_reporter', news_reporter);
        formData.append('image', image);
        formData.append('news_video_link', video_link);
        if (image) {
            formData.append('image', image);
        }
        const token = localStorage.getItem("token");
        console.log(token,'token for url');
        
        const response = await LoginAPI.tncreate(formData)
        console.log(response,'api url full pathss');
       
        return response;
    } catch (error) {
        console.error("Error in NEWS Create:", error);
        throw error;
    }
};


// tamilnadu get,

export const TNget = async (id) => {
    const token = localStorage.getItem("token");
    try {

        const response = await LoginAPI.TNgetid(id);

        const responseData = await response.json();
        console.log(responseData,"get by id");
        return responseData;
        
    } 
    catch (error) {
        console.error("Error in clientGet:", error);
        throw error;
    }
};

// tamilnadu update,

export const TNUpdate = async (
    news_id,
    settitle,
    sub_title,
    description,
    news_category,
    news_sub_category,
    date,
    tags,
    specification,
    news_reporter,
    image,
    video_link,
    publish_status

) => {
    try {
        const formData = new FormData();
        formData.append('id', news_id);
        formData.append('title', settitle);
        formData.append('sub_title', sub_title);
        formData.append('description', description);
        formData.append('news_category', news_category);
        formData.append('news_sub_category', news_sub_category);
        formData.append('date', date);
        formData.append('tags', tags);
        formData.append('news_speciality', specification);
        formData.append('news_reporter', news_reporter);
        formData.append('image', image);
        formData.append('news_video_link', video_link);
        formData.append('publish_status', publish_status);
        if (image) {
            formData.append('image', image);
        }
        const token = localStorage.getItem("token");

        const response = await fetch( {
            headers: {
                "Authorization": `Bearer ${token}` 
            },
            method: 'POST',
            body: formData,
        });

        const responseData = await response.json();

        if (!response.ok) {
            console.error('Response error:', responseData);
            throw new Error(responseData.apiStatus.message || 'Failed to update vendor data');
        }

        console.log('Response data:', responseData);
        return responseData;
    } catch (error) {
        console.error('Error in vendorEditFunction:', error);
        throw error;
    }
};



// tamilnadu delete,

export const TNdeleteProduct = async (news_id) => {
    const token = localStorage.getItem("token");
    try {
        const Tamilnadudelete = API_EP_BOOK.TAMILNADUDELETE_API_EPP;
        const response = await fetch({
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
        });

        const data = await response.json();

        if (response.ok) {
            return { success: true, data };
        } else {
            return { success: false, message: data.message || "Failed to delete product" };
        }
    } catch (error) {
        console.error("Error deleting product:", error);
        return { success: false, message: "An error occurred while deleting the product" };
    }
};

export const Sub_cate_dropdown = async (category_id) => {
    // const token = localStorage.getItem("token");
    // console.log(token,"dropdown category");


    try {
        const responseData = await LoginAPI.dropdown(category_id)
        console.log(responseData,"dropdown category");
        
        


        if (!responseData.ok) {
            throw new Error(responseData.apiStatus.message || "Data not fetch");
        }
        console.log(responseData,"sub cate dropdown");
        

        return responseData;
    } catch (error) {
        console.error("error in productList:", error);
        throw error;
    }
}

export const Spec_dropdown = async (pageIndex, dataLength, vendorId, category_id) => {
    const token = localStorage.getItem("token");

    try {
        const response = await LoginAPI.Spec_dropdown(pageIndex, dataLength, vendorId, category_id);

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.apiStatus.message || "Data not fetch");
        }

        return responseData;
    } catch (error) {
        console.error("error in productList:", error);
        throw error;
    }
}

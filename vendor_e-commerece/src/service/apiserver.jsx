import { environment } from "../environments/enviornments";
import { API_URL } from "./api-endpoint";




const API_BASE_URL = environment.apiBaseUrl;

export const Vendorlogin = async (password,email) => {
    try {
        const response = await fetch(`${API_BASE_URL}${API_URL.adminLogin}`, {
            method: "POST",
           
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.apiStatus.message || "Login failed");
        }

        return responseData;
    } catch (error) {
        console.error("Error in adminLogin:", error);
        throw error;
    }
};

//vendor list

       // Product List

export const vendortList = async (pageIndex, dataLength) => {

    try {
        const response = await fetch(`${API_BASE_URL}${API_URL.vendorList}`, {
            method: "POST",
            body: JSON.stringify({
                pageIndex: pageIndex,
                dataLength: dataLength,
            }),
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.apiStatus.message || "Data Not Fetch");
        }

        return responseData;
    } catch (error) {
        console.error("Error in vendorLists:", error); // Updated error log to correct function name
        throw error;
    }

}
    //vendor create api

    export const vendorCreate = async (
      shopName,
      shopOwner,
      contact,
      shopType,
      userName,
      image,
      password,
      confirmPassword,
      status
     
  ) => {
      try {
          const formData = new FormData();
  
          formData.append('shopName', shopName);
          formData.append('shopOwnerFullName', shopOwner);
          formData.append('contact', contact);
          formData.append('shopType', shopType);
          formData.append('username', userName);
          formData.append('password', password);
          formData.append('confirmPassword', confirmPassword);
          formData.append('avatar', image);
          formData.append('status', status);
  
  
          const response = await fetch(`${API_BASE_URL}${API_URL.vendorCreate}`, {
              method: 'POST',
              body: formData,
          });
  
          const responseData = await response.json();
  
          if (!response.ok) {
              throw new Error(responseData.apiStatus?.message || "Failed to fetch data");
          }
  
          return responseData;
      } catch (error) {
          console.error("Error in vendorCreate:", error);
          throw error;
      }
  };


    // vendor edit

    export const vendorEditFunction = async (
        id,
        shopName,
        shopOwner,
        contact,
        shopType,
        userName,
        image,
        password,
        confirmPassword,
        currentPassword,
        status
      ) => {
        try {
          const formData = new FormData();
          formData.append('vendorId',id)
          formData.append('shopName', shopName);
          formData.append('shopOwnerFullName', shopOwner);
          formData.append('contact', contact);
          formData.append('shopType', shopType);
          formData.append('username', userName);
          formData.append('avatar', image); // Assuming image is the file object
          formData.append('password',password);
          formData.append('confirmPassword',confirmPassword) 
          formData.append('currentPassword',currentPassword)
          formData.append('status', status);
       
         
          const response = await fetch(`${API_BASE_URL}${API_URL.vendorupdate}`, {
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




    



      // vendor delete api
      export const deleteVendor = async (id) => {
        try {
          const response = await fetch(`${API_BASE_URL}/vendor/delete/${id}`, {  // Note the / before ${id}
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              // Add other headers like authorization if necessary
            },
          });
      
          const data = await response.json();
      
          if (response.ok) {
            return { success: true, data };
          } else {
            return { success: false, message: data.message || "Failed to delete vendor" };
          }
        } catch (error) {
          console.error("Error deleting vendor:", error);
          return { success: false, message: "An error occurred while deleting the vendor" };
        }
      };




      // Vendor Get and view page

export const vendorGet = async (vendorId) => {
  try {
      // Construct the correct API URL using the clientId
      const baseUrl = `${API_BASE_URL}${API_URL.vendorGet}${vendorId}`;

      const response = await fetch(baseUrl, {
          method: "GET",
      });

      if (!response.ok) {
          const responseData = await response.json();
          throw new Error(responseData.apiStatus?.message || "Data not fetched");
      }

      // Parse the JSON response only if the request was successful
      const responseData = await response.json();
      return responseData;
  } catch (error) {
      console.error("Error in clientGet:", error);
      throw error;
  }
};




//order  list
  export const orderLists = async (pageIndex, dataLength,vendorId) => {
   
  try {
      const response = await fetch(`${API_BASE_URL}${API_URL.orderLists}`, {
          method: "POST",
          body: JSON.stringify({
              pageIndex: pageIndex,
              dataLength: dataLength,
              vendor_id:vendorId,
              
          }),
          
      });
      const responseData = await response.json();

      if (!response.ok) {
          throw new Error(responseData.apiStatus.message || "Data Not Fetch");
      }

      return responseData;
  } catch (error) {
      console.error("Error in orderLists:", error); // Updated error log to correct function name
      throw error;
  }
};
 

// vendor view 
export const vendorOrderView = async (vendorId) => {
  const baseUrl = `${API_BASE_URL}${API_URL.orderGet}${vendorId}`;
  try {
      const response = await fetch(baseUrl, {
          method: "GET",
          
      });

      const responseData = await response.json();

      if (!response.ok) {
          throw new Error(responseData.apiStatus.message || "Data Not Get");
      }

      return responseData;
  } catch (error) {
      console.error("Error in orderview:", error); // Updated error log to correct function name
      throw error;
  }
};


export const vendorOrderStatus = async (id,selectedStatus) => {
  try {
     
    const response = await fetch(`${API_BASE_URL}${API_URL.VendorStatusupdate}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
    },
      body:JSON.stringify({
        id: id,
        status: selectedStatus,
    }),
});
    const responseData = await response.json();

    if (!response.ok) {

      throw new Error(responseData.apiStatus.message || 'Failed to update order data');
    }

   
    return responseData;
  } catch (error) {
    console.error('Error in vendorOrderStatus:', error);
    throw error;
  }
};

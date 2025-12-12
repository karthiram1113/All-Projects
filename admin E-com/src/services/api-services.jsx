import { useEffect, useState } from "react";
import Url, { API_URL } from '../services/api-endpoints'
import { environment } from "../environments/enviornments";


const API_BASE_URL = environment.apiBaseUrl;

// const API_BASE_URL = process.env.API_BASE_URL ||"http://localhost/Hermon_Ecom/api/" ; 
// const API_BASE_URL = process.env.API_BASE_URL;
// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;



export const adminLogin = async (email, password) => {
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

// export const adminLogin = async (email, password) => {
//     const response = await fetch(`${API_BASE_URL}login/admin`, {
//         method: "POST",
//         body: JSON.stringify({ userName: email, password }),
//     });

//     if (!response.ok) throw new Error((await response.json()).apiStatus.message || "Login failed");

//     return response.json();
// };


// Product List

export const productLists = async (pageIndex, dataLength) => {

    try {
        const response = await fetch(`${API_BASE_URL}${API_URL.adminProductList}`, {
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
        console.error("Error in productLists:", error); // Updated error log to correct function name
        throw error;
    }
};

// Order List

export const orderLists = async (pageIndex, dataLength) => {
   
    try {
        const response = await fetch(`${API_BASE_URL}${API_URL.adminOrderList}`, {
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
        console.error("Error in productLists:", error); // Updated error log to correct function name
        throw error;
    }
};

// Vendor List

export const vendorLists = async (pageIndex, dataLength) => {
   
    try {
        const response = await fetch(`${API_BASE_URL}${API_URL.adminVendorList}`, {
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
        console.error("Error in productLists:", error); // Updated error log to correct function name
        throw error;
    }
};

// Client List

export const clientLists = async (pageIndex, dataLength) => {
   
    try {
        const response = await fetch(`${API_BASE_URL}${API_URL.adminClientList}`, {
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
        console.error("Error in productLists:", error); // Updated error log to correct function name
        throw error;
    }
};


// Client Get Method

export const clientGet = async (clientId) => {
    try {
        // Construct the correct API URL using the clientId
        const baseUrl = `${API_BASE_URL}${API_URL.clientGet}${clientId}`;

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

// Client Edit

export const clientEditFunction = async (
    clientId,
    firstName,
    middleName, 
    lastName,
    gender,
    contact,
    address,
    email,
    password,
    confirmPassword,
    avatar
) => {
try {
  const formData = new FormData();

  formData.append('clientid', clientId);
  formData.append('firstName', firstName);
  formData.append('middleName', middleName);
  formData.append('lastName', lastName);
  formData.append('gender', gender);
  formData.append('contact', contact);
  formData.append('address', address);
  formData.append('email', email);
  formData.append('password', password);
  formData.append('confirmPassword', confirmPassword);
//   formData.append('avatar', avatar);




  if (avatar) {
    formData.append('avatar', avatar);
  }

 

  const response = await fetch(`${API_BASE_URL}${API_URL.adminClientEdit}`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.apiStatus?.message || 'Data Not Fetch');
  }

  const responseData = await response.json();
  return responseData;
} catch (error) {
  console.error('Error in vendorEditFunction:', error);
  throw error;
}
};


// Client Delete

export const clientDelete = async (deleteId) => {
    const url = `${API_BASE_URL}${API_URL.adminClientDelete}${deleteId}`;
    try {
        const response = await fetch(url, { method: 'DELETE' });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const errorMessage = errorData.apiStatus?.message || 'Data Not Fetch';
            throw new Error(errorMessage);
        }
        return await response.json();
    } catch (error) {
        console.error('Error in shopTypeDelete:', error);
        throw error;
    }
};

// Vendor Get Method

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


// Vendor Edit

export const vendorEditFunction = async (
    vendorId,
    shopOwnerFullName,
    shopName,
    contact,
    shopType,
    userName,
    password,
    confirmPassword,
    avatar,
    status
  ) => {
    try {
      const formData = new FormData();
  
      formData.append('vendorId', vendorId);
      formData.append('shopOwnerFullName', shopOwnerFullName);
      formData.append('shopName', shopName);
      formData.append('contact', contact);
      formData.append('shopType', shopType);
      formData.append('username', userName);
      formData.append('password', password);
      formData.append('confirmPassword', confirmPassword);
  
      if (avatar) {
        formData.append('avatar', avatar);
      }
  
      formData.append('status', status);
  
      const response = await fetch(`${API_BASE_URL}${API_URL.adminVendorEdit}`, {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.apiStatus?.message || 'Data Not Fetch');
      }
  
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error in vendorEditFunction:', error);
      throw error;
    }
  };
  
// Vendor Delete


export const vendorDelete = async (deleteId) => {
    const url = `${API_BASE_URL}${API_URL.adminVendorDelete}${deleteId}`;
    try {
        const response = await fetch(url, { method: 'DELETE' });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const errorMessage = errorData.apiStatus?.message || 'Data Not Fetch';
            throw new Error(errorMessage);
        }
        return await response.json();
    } catch (error) {
        console.error('Error in shopTypeDelete:', error);
        throw error;
    }
};


// Shop Type List

export const shopTypeLists = async (pageIndex, dataLength) => {
   
    try {
        const response = await fetch(`${API_BASE_URL}${API_URL.adminShoptypeList}`, {
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
        console.error("Error in productLists:", error); // Updated error log to correct function name
        throw error;
    }
};



//   Shoptype Create

export const shopTypeCreate = async (shopName,status) => {
   
    try {
        const response = await fetch(`${API_BASE_URL}${API_URL.adminShoptypeCreate}`, {
            method: "POST",
            body: JSON.stringify({
                shopName: shopName,
                status: status,
            }),
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.apiStatus.message || "Data Not Fetch");
        }

        return responseData;
    } catch (error) {
        console.error("Error in productLists:", error); // Updated error log to correct function name
        throw error;
    }
};

// Shoptype Edit

export const shopEditFunction = async (shopTypeId,shopName,status) => {
    const baseUrl = `${API_BASE_URL}${API_URL.adminShoptypeEdit}`;
    try {
        const response = await fetch(baseUrl, {
            method: "PUT",
            body: JSON.stringify({
                shopId:shopTypeId,
                shopName: shopName,
                status: status,
            }),
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.apiStatus.message || "Data Not Edit");
        }

        return responseData;
    } catch (error) {
        console.error("Error in productLists:", error); // Updated error log to correct function name
        throw error;
    }
};


// Shoptype Get

export const shopTypeGet = async (shopTypeId) => {
    const baseUrl = `${API_BASE_URL}${API_URL.adminShoptypeGet}${shopTypeId}`;
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
        console.error("Error in productLists:", error); // Updated error log to correct function name
        throw error;
    }
};



// Shoptype Delete

// export const shopTypeDelete = async (deleteId) => {
//     const baseUrl = `${API_BASE_URL}shoptype/delete/${deleteId}`;
//     try {
//         const response = await fetch(baseUrl, {
//             method: "DELETE",
//         });

//         if (!response.ok) {
//             // Attempt to parse error details from the response
//             let errorMessage = 'Data Not Fetch';
//             try {
//                 const responseData = await response.json();
//                 errorMessage = responseData.apiStatus?.message || errorMessage;
//             } catch (jsonError) {
//                 console.error("Failed to parse error response:", jsonError);
//             }

//             throw new Error(errorMessage);
//         }

//         return await response.json();
//     } catch (error) {
//         console.error("Error in shopTypeDelete:", error);
//         throw error;
//     }
// };


export const shopTypeDelete = async (deleteId) => {
    const url = `${API_BASE_URL}${API_URL.adminShoptypeDelete}${deleteId}`;
    try {
        const response = await fetch(url, { method: 'DELETE' });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const errorMessage = errorData.apiStatus?.message || 'Data Not Fetch';
            throw new Error(errorMessage);
        }
        return await response.json();
    } catch (error) {
        console.error('Error in shopTypeDelete:', error);
        throw error;
    }
};

// Admin UserList

export const adminUserList = async (pageIndex, dataLength) => {

    try {
        const response = await fetch(`${API_BASE_URL}${API_URL.adminUserList}`, {
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
        console.error("Error in productLists:", error); // Updated error log to correct function name
        throw error;
    }
};

// Admin User Create

export const userCreateFunction = async (
    firstName,
    lastName,
    userName,
    loginType,
    password,
    avatar
) => {
try {
  const formData = new FormData();

  formData.append('firstName', firstName);
  formData.append('lastName', lastName);
  formData.append('email', userName);
  formData.append('password', password);
  formData.append('loginType', loginType);
 

  if (avatar) {
    formData.append('avatar', avatar);
  }

  const response = await fetch(`${API_BASE_URL}${API_URL.adminUserCreate}`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.apiStatus?.message || 'Data Not Fetch');
  }

  const responseData = await response.json();
  return responseData;
} catch (error) {
  console.error('Error in vendorEditFunction:', error);
  throw error;
}
};


// Admin User Edit

export const userEditFunction = async (

    firstName,
    lastName,
    userName,
 
    password,
    avatar,
    loginType,
    userId,
) => {
try {
  const formData = new FormData();
formData.append('id',userId)
  formData.append('firstName', firstName);
  formData.append('lastName', lastName);
  formData.append('email', userName);
  formData.append('password', password);
   
  if (avatar) {
    formData.append('avatar', avatar);
  }

  formData.append('logintype', loginType);

  const response = await fetch(`${API_BASE_URL}${API_URL.adminUserEdit}`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.apiStatus?.message || 'Data Not Fetch');
  }

  const responseData = await response.json();
  return responseData;
} catch (error) {
  console.error('Error in vendorEditFunction:', error);
  throw error;
}
};


// export const userSaveFunction = async (
//     userId,
//     firstName,
//     lastName,
//     userName,
//     loginType,
//     password,
//     avatar,
//     isEdit = false // Use this flag to determine if it's an edit or create operation
//   ) => {
//     try {
//       const formData = new FormData();
//       formData.append('firstName', firstName);
//       formData.append('lastName', lastName);
//       formData.append('username', userName);
//       formData.append('password', password);
//       formData.append('loginType', loginType);
  
//       if (avatar) {
//         formData.append('avatar', avatar);
//       }
  
//       // If editing, include the userId
//       const url = isEdit
//         ? `${API_BASE_URL}${API_URL.adminUserEdit}`
//         : `${API_BASE_URL}${API_URL.adminUserCreate}`;
  
//       if (isEdit) {
//         formData.append('id', userId);
//       }
  
//       const response = await fetch(url, {
//         method: 'POST',
//         body: formData,
//       });
  
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.apiStatus?.message || 'Data Not Fetch');
//       }
  
//       const responseData = await response.json();
//       return responseData;
//     } catch (error) {
//       console.error('Error in userSaveFunction:', error);
//       throw error;
//     }
//   };
  

// User List Get

export const userGet = async (userId) => {
    const baseUrl = `${API_BASE_URL}${API_URL.adminUserGet}${userId}`;
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
        console.error("Error in productLists:", error); // Updated error log to correct function name
        throw error;
    }
};

// User Delete Method



export const userDelete = async (deleteId) => {
    const url = `${API_BASE_URL}${API_URL.adminUserDelete}${deleteId}`;
    try {
        const response = await fetch(url, { method: 'DELETE' });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const errorMessage = errorData.apiStatus?.message || 'Data Not Fetch';
            throw new Error(errorMessage);
        }
        return await response.json();
    } catch (error) {
        console.error('Error in shopTypeDelete:', error);
        throw error;
    }
};

// Settings Update

export const settingEditFunction = async (

    systemName,
    shortName,
    systemLogo,
    websiteCover,
  
) => {
try {
  const formData = new FormData();

  formData.append('name', systemName);
  formData.append(' short_name',  shortName);
  formData.append('logo', systemLogo);
  formData.append('cover', websiteCover);
   

  const response = await fetch(`${API_BASE_URL}${API_URL.settingInfoEdit}`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.apiStatus?.message || 'Data Not Fetch');
  }

  const responseData = await response.json();
  return responseData;
} catch (error) {
  console.error('Error in vendorEditFunction:', error);
  throw error;
}
};

// Systeminfo List


export const systeminfoLists = async () => {

    try {
        const response = await fetch(`${API_BASE_URL}${API_URL.settingInfoList}`, {
            method: "POST",
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.apiStatus.message || "Data Not Fetch");
        }

        return responseData;
    } catch (error) {
        console.error("Error in productLists:", error); // Updated error log to correct function name
        throw error;
    }
};

// View-Pages Get Api

// Product Get Api

export const adminProductView = async (productId) => {
    const baseUrl = `${API_BASE_URL}${API_URL.adminProductViews}${productId}`;
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
        console.error("Error in productLists:", error); // Updated error log to correct function name
        throw error;
    }
};

// Order Get Api

export const adminOrderView = async (orderId) => {
    const baseUrl = `${API_BASE_URL}${API_URL.adminOrderViews}${orderId}`;
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
        console.error("Error in productLists:", error); // Updated error log to correct function name
        throw error;
    }
};

// admin reports list

export const AdminReports = async (vendorId,month) => {

    try {
        const response = await fetch(`${API_BASE_URL}${API_URL.adminReports}`, {
            method: "POST",
            headers:{
                "content-type" : "application/json",
                // "Authorization" : `Bearer ${token}`
            },
            body: JSON.stringify(
                {
                    month: month,
                    vendorId:1
                }
            )
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.apiStatus.message || "Data Not Fetch");
        }

        return responseData;
    } catch (error) {
        console.error("Error in reportsList:", error);
        throw error;
    }
};
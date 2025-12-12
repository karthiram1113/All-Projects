import { API_URL } from "../services/endpoint";
import { environment } from "../environment/environment";
import { toast } from "react-toastify";

const API_BASE_URL = environment.apiBaseUrl;

//category list

export const categorylist = async (pageIndex, dataLength) => {

    try {
        const response = await fetch(`${API_BASE_URL}${API_URL.CategoryList}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}` // Include the token in the Authorization header
            },
            body: JSON.stringify({
                pageIndex: pageIndex,
                dataLength: dataLength,
            }),
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.apiStatus.message || "Data not Fetch");
        }

        return responseData;
    } catch (error) {
        console.error("error in categoryList:", error);
        throw error;
    }
}

//Client Login,

export const Clientlogin = async (email, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}${API_URL.ClientLogin}`, {
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


// SignUp

export const signup = async (
    first_Name,
    last_Name,
    email,
    password,
    confirmPassword
) => {
    try {
        const formData = new FormData();
        formData.append('firstName', first_Name);
        formData.append('lastName', last_Name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('confirmPassword', confirmPassword);

        const response = await fetch(`${API_BASE_URL}${API_URL.ClientSignUp}`, {
            method: 'POST',
            body: formData,
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.apiStatus?.message || 'Failed to SignUp.');
        }

        return responseData;
    } catch (error) {
        console.error("Error the SignUp:", error);
        throw error;
    }
}

// otp

export const otp = async (
    first_Name,
    last_Name,
    email,
    password,
    confirmPassword,
    OTP
) => {
    try {
        const formData = new FormData();
        formData.append('firstName', first_Name);
        formData.append('lastName', last_Name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('confirmPassword', confirmPassword);
        formData.append('otp', OTP);


        const response = await fetch(`${API_BASE_URL}${API_URL.ClientSignUp}`, {
            method: 'POST',
            body: formData,
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.apiStatus?.message || 'Failed to SignUp.');
        }

        return responseData;
    } catch (error) {
        console.error("Error the SignUp:", error);
        throw error;
    }
}


// Edit-Profile,

export const clientEditFunction = async (
    clientId,
    firstName,
    // middleName,
    lastName,
    gender,
    contactNo,
    address,
    email,
    password,
    confirmPassword,
    imageLogo,
    currentPassword
) => {
    try {
        const formData = new FormData();
        formData.append('clientid', clientId);
        formData.append('firstName', firstName);
        // formData.append('middleName',middleName);
        formData.append('lastName', lastName);
        formData.append('gender', gender);
        formData.append('contact', contactNo);
        formData.append('address', address);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('confirmPassword', confirmPassword);
        formData.append('currentPassword', currentPassword);
        formData.append('avatar', imageLogo);

        const response = await fetch(`${API_BASE_URL}${API_URL.ClientEditprofile}`, {
            method: 'POST',
            body: formData,
        });

        const responseData = await response.json();

        if (!response.ok) {
            console.error('Response error:', responseData);
            throw new Error(responseData.apiStatus.message || 'failed to update client data');
        }

        console.log('Response data:', responseData);
        return responseData;
    } catch (error) {
        console.error('Error in clientEditFunction:', error);
    }
};

// Product-List

export const clientProductList = async (pageIndex, dataLength) => {

    try {
        const response = await fetch(`${API_BASE_URL}${API_URL.ProductList}`, {
            method: "POST",

            body: JSON.stringify({
                pageIndex: pageIndex,
                dataLength: dataLength,

            }),
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.apiStatus.message || "Data is Not Fetch");
        }

        return responseData;
    } catch (error) {
        console.error("error in ProductList:", error);
        throw error;
    }
}

// Add to card,
export const AddToCardMain = async (client_ids, product_name, quantity) => {
    try {
        const response = await fetch(`${API_BASE_URL}${API_URL.AddToCardButton}`, {
            method: "POST",

            body: JSON.stringify({
                client_id: client_ids,
                products: product_name,
                quantity: quantity
            }),
        });
        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.apiStatus?.message || "Failed to fetch data");
        }
        return responseData;
    } catch (error) {
        console.error("Error in AddToCard:", error);
        throw error;  // Throw the error to be caught in the calling function
    }
};


// categorySubList,

export const CategorySublist = async (pageIndex, dataLength) => {
    const categoryIds = localStorage.getItem("categoryId")
    try {
        const response = await fetch(`${API_BASE_URL}${API_URL.CategorySubList}`, {
            method: "POST",

            body: JSON.stringify({
                pageIndex: pageIndex,
                dataLength: dataLength,
                category_id: categoryIds,
            }),
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.apiStatus.message || "Data not Fetch");
        }

        return responseData;
    } catch (error) {
        console.error("error in categorySubList:", error);
        throw error;
    }
}

// add-to-card List,

export const addToCardList = async (client_id) => {
    try {
        const response = await fetch(`${API_BASE_URL}${API_URL.AddToCardList}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                {
                    client_id
                }
            ),
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.apiStatus.message || "Data not fetched");
        }

        return responseData;
    } catch (error) {
        console.error("Error in AddToCardList:", error);
        throw error;
    }
};


// add-to-card delete,

export const deleteProduct = async (id) => {

    try {
        const response = await fetch(`${API_BASE_URL}${API_URL.AddToCardDelete}/${id}`, {
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
            return { success: false, message: data.message || "Failed to delete product" };
        }
    } catch (error) {
        console.error("Error deleting product:", error);
        return { success: false, message: "An error occurred while deleting the product" };
    }
};



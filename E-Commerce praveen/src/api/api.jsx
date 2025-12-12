export const environment ={
baseURL: "http://192.168.0.103/Hermon_Ecom/api/"
}
const baseURL = "http://192.168.0.103/Hermon_Ecom/api/";

const API = async (requestURL, requestAPIData) => {
  let APIENDPOINT = baseURL + requestURL.url;

  const headersData = {};

  if (requestURL.authorization) {
    headersData["Authorization"] = "Bearer " + localStorage.getItem("token");
  }

  const requestAPIHeader = {
    method: requestURL.method,
    headers: headersData,
  };

  if (requestURL.method !== "GET" && requestURL.method !== "DELETE") {
  if (requestAPIData.bodyData instanceof FormData) {
    requestAPIHeader.body = requestAPIData.bodyData;
  } else {
    // headersData["Content-Type"] = "application/json";
    requestAPIHeader.body = JSON.stringify(requestAPIData.bodyData);
  }
}


  try {
    const response = await fetch(APIENDPOINT, requestAPIHeader);
    if (requestURL.method === "GET" && requestURL.url.includes("export")) {
      return await response.blob();
    } else {
      return await response.json();
    }
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export default API;



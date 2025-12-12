// export const baseURL = "http://localhost/smr_gold_loan/api/";
// export const baseURL = "https://e2afcb455f70.ngrok-free.app/smr_gold_loan/api/";
export const baseURL = "https://smrgoldloanfinance.com/api/"
// export const baseURL = "http://192.168.0.105/smr_gold_loan/api/";

const API = async (requestURL, requestAPIData) => {
  const APIENDPOINT = baseURL + requestURL.url;

  const headersData = {};

  if (requestURL.authorization) {
    const token = localStorage.getItem("token") || "";
    headersData["Authorization"] = "Bearer " + token;
  }

  const requestAPIHeader = {
    method: requestURL.method,
    headers: headersData,
  };

  if (requestURL.method !== "GET" && requestURL.method !== "DELETE") {
    if (requestAPIData.bodyData instanceof FormData) {
      requestAPIHeader.body = requestAPIData.bodyData;
    } else {
      headersData["Content-Type"] = "application/json";
      requestAPIHeader.body = JSON.stringify(requestAPIData.bodyData);
    }
  }

  try {
    const response = await fetch(APIENDPOINT, requestAPIHeader);
    const contentType = response.headers.get("Content-Type");

    if (
      contentType &&
      contentType.includes(
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      )
    ) {
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

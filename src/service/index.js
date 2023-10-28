import axios from "axios";
export const commonService = {
  withToken,
  withOutToken,
  withTokenPut,
  handleResponse,
  withTokenAndFormData,
  withTokenAndFormDataDD,
  getDataWithToken,
  getDataWithoutToken,
  fakeApiCall,
};

// uncomment in production

// for using json file use this
let backendUrl = "http://localhost:8080";

//-- It's common function for using the token
function withToken(apiName, data) {
  let tokenObj = sessionStorage.getItem("token");
  return axios({
    method: "POST",
    url: `${backendUrl + apiName}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenObj}`,
    },
    data: data,
  }).then((handleResponse) => {
    return handleResponse;
  });
}

//-- It's common function for using the token with Put method
function withTokenPut(apiName, data) {
  return axios({
    method: "PUT",
    url: `${backendUrl + apiName}`,
    headers: { "Content-Type": "application/json" },
    data: data,
  }).then((handleResponse) => {
    return handleResponse;
  });
}

//-- It's common function for using without token
function withOutToken(apiName, data) {
  return axios({
    method: "POST",
    url: `${backendUrl + apiName}`,
    data: data,
  }).then(handleResponse);
}

//-- It's common function for using with form data
function withTokenAndFormData(apiName, data) {
  let tokenObj = JSON.parse(sessionStorage.getItem("token"));
  return axios({
    method: "POST",
    url: `${backendUrl + apiName}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${tokenObj}`,
    },
    data: data,
  }).then((handleResponse) => {
    return handleResponse;
  });
}

//-- It's common function for using with form data
function withTokenAndFormDataDD(apiName, data) {
  let tokenObj = JSON.parse(sessionStorage.getItem("token"));
  return axios({
    method: "POST",
    url: `${apiName}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${tokenObj}`,
    },
    data: data,
  }).then((handleResponse) => {
    return handleResponse;
  });
}

//-- get data
function getDataWithToken(apiName, userData) {
  let token = sessionStorage.getItem("token");
  return axios({
    method: "GET",
    url: `${backendUrl + apiName}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: userData,
  }).then((handleResponse) => {
    return handleResponse;
  });
}

//-- get data
function getDataWithoutToken(apiName) {
  try {
    let url = backendUrl;
    if (apiName === "/json/products.json") {
      url = "";
    }
    return axios({
      method: "GET",
      url: `${url + apiName}`,
      headers: { "Content-Type": "application/json" },
    }).then((handleResponse) => {
      return handleResponse;
    });
  } catch (err) {
    console.log("err -------", err);
  }
}

//-- get data
function fakeApiCall(apiName, data, name) {
  try {
    return axios({
      method: "GET",
      url: `${backendUrl + apiName}`,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => {
      if (name === "createUser") {
        res?.data?.user.push(data);
        return res;
      }
    });
  } catch (err) {
    console.log("err -------", err);
  }
}

function handleResponse(response) {
  if (response.status === 200 || response.status === 201) {
    return response;
  } else {
    const error = response;
    return Promise.reject(error);
  }
}

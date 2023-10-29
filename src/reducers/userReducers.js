import { userConstant } from "../constants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstant.USER_LOGIN_REQUEST:
      return { loading: true };

    case userConstant.USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case userConstant.USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };

    case userConstant.USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstant.USER_REGISTER_REQUEST:
      return { loading: true };

    case userConstant.USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case userConstant.USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };

    case userConstant.USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

export const userDetailsReducer = (state = { userInfo: {} }, action) => {
  switch (action.type) {
    case userConstant.USER_DETAILS_REQUEST:
      return { ...state, loading: true };

    case userConstant.USER_DETAILS_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case userConstant.USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    case userConstant.USER_DETAILS_RESET:
      return { userInfo: {} };

    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstant.USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };

    case userConstant.USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };

    case userConstant.USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const addSubscriptionReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstant.ADD_SUBSCRIPTION_REQUEST:
      return { loading: true };

    case userConstant.ADD_SUBSCRIPTION_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };

    case userConstant.ADD_SUBSCRIPTION_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const getProductDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case userConstant.GET_PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true };

    case userConstant.GET_PRODUCT_DETAILS_SUCCESS:
      return { loading: false, data: action.payload };

    case userConstant.GET_PRODUCT_DETAILS_FAILURE:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const createUserReducer = (state = { userInfo: {} }, action) => {
  switch (action.type) {
    case userConstant.CREATE_PROFILE_REQUEST:
      return { ...state, loading: true };

    case userConstant.CREATE_PROFILE_SUCCESS:
      return { loading: false, isProfileCreated: true };

    case userConstant.CREATE_PROFILE_FAIL:
      return { loading: false, isProfileCreated: false, error: action.payload };

    default:
      return state;
  }
};

export const getStatusReducer = (state = { userInfo: {} }, action) => {
  switch (action.type) {
    case userConstant.GET_STATUS_REQUEST:
      return { ...state, loading: true };

    case userConstant.GET_STATUS_SUCCESS:
      return { loading: false, data: action.payload };

    case userConstant.GET_STATUS_FAILURE:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

import axios from "axios";
import { userConstant, apiConstant } from "../constants";
import { commonService } from "../service";
import { alertActions } from "./alertAction";

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: userConstant.USER_LOGIN_REQUEST });
  commonService
    .getDataWithoutToken(apiConstant.LOGIN, {
      username: email,
      password: password,
    })
    .then(
      (doc) => {
        localStorage.setItem("userInfo", JSON.stringify(doc));
        dispatch({ type: userConstant.USER_LOGIN_SUCCESS, payload: doc });
      },
      (error) => {
        dispatch({ type: userConstant.USER_LOGIN_FAIL, payload: error });
        dispatch(alertActions.error("Error while login"));
      }
    );
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userId");
  dispatch({ type: userConstant.USER_LOGOUT });
  dispatch({ type: userConstant.USER_DETAILS_RESET });
};

export const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: userConstant.USER_REGISTER_REQUEST });
  commonService
    .getDataWithoutToken(apiConstant.REGISTER, {
      name: name,
      email: email,
      password: password,
    })
    .then(
      (doc) => {
        localStorage.setItem("userInfo", JSON.stringify(doc));
        dispatch({ type: userConstant.USER_REGISTER_SUCCESS, payload: doc });
        dispatch({ type: userConstant.USER_LOGIN_SUCCESS, payload: doc });
        localStorage.setItem("userInfo", JSON.stringify(doc));
      },
      (error) => {
        dispatch({ type: userConstant.USER_REGISTER_FAIL, payload: error });
        dispatch(alertActions.error("Error while registering"));
      }
    );
};

export const getUserDetails = (userId) => async (dispatch, getState) => {
  dispatch({ type: userConstant.USER_DETAILS_REQUEST });
  // `/user/${userId}/`
  commonService.getDataWithoutToken(`${apiConstant.GET_USER}/${userId}`).then(
    (doc) => {
      if (doc?.data?.userId) {
        dispatch({
          type: userConstant.USER_DETAILS_SUCCESS,
          payload: doc?.data,
        });
      }
    },
    (error) => {
      dispatch(alertActions.error("Network Error ..."));
    }
  );
};

export const createUserProfile = (user) => async (dispatch, getState) => {
  dispatch({ type: userConstant.CREATE_PROFILE_REQUEST });
  // /user/create
  // call withOutToken for Post method
  commonService
    .withOutToken(apiConstant.CREATE_PROFILE, user, "createUser")
    .then(
      (doc) => {
        localStorage.setItem("userId", doc?.data?.userId);
        dispatch({ type: userConstant.CREATE_PROFILE_SUCCESS, payload: doc });
        dispatch(alertActions.success("Profile Created Successfully ..."));
      },
      (error) => {
        dispatch({ type: userConstant.CREATE_PROFILE_FAIL, payload: user });
        dispatch(alertActions.error("Error while profile creation"));
      }
    );
};

export const updateUserProfile =
  (userId, user) => async (dispatch, getState) => {
    dispatch({ type: userConstant.USER_UPDATE_PROFILE_REQUEST });

    commonService
      .withTokenPut(`${apiConstant.UPDATE_PROFILE}/${userId}`, user)
      .then(
        (doc) => {
          dispatch({
            type: userConstant.USER_UPDATE_PROFILE_SUCCESS,
            payload: user,
          });
          dispatch(
            alertActions.success(
              "Rquest Submitted. Profile verification is under progress ..."
            )
          );
        },
        (error) => {
          dispatch({
            type: userConstant.USER_UPDATE_PROFILE_FAIL,
            payload: error,
          });
          dispatch(alertActions.success("Updated Successfully ..."));
        }
      );
  };

export const addSubscription =
  (userId, productId) => async (dispatch, getState) => {
    dispatch({ type: userConstant.ADD_SUBSCRIPTION_REQUEST });
    const payload = { productId: productId };
    commonService
      .withTokenPut(
        `${apiConstant.ADD_SUBSCRIPTION}/${userId}/subscriptions`,
        payload
      )
      .then(
        (doc) => {
          dispatch({
            type: userConstant.ADD_SUBSCRIPTION_SUCCESS,
            payload: payload,
          });
          dispatch(alertActions.success("Verification under progress ..."));
        },
        (error) => {
          dispatch({
            type: userConstant.ADD_SUBSCRIPTION_FAILURE,
            payload: error,
          });
          dispatch(alertActions.success("Verification failed..."));
        }
      );
  };

export const getProduct = (productId) => async (dispatch, getState) => {
  dispatch({ type: userConstant.GET_PRODUCT_DETAILS_REQUEST });
  // `/product/${productId}/
  commonService.getDataWithoutToken(apiConstant.GET_PRODUCT).then(
    (doc) => {
      let products =
        doc?.data?.products && doc?.data?.products.length > 0
          ? doc?.data?.products
          : [];
      dispatch({
        type: userConstant.GET_PRODUCT_DETAILS_SUCCESS,
        payload: products.filter((x) => x?.id === productId),
      });
    },
    (error) => {
      dispatch({
        type: userConstant.GET_PRODUCT_DETAILS_FAILURE,
        payload: error,
      });
      dispatch(alertActions.error("Error while getting Product"));
    }
  );
};

export const getUserStatus = (userId) => async (dispatch, getState) => {
  dispatch({ type: userConstant.GET_STATUS_REQUEST });
  // `/getStatus/${userId}/
  commonService.getDataWithoutToken(`${apiConstant.GET_STATUS}/${userId}`).then(
    (doc) => {
      let data = doc?.data;
      dispatch({ type: userConstant.GET_STATUS_SUCCESS, payload: data });
    },
    (error) => {
      dispatch({ type: userConstant.GET_STATUS_FAILURE, payload: error });
      dispatch(alertActions.error("Error while getting Product"));
    }
  );
};

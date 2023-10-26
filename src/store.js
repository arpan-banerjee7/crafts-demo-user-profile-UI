import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducers";

const initialState = {
  //userLogin: { userInfo: userInfoFromStorage },
  userLogin: {
    error: false,
    loading: false,
    userInfo: {
      userId: "232414",
      name: "Test",
      email: "Test@email.com",
    },
  },
  userDetails: {
    userInfo: {
      id: "",
      companyName: "",
      legalName: "",
      consolidatedStatus: "",
      businessAddress: {
        line1: "",
        line2: "",
        city: "",
        state: "",
        zip: "",
        country: "",
      },
      legalAddress: {
        line1: "",
        line2: "",
        city: "",
        state: "",
        zip: "",
        country: "",
      },
      taxIdentifiers: {
        pan: "",
        ein: "",
      },
      email: "",
      website: "",
      subscriptions: [],
    },
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

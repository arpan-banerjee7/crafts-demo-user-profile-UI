import { combineReducers } from 'redux';
import { alert } from './alertReducer';
import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    getProductDetailsReducer,
    createUserReducer,
    getStatusReducer
} from "./userReducers";

const reducer = combineReducers({
    alert,
    userLogin: userLoginReducer,
    userDetails: userDetailsReducer,
    userRegister: userRegisterReducer,
    userUpdateProfile: userUpdateProfileReducer,
    getProductDetails: getProductDetailsReducer,
    createUser : createUserReducer,
    getStatus : getStatusReducer
});

export default reducer;

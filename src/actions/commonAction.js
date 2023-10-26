export function request(REQUEST, requestAction) { 
    return { 
        type: REQUEST, 
        payload:requestAction 
    } 
}

export function success(SUCCESS, successAction) {   
    return { 
        type: SUCCESS, 
        payload:successAction 
    } 
}

export function failure(FAILURE, errorAction) { 
    return { 
        type: FAILURE, 
        payload:errorAction 
    } 
}
import {backendLookup} from './baseLookup'

export const apiLogin = (callback, data) => {
    const endpoint = '/users/login/';
    //method, endpoint, callback, data, media
    backendLookup('POST', endpoint, callback, data);
}

export const apiLogout = (callback) => {
    const endpoint = '/users/logout/';
    //method, endpoint, callback, data, media
    backendLookup('GET', endpoint, callback);
}

export const ApiLoggedUser = (callback) => {
    const endpoint = '/users/get_current_user/';
    //method, endpoint, callback, data, media
    backendLookup('GET', endpoint, callback);
}

export const apiGetUsers = (callback) => {
    const endpoint = '/users/';
    //method, endpoint, callback, data, media
    backendLookup('GET', endpoint, callback);    
}

export const ApiRegisterUser = (callback, data) => {
    const endpoint = '/users/';
    //method, endpoint, callback, data, media
    backendLookup('POST', endpoint, callback, data);
}

// Request Password Reset Link
export const ApiResetPasswordReq = (callback, data) => {
    const endpoint = '/users/password_req/';
    //method, endpoint, callback, data, media
    backendLookup('POST', endpoint, callback, data);
}

// Reset Password
export const ApiResetPassword = (user, token, callback, data) => {
    const endpoint = '/users/change_password_mail/' + user + '/' + token + '/';
    //method, endpoint, callback, data, media
    backendLookup('POST', endpoint, callback, data);
}

// Send Activation Link
export const ApiSendActivationLink = (callback, data) => {
    const endpoint = '/users/send_activate_link/';
    //method, endpoint, callback, data, media
    backendLookup('POST', endpoint, callback, data);
}

// Activate Account
export const ApiActivate = (token, callback, data) => {
    const endpoint = '/users/activate/' + token + '/';
    //method, endpoint, callback, data, media
    backendLookup('POST', endpoint, callback, data);
}

// Update User
export const ApiUpdateUser = (id, callback, data) => {
    const endpoint = '/users/' + id + "/";
    //method, endpoint, callback, data, media
    backendLookup('PATCH', endpoint, callback, data);
}

export const ApiUpdatePassword = (callback, data) => {
    const endpoint = '/users/change_password/';
    //method, endpoint, callback, data, media
    backendLookup('POST', endpoint, callback, data);
}
// Delete User
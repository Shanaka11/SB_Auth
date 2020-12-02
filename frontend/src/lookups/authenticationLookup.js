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
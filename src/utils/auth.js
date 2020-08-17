import cookie from 'js-cookie';

const adminToKen = "admin_token";
const usernameKey = "user_name";

export function getToken(){
    return cookie.get(adminToKen);
}

export function setToken(toKen){
    return cookie.set(adminToKen, toKen);
}

export function removeToken(){
    return cookie.remove(adminToKen);
}

export function setUserName(value){
    return cookie.set(usernameKey, value);
}

export function getUserName(){
    return cookie.get(usernameKey);
}

export function removeUserName(){
    return cookie.remove(usernameKey);
}

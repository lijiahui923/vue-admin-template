import service from '@/utils/request';
/**
 * 获取验证码
 */
export function GetSms(data) {
    return service.request({
        method: 'post',
        url: '/getSms/',
        data
    });
}
/**
 * 登录
 */
export function Login(data) {
    return service.request({
        method: 'post',
        url: '/login/',
        data
    });
}

/**
 * 退出
 */
export function Logout(data = {}) {
    return service.request({
        method: 'post',
        url: '/logout/',
        data
    });
}

// 获取用户权限
export function GetUserRoles(data = {}) {
    return service.request({
        method: 'post',
        url: '/userRole/',
        data
    });
}

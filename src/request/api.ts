import request from './request';

interface IRegisterLogin {
    username: string,
    password: string,
}
//注册接口
export const RegisterApi = (params:IRegisterLogin) => request.post('/register', params);
//登录接口
export const LoginApi = (params:IRegisterLogin) => request.post('/login', params);
//获取用户信息
export const UserInfoApi = () => request.get('/info');
//修改用户信息
export const ChangeUserInfoApi = (params:IRegisterLogin) => request.post('/info',params);
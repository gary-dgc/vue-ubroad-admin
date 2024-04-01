import request from '@/utils/http';

const Api = {
  Login: '/basic-api/login',
  GetUserInfo: '/basic-api/getUsers',
  GetMenuList: '/basic-api/getMenu',
  LoginOut: '/basic-api/loginOut',
};

export const login = (data) => {
  return request.post(Api.Login, data);
};

export const getUserInfo = () => {
  return request.get(Api.GetUserInfo);
};

export const getMenuList = () => {
  return request.get(Api.GetMenuList);
};

export const loginOut = () => {
  return request.get(Api.LoginOut);
};

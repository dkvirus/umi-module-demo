import { apiPrefixMock } from '@/configs/config';

const getToken = { 
  code: '0000', 
  message: 'Ok', 
  data: { access_token: 'xxxx' } 
};

const getUserList = { 
  code: '0000', 
  message: 'Ok', 
  data: {
    id: 'admin',
    name: '管理员',
    username: 'admin',
    password: 'admin',
    branchId: '*',
    authorities: [
      'PRIVILEGE_APP_READ', 'PRIVILEGE_APP_WRITE',
      'PRIVILEGE_ORDER_READ', 'PRIVILEGE_ORDER_WRITE',
      'PRIVILEGE_GOODS_READ', 'PRIVILEGE_GOODS_WRITE',
    ],
  }, 
};

export default {
  /**
   * 拿 token
   */
  [`POST ${apiPrefixMock}/oauth/token`]: getToken,

  /**
   * 查询用户信息
   */
  [`GET ${apiPrefixMock}/app/me`]: getUserList,

  /**
   * 注销系统
   */
  [`GET ${apiPrefixMock}/logout`]: { code: '0000', success: true, message: 'Ok' },
};

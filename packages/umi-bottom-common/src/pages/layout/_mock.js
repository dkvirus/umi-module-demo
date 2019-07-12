import { apiPrefixMock } from '@/configs/config'

const getToken = { 
  code: '0000', 
  message: 'Ok', 
  data: { access_token: 'xxxx' }, 
}

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
      'PRIVILEGE_ONLINE_READ', 'PRIVILEGE_ONLINE_WRITE',
      'PRIVILEGE_PARAM_READ', 'PRIVILEGE_PARAM_WRITE',
      'PRIVILEGE_BATCH_READ', 'PRIVILEGE_BATCH_WRITE',
      'PRIVILEGE_RBAC_READ', 'PRIVILEGE_RBAC_WRITE',
      'PRIVILEGE_ORG_READ', 'PRIVILEGE_ORG_WRITE',
      'PRIVILEGE_AUDIT_READ', 'PRIVILEGE_AUDIT_WRITE',
      'PRIVILEGE_MONITOR_READ', 'PRIVILEGE_MONITOR_WRITE',
      'PRIVILEGE_SCHEDULE_READ', 'PRIVILEGE_SCHEDULE_WRITE',
    ],
  }, 
}

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
}

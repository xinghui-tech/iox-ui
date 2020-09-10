const baseUrl = process.env.VUE_APP_URI;
const baseUcUrl = process.env.VUE_APP_UC_URI;
const baseResUrl = process.env.VUE_APP_RES_URI;
const baseImUrl = process.env.VUE_APP_IM_URI;
const baseImDomain = process.env.VUE_APP_IM_DOMAIN;
const ssoName = process.env.VUE_APP_COOKIE_SSO;

const defaultConfig = {
  logger: 'VERBOSE',
  api: {
    version: '2.1.0',
    url: {
      baseUrl,
      baseUcUrl,
    },
  },
  sso: {
    name: ssoName,
  },
  template: {
    id: 39,
    version: 'v1.0.0.200716'
  },
  urls: {
    baseUrl,
    baseUcUrl,
    baseResUrl,
    baseImUrl,
    baseImDomain,
  },
  home: {
    path: '/pages/index',
    jumpType: 2 // 0:switchTab 1:navigateTo 2:redirectTo 3:reLaunch
  },
  my: {
    path: '/pages/my',
    jumpType: 2 // 0:switchTab 1:navigateTo 2:redirectTo 3:reLaunch
  },
  theme: {

  },
  features: {
      schedule: true,
      tip: true,
      like: true,
      comment: true,
      startPage: 'ready'
  },
  extra: {},
  templateExtra: {}
};

export default defaultConfig;

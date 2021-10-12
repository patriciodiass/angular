import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

export const environment = {
  production: false,
  application: {
    baseUrl:'http://localhost:4200',
    name: 'EGAPI',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44319',
    redirectUri: baseUrl,
    clientId: 'Collaborator_App',
    responseType: 'code',
    scope: 'offline_access openid profile role email phone address AuthServer Collaborator',
  },
  apis: {
    default: {
      url: 'https://localhost:44399',
      rootNamespace: 'EGAPI.Collaborator',
    },
  },
} as Environment;

import { Environment } from '@abp/ng.core';

const baseUrl = 'https://localhost:4200';

export const environment = {
  production:false,
  application: {
    baseUrl:'https://localhost:4200/',
    name: 'Collaborator',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44319',
    redirectUri: baseUrl,
    clientId: 'Collaborator_App',
    responseType: 'code',
    scope: 'offline_access Collaborator',

  },
  apis: {
    default: {
      url: 'https://localhost:44399',
      rootNamespace: 'EGAPI.Collaborator',
    },
  },
} as Environment;

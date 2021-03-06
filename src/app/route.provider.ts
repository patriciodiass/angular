import { RoutesService, eLayoutType } from '@abp/ng.core';
import { APP_INITIALIZER } from '@angular/core';

export const APP_ROUTE_PROVIDER = [
  { provide: APP_INITIALIZER, useFactory: configureRoutes, deps: [RoutesService], multi: true },
];

function configureRoutes(routesService: RoutesService) {
  return () => {
    routesService.add([
      {
        path: '/',
        name: '::Menu:Home',
        iconClass: 'fas fa-home',
        order: 1,
        layout: eLayoutType.application,
      },
      {
        path: '/calendar',
        name: '::Calendar',
        iconClass: 'fas fa-calendar',
        order: 2,
        layout: eLayoutType.application,
        requiredPolicy: 'Collaborator.User',

      },
      {
        path: '/projects',
        name: '::Projects',
        iconClass: 'fas fa-project-diagram',
        order: 3,
        layout: eLayoutType.application,
        requiredPolicy: 'Collaborator.Projects',

      },
      {
        path: '/projecttypes',
        name: '::Project Types',
        iconClass: 'fas fa-tasks',
        order: 4,
        layout: eLayoutType.application,
        requiredPolicy: 'Collaborator.ProjectTypes',

      },
      {
        path: '/imports',
        name: '::Imports',
        iconClass: 'fas fa-file-upload',
        order: 6,
        layout: eLayoutType.application,
        requiredPolicy: 'Collaborator.Imports',

      },
      {path: '/admincalendar',
      name: '::Admin Calendar',
      iconClass: 'fas fa-calendar',
      order: 7,
      layout: eLayoutType.application,
      requiredPolicy: 'Collaborator.Admin',

    },  
      {path: '/tags',
      name: '::Tags',
      iconClass: 'fas fa-tags',
      order: 5,
      layout: eLayoutType.application,
      requiredPolicy: 'Collaborator.Tags',

    },
    ]);
  };
}

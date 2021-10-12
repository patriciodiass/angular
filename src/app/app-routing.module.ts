import { AdminviewComponent } from './adminview/adminview.component';
import { AdmincalendarComponent } from './admincalendar/admincalendar/admincalendar.component';
import { ImportsComponent } from './imports/imports.component';
import { ProjectsComponent } from './projects/projects/projects.component';
import { HomeComponent } from './home/home.component';
import { CalendarComponent } from './date/calendar/calendar.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjecttypespageComponent } from './projecttypes/projecttypespage/projecttypespage.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'account',
    loadChildren: () => import('@abp/ng.account').then(m => m.AccountModule.forLazy()),
  },
  {
    path: 'identity',
    loadChildren: () => import('@abp/ng.identity').then(m => m.IdentityModule.forLazy()),
  },
  {
    path: 'tenant-management',
    loadChildren: () =>
      import('@abp/ng.tenant-management').then(m => m.TenantManagementModule.forLazy()),
  },
  {
    path: 'setting-management',
    loadChildren: () =>
      import('@abp/ng.setting-management').then(m => m.SettingManagementModule.forLazy()),
  },
  { path: 'calendar', component:CalendarComponent
},  
{ path: 'projects', component:ProjectsComponent
},
{ path: 'projecttypes', component:ProjecttypespageComponent
},
{ path: 'imports', component:ImportsComponent
},
{ path: 'admincalendar', component:AdmincalendarComponent
},
{ path: 'adminview', component:AdminviewComponent
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

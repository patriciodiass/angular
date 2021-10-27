import { ModalComponent } from 'src/app/modal/modal.component';
import { TagsComponent } from './tags/tags.component';
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
import { AuthGuard, PermissionGuard } from '@abp/ng.core';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule),canActivate: [AuthGuard, PermissionGuard]
    },
    {
        path: 'account',
        loadChildren: () => import('@abp/ng.account').then(m => m.AccountModule.forLazy()),canActivate: [AuthGuard, PermissionGuard]
    },
    {
        path: 'identity',
        loadChildren: () => import('@abp/ng.identity').then(m => m.IdentityModule.forLazy()),canActivate: [AuthGuard, PermissionGuard]
    },
    {
        path: 'tenant-management',
        loadChildren: () =>
            import('@abp/ng.tenant-management').then(m => m.TenantManagementModule.forLazy()),canActivate: [AuthGuard, PermissionGuard]
    },
    {
        path: 'setting-management',
        loadChildren: () =>
            import('@abp/ng.setting-management').then(m => m.SettingManagementModule.forLazy()),canActivate: [AuthGuard, PermissionGuard]
     },
    { path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard, PermissionGuard] },
    { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard, PermissionGuard] },
    { path: 'projecttypes', component: ProjecttypespageComponent, canActivate: [AuthGuard, PermissionGuard] },
    { path: 'imports', component: ImportsComponent, canActivate: [AuthGuard, PermissionGuard] },
    { path: 'admincalendar', component: AdmincalendarComponent, canActivate: [AuthGuard, PermissionGuard] },
    { path: 'projects/:id', component: AdminviewComponent, canActivate: [AuthGuard, PermissionGuard] },
    { path: 'tags', component: TagsComponent, canActivate: [AuthGuard, PermissionGuard] },
    { path: 'calendar/:id', component: ModalComponent, canActivate: [AuthGuard, PermissionGuard] },


];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule],
})
export class AppRoutingModule {}

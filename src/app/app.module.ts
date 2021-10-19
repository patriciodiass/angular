import { TableFilterPipe } from './pipe/table-filter.pipe';
import { MbscModule } from '@mobiscroll/angular';
import { AccountConfigModule } from '@abp/ng.account/config';
import { CoreModule } from '@abp/ng.core';
import { registerLocale } from '@abp/ng.core/locale';
import { IdentityConfigModule } from '@abp/ng.identity/config';
import { SettingManagementConfigModule } from '@abp/ng.setting-management/config';
import { TenantManagementConfigModule } from '@abp/ng.tenant-management/config';
import { ThemeBasicModule } from '@abp/ng.theme.basic';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APP_ROUTE_PROVIDER } from './route.provider';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarComponent } from './date/calendar/calendar.component';
import { MatSliderModule } from '@angular/material/slider';
import {MatMenuModule} from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';    
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ModalComponent } from './modal/modal.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { ComfirmDeleteComponent } from './modal/comfirm-delete/comfirm-delete/comfirm-delete.component';
import { OAuthModule } from 'angular-oauth2-oidc';
import { ProjectsComponent } from './projects/projects/projects.component';
import { MatTableModule } from '@angular/material/table'  
import {MatButtonModule} from '@angular/material/button';
import { NewprojectComponent } from './modal/new-project/newproject/newproject.component';
import {MatSelectModule} from '@angular/material/select';
import { ProjecttypeComponent } from './modal/type/projecttype/projecttype.component';
import { ProjecttypespageComponent } from './projecttypes/projecttypespage/projecttypespage.component';
import { SharedModule } from './shared/shared.module';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatChipsModule} from '@angular/material/chips';


import { PipeComponent } from './pipe/pipe.component';
import { ImportsComponent } from './imports/imports.component';
import { MyApplicationLayoutComponent } from './my-application-layout/my-application-layout.component';
import { LogoComponent } from './logo/logo.component';
import { RoutesComponent } from './routes/routes.component';
import { NavItemsComponent } from './nav-items/nav-items.component';
import { YourNewRoleComponent } from './your-new-role/your-new-role.component';
import { AdmincalendarComponent } from './admincalendar/admincalendar/admincalendar.component';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { AdminviewComponent } from './adminview/adminview.component';
import { UserdetailsComponent } from './modal/userdetails/userdetails/userdetails.component';
import { TagInputModule } from 'ngx-chips';
import { NgSelectModule } from '@ng-select/ng-select';
import { TagsComponent } from './tags/tags.component';
import { TagmodalComponent } from './modal/tag-modal/tagmodal/tagmodal.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';



@NgModule({
  imports: [ 
    MbscModule, BrowserModule,
    FormsModule,MatInputModule,
    ReactiveFormsModule,TagInputModule,
    HttpClientModule,MomentDateModule,
    HttpClientJsonpModule,NgSelectModule,
    MatSliderModule,MatPaginatorModule,
    MatIconModule,MatExpansionModule,
    MatListModule,SharedModule,
    MatFormFieldModule,MatSidenavModule,
    MatNativeDateModule,MatToolbarModule,
    MatDatepickerModule,MatSelectModule,
    MatMenuModule,MatIconModule,MatAutocompleteModule,
    DragDropModule,MatChipsModule,
    MatTableModule,MatButtonModule,
    OAuthModule.forRoot(),
    MatCardModule, MatSlideToggleModule,
    BrowserAnimationsModule,
    AppRoutingModule,MatGridListModule,
    CoreModule.forRoot({
      environment,
      registerLocaleFn: registerLocale(),
    }),
    ThemeSharedModule.forRoot(),
    AccountConfigModule.forRoot(),
    IdentityConfigModule.forRoot(),
    TenantManagementConfigModule.forRoot(),
    SettingManagementConfigModule.forRoot(),
    NgxsModule.forRoot(),
    ThemeBasicModule.forRoot(),
  ],
  declarations: [AppComponent, CalendarComponent,TableFilterPipe, ModalComponent, ComfirmDeleteComponent, ProjectsComponent, NewprojectComponent, ProjecttypeComponent, ProjecttypespageComponent, PipeComponent, ImportsComponent, MyApplicationLayoutComponent, LogoComponent, RoutesComponent, NavItemsComponent, YourNewRoleComponent, AdmincalendarComponent, AdminviewComponent, UserdetailsComponent, TagsComponent, TagmodalComponent],
  providers: [APP_ROUTE_PROVIDER,CalendarComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}

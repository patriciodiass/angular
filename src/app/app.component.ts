import { ReplaceableComponentsService } from '@abp/ng.core';
import { eIdentityComponents } from '@abp/ng.identity';
import { eThemeBasicComponents, NavItemsComponent, RoutesComponent } from '@abp/ng.theme.basic';
import { Component } from '@angular/core';
import { setOptions, localePtPT } from '@mobiscroll/angular';
import { MyApplicationLayoutComponent } from './my-application-layout/my-application-layout.component';
import { LogoComponent } from './logo/logo.component'; // imported LogoComponent
import { YourNewRoleComponent } from './your-new-role/your-new-role.component';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent {
    constructor(
      private replaceableComponents: ReplaceableComponentsService, // injected the service
    ) {
        this.replaceableComponents.add({
            component: YourNewRoleComponent,
            key: eIdentityComponents.Roles,
          });
        // this.replaceableComponents.add({
        //     component: NavItemsComponent,
        //     key: eThemeBasicComponents.NavItems,
        //   })
        //   this.replaceableComponents.add({
        //     component: LogoComponent,
        //     key: eThemeBasicComponents.Logo,
        //   })
        //   this.replaceableComponents.add({
        //     component: RoutesComponent,
        //     key: eThemeBasicComponents.Routes,
        //   })
          
    }
  }

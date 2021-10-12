  
import { eLayoutType, SubscriptionService } from '@abp/ng.core';
import { collapseWithMargin, slideFromBottom } from '@abp/ng.theme.shared';
import { AfterViewInit, Component } from '@angular/core';
import { LayoutService } from '../services/layout.service';

@Component({
    selector: 'app-your-new-role',
  templateUrl: './your-new-role.component.html',
  animations: [slideFromBottom, collapseWithMargin],
  providers: [LayoutService, SubscriptionService],
})

export class YourNewRoleComponent implements  AfterViewInit {
    // required for dynamic component
    static type = eLayoutType.application;
  
    constructor(public service: LayoutService) {}
  
    ngAfterViewInit() {
      this.service.subscribeWindowSize();
    }
  }

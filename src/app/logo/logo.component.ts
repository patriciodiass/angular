import { Component } from '@angular/core';

@Component({
  selector: 'app-logo',
  template: `
    <a class="navbar-brand" routerLink="/">
      <!-- Change the img src -->
      <img
        src="https://via.placeholder.com/100x50/343a40/FF0000?text=MyLogo"
        alt="logo"
        width="100%"
        height="auto"
      />
    </a>
  `,
})
export class LogoComponent {}

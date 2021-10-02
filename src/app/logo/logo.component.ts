import { Component } from '@angular/core';

@Component({
  selector: 'logo',
  template: `<a [routerLink]="['/']">
              <span>
                  HOTEL DE INFUSYNC
                  <mat-icon>deck</mat-icon>
              </span>
            </a>
            `,
  styles: [`
    a {
      text-decoration: none;
      color: white;
      span {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        font-family: "Audiowide", sans-serif;
        mat-icon {
          font-size: 20px;
          margin-top: 6px;
          margin-right: -3px;
          color: white;
        }
      }
    }
  `]
})
export class LogoComponent {

  constructor() { }

}

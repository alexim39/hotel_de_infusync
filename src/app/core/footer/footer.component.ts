import { Component } from '@angular/core';

@Component({
  selector: 'async-footer',
  template: `
    <footer fxLayout="column">
        <hdi-social-medial></hdi-social-medial>
        <hdi-copyright></hdi-copyright>
    </footer>
  `,
  styles: [`
    footer {
        background-color: whitesmoke;
        color: rgb(104, 104, 104);
        font-size: 0.9em;
    }
  `]
})
export class FooterComponent {

  constructor() { }

}

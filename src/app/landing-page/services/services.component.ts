import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'infusync-services',
  styles: [`
    section {
      padding: 2em;
      width: 50%;
      margin: 0 auto;
    }
    /* For tablet phones: */
    @media only screen and (max-width:800px) {
      section {
        width: 70%;
      }
    }
    /* For mobile phones: */
    @media only screen and (max-width:500px) {
      section {
        width: 100%;
      }
    }
  `],
  template: `
    <section fxLayout="row" fxLayoutAlign="center center" fxLayoutGap="1em" fxLayout.xs="column">


      <div>
        <h2>Title1</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque enim a </p>
      </div>

      <div>
        <h2>Title1</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque enim a </p>
      </div>

      <div>
        <h2>Title1</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque enim a </p>
      </div>

    </section>
  `
})
export class ServicesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

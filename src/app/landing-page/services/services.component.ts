import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'infusync-services',
  styles: [`
    section {
      padding: 2em;
    }
  `],
  template: `
    <section fxLayout="row" fxLayoutAlign="space-between start" fxLayoutGap="1em" fxLayout.xs="column">

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

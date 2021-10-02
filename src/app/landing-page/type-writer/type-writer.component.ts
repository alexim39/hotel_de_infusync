import { AfterViewInit, Component, Input, ViewChild, ElementRef } from "@angular/core";
// declare jquery as any
declare const $: any;


@Component({
  selector: 'infusync-type-writer',
  template: `
    <header fxLayout="column" fxLayoutAlign="center center">
        <div><!-- With us:  --><span #textElement></span> <span #blinkElement class="blink"></span></div>
    </header>
  `,
  styles: [`
    header {
      background: whitesmoke;
      div {
        font-family: "Courier";
        font-size: 1em;
        font-weight: bold;
        padding: 2em;
      }
    }

    .blink {
      border-right-style: solid;
      opacity: 0;
      animation: blinking 1s linear infinite;
    }

    @keyframes blinking {
      from,
      49.9% {
        opacity: 0;
      }
      50%,
      to {
        opacity: 1;
      }
    }

    /* For tablets: */
    @media only screen and (max-width:800px) { }

    /* For mobile phones: */
    @media only screen and (max-width:500px) { }
  `]
})
export class TypeWriterComponent implements AfterViewInit {

  @ViewChild("textElement") textElement: ElementRef;
  @ViewChild("blinkElement") blinkElement: ElementRef;
  @Input() wordArray: string[] = [
    " AT HOTEL DE INFUSYNC YOU ARE HOME FAR AWAY FROM HOME.          ",
    " HOTEL DE INSUSYNC IS LUXURY REDEFINED. SIMPLY COMTEMPORARY AND ELEGANT.           ",
  ];

  private i = 0;

  constructor() { }

  ngAfterViewInit(): void {
    this.typingEffect();
  }

  private typingEffect(): void {
    const word = this.wordArray[this.i].split("");
    const loopTyping = () => {
      if (word.length > 0) {
        this.textElement.nativeElement.innerHTML += word.shift();
      } else {
        this.deletingEffect();
        return;
      }
      setTimeout(loopTyping, 100);
    };
    loopTyping();
  }

  private deletingEffect(): void {
    const word = this.wordArray[this.i].split("");
    const loopDeleting = () => {
      if (word.length > 0) {
        word.pop();
        this.textElement.nativeElement.innerHTML = word.join("");
      } else {
        if (this.wordArray.length > this.i + 1) {
          this.i++;
        } else {
          this.i = 0;
        }
        this.typingEffect();
        return;
      }
      setTimeout(loopDeleting, 100);
    };
    loopDeleting();
  }
}

import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthComponent } from 'src/app/auth/auth.component';

@Component({
  selector: 'infusync-banner',
    styles: [`
      header {
      background-size:cover;
      aside {
        background-image: linear-gradient(to left, rgba(12, 12, 12, 0.2) 26.48%, rgba(15, 15, 15, 0.5) 73.52%);
        min-height: 770px;
        text-align: center;
        position: relative;
        height: 100%;
        width: 100%;
        video {
          object-fit: cover;
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          z-index: -1;
        }
        article {
          margin: auto;
          height: 80vh;
          h1 {
              text-align: center; 
              color: white;  
              font-family: "Audiowide", sans-serif;
              font-size: 3em;     
          }
          .btn {
            //background-color: #4CAF50; /* Green */
            border: none;
            color: white;
            padding: 15px 32px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            cursor: pointer;
            border: 1px solid white;
            &:hover {
              opacity: 0.9;
            }
          }
        }
      }
    }
    /* For mobile phones: */
    @media only screen and (max-width:500px) {
      header {
        margin-bottom: -3em;
        margin-bottom: 1px;
        aside {
          article {
            h1 {
              font-size: 1.3em;
            }
          }          
        }
      }
    }
  `],
  template: `
    <section fxLayout="row" fxLayoutAlign="center center">
      <header fxFill>
        <aside>
          <video autoplay muted loop [poster]="posterSource">
            <source [src]="videoSource" type="video/webm">
          </video>

          <article fxLayout="column" fxLayoutAlign="center center" fxLayoutGap="3em">

            <!-- Desktop -->
            <h1 class="mat-display-1" fxHide fxShow.gt-xs>
              WELCOME TO HOTEL DE INFUSYNC
            </h1>

            <!-- Mobile -->
            <h1 fxHide fxShow.lt-sm>
              WELCOME TO HOTEL DE INFUSYNC
            </h1>

            <!-- <h3 class="typing">
              <async-typing></async-typing>
            </h3> -->

            <div class="btn">
              <a (click)="openAuthComponent()">BOOK RESERVATION NOW</a>
            </div>
          </article>

        </aside>
      </header>
    </section>
  `
})
export class BannerComponent {

  posterSource: string = 'assets/img/vid-snapeshot.png';
  videoSource: string = 'assets/vid/bck-vid.mp4';

  constructor(
    public dialog: MatDialog
  ) { }

  openAuthComponent() {
    this.dialog.open(AuthComponent);
  }

}

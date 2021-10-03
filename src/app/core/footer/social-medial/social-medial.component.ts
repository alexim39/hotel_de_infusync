import { Component } from '@angular/core';

interface LanguagesInterface {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'hdi-social-medial',
  template: `
    <section fxLayout="row" fxLayout.xs="column" fxLayout.sm="column" fxLayoutAlign="space-between center">
      <div class="brand" fxFlex="20" fxFlex.sm="100" fxFlex.xs="100">
        <logo></logo>
        <p>
          Lorem ipsum dolor sit amet consect, Lorem ipsum dolor sit amet consect
        </p>
        <br>

        <mat-form-field>
          <mat-label>Language</mat-label>
          <mat-select [(value)]="selectedLanguage">
            <mat-option [value]="language.value" *ngFor="let language of languages">{{ language.viewValue }}</mat-option>
          </mat-select>
        </mat-form-field>
        
      </div>
      <div class="links" fxFlex="80" fxFlex.sm="100" fxFlex.xs="100">
        <aside 
          fxLayout="row" 
          fxLayoutAlign="end center" 
          fxLayoutGap="3em" 
          fxHide fxShow.gt-sm
          >
          <div>
            <h2>About</h2>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">About</a></li>
            </ul>
          </div>

          <div>
            <h2>Services</h2>
            <ul>
              <li><a href="#">Accomodations</a></li>
              <li><a href="#">Karaoke Bar</a></li>
              <li><a href="#">Night Clubs</a></li>
            </ul>
          </div>

          <div>
            <h2>Social</h2>
            <ul>
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">Linkedin</a></li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  `,
  styles: [`
    section {
      padding: 2em 4em; 
      background: #424242; 
      .brand {
        logo {
          a {
            span {
              mat-icon {
                margin-bottom: -2em;
              }
            }
          }
        }
        p {
          margin-top: 1em;
          color: white !important;
          font-family: verdana;
        }
      } 
      .links {
        aside {
          div {
            ul {
              list-style-type: none;
              margin: 0;
              padding: 0;
              width: 200px;
              //background-color: #f1f1f1;
            }

            li a {
              display: block;
              color: #000;
              padding: 8px 16px;
              text-decoration: none;
            }

            /* Change the link color on hover */
            li a:hover {
              background-color: #555;
              color: white;
            }
          }
        }
      } 
    }
    /* For mobile phones: */
    @media only screen and (max-width:500px) {
      section {
        padding: 2em;
        
      }
    }
  `]
})
export class SocialMedialComponent {

  languages: LanguagesInterface[] = [
    {value: 'eng', viewValue: 'English'}
  ];
  selectedLanguage = this.languages[0].value;

  constructor() { }

}

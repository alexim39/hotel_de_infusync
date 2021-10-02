import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs'
import { AuthComponent } from '../../auth/auth.component';
// declare jquery as any
declare const $: any;


@Component({
  selector: 'infusync-nav',
  template: `
    <nav>
      <mat-toolbar color="primary">
        <!-- First row -->
        <mat-toolbar-row>
          <logo></logo>
          <span class="spacer"></span>

          <span *ngIf="!deviceXs">
            <button mat-button> 
              <mat-icon>phone</mat-icon>
              +234 8080 386208
            </button>
            <button mat-button> 
              <mat-icon>south_east</mat-icon>
              Book Now 
            </button>
          </span>
          <button mat-icon-button [matMenuTriggerFor]="menu">
            <mat-icon>more_vert</mat-icon>
          </button>
        </mat-toolbar-row>

        <!-- Second row -->
        <mat-toolbar-row *ngIf="deviceXs">
          <span class="spacer"></span>
          <button mat-button> 
            <mat-icon>phone</mat-icon>
            +234 8080 386208
          </button>
          <button mat-button> 
            <mat-icon>south_east</mat-icon>
            Book Now 
          </button>
        </mat-toolbar-row>

      </mat-toolbar>

      <!-- Menu dropdown items -->
      <mat-menu #menu="matMenu">
        <a mat-menu-item (click)="openAuthComponent()">
          <mat-icon>login</mat-icon>
          <span>Admin panel</span>
        </a>
        <!-- <a mat-menu-item [routerLink]="['/firm/feedback']" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">
          <mat-icon>feedback</mat-icon>
          <span>Send Feedback</span>
        </a> -->
      </mat-menu>
    </nav>
  `,
  styles: [`
    nav {
      mat-toolbar {
        mat-toolbar-row {
          button {
            color: whitesmoke;
            mat-icon {
              font-size: 14px;
              margin-top: 6px;
            }
          }
        }
        .spacer {
          flex: 1 1 auto;
        }
      }
    }
  `]
})
export class NavComponent implements OnDestroy {

  // init subscriptions list
  subscriptions: Subscription[] = [];
  @Input() deviceXs: boolean;

  constructor(
    public dialog: MatDialog
  ) {}

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  openAuthComponent() {
    this.dialog.open(AuthComponent);
  }

}

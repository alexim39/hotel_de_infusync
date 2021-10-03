import { Component, OnInit } from '@angular/core';
declare const $: any;
import { MatSidenav } from '@angular/material/sidenav';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Component({
  selector: 'infusync-sidenav-list',
  template: `
    <mat-nav-list>

      <a mat-menu-item (click)="toggle()"  [routerLink]="['/dashboard']" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}"> 
        <mat-icon>dashboard</mat-icon> Dashboard
      </a>

      <a mat-menu-item (click)="toggle()"  [routerLink]="['/dashboard/users']" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}"> 
        <mat-icon>person_add</mat-icon> User Management
      </a>

      <a mat-list-item class="prediction">
        <mat-icon>room</mat-icon> Room Management
        <mat-icon class="prediction-close">keyboard_arrow_left</mat-icon>
        <mat-icon class="prediction-open">keyboard_arrow_down</mat-icon>
      </a>
      <mat-nav-list class="predictionDropdown">
        <a mat-list-item (click)="toggle()"  [routerLink]="['/dashboard/new-room']" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}"> 
          <span mat-line>New room</span>
        </a>
        <a mat-list-item (click)="toggle()"  [routerLink]="['/dashboard/view-room']" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}"> 
          <span mat-line>View rooms</span>
        </a>
      </mat-nav-list>

    </mat-nav-list>
  `,
  styles: [`
    mat-nav-list {
      a {
        font-family: 'Arial Narrow';
        font-size: 1.1em;
        mat-icon {
          margin: 0.2rem 0.4rem 0 0;
        }
      }
      .active {
          background-color: #ccc;
      }
      .prediction, .subscription {
        position: relative;
        .prediction-open, .prediction-close, .subscription-open, .subscription-close {
          position: absolute;
          right: 1rem;
          display: none;
        }
      }
      .predictionDropdown, .subscriptionDropdown {
        display: none;
        a {
          span {
            padding-left: 2.5rem;
              
          }
        }
      }
    }
  `]
})
export class SidenavListComponent implements OnInit {

  constructor(
    private matSidenav: MatSidenav,
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit(): void {
    // init list togle
    this.listItemTogle();
  }

  private listItemTogle() {
        
    // Toggle lay indicator - prediction
    //$( document ).ready(function( $: any ) {
      $('.prediction-close').show();
      $('.prediction').click(() => {
        if ($('.prediction-close').is(':visible')) {
          $('.prediction-close').hide(300);
          $('.prediction-open').show(300);
          $('.predictionDropdown').show(100);
        } else {
          $('.prediction-close').show(300);
          $('.prediction-open').hide(300);
          $('.predictionDropdown').hide(100);
        }
      });

      // Toggle lay indicator - subscription
      $('.subscription-close').show();
      $('.subscription').click(() => {
        if ($('.subscription-close').is(':visible')) {
          $('.subscription-close').hide(300);
          $('.subscription-open').show(300);
          $('.subscriptionDropdown').show(100);
        } else {
          $('.subscription-close').show(300);
          $('.subscription-open').hide(300);
          $('.subscriptionDropdown').hide(100);
        }
      });
    //})
  }

  toggle() {
    const isSmallScreen = this.breakpointObserver.isMatched('(max-width: 599px)');
    if (isSmallScreen) {
      this.matSidenav.close()
    }
  }

}

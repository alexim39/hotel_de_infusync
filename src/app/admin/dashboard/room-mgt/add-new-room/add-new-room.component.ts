import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { FormResetterService } from 'src/app/core/form-resetter.service';
import { UserInterface, UserService } from 'src/app/core/user.service';
import { RoomInterface, RoomMgtService } from '../room-mgt.service';

@Component({
  selector: 'infusync-add-new-room',
  styles: [`
    section {
      mat-card {
        padding: 2em 2em 0 2em;
        form {        
          mat-form-field {
            width: 100%;
          }
        }
      }
    }
  `],
  template: `
    <div class="breadcrumb-wrap">
        <ul class="breadcrumb">
          <li>
            <a [routerLink]="['/dashboard']" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Dashboard</a>
          </li>
          <li>
            <a>Room management</a>
          </li>
          <li>new room</li>
        </ul>
    </div>

    <section fxLayout="row" fxLayout.sm="column" fxLayout.xs="column"fxLayoutAlign="space-between center">
        <mat-card class="form" fxFlex="50" fxFlex.sm="100" fxFlex.xs="100">
          <form [formGroup]="form" (ngSubmit)="onSubmit(form.value)">
          <mat-card-title>ADD NEW ROOM</mat-card-title>

            <mat-form-field>
              <mat-label>Room name</mat-label>
              <input matInput formControlName="name">
            </mat-form-field>

            <mat-form-field>
              <mat-label>Room price</mat-label>
              <input matInput type="number" formControlName="price">
            </mat-form-field>

            <mat-card-actions>
                <button [disabled]="form.invalid || isSpinning" mat-flat-button color="accent">
                    <div class="loader" *ngIf="isSpinning"></div>
                    SUBMIT
                </button>
                <!-- <button mat-button>CLOSE</button> -->
            </mat-card-actions>
          </form>
        </mat-card>
    </section>
  `
})
export class AddNewRoomComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  user: UserInterface;
  form: FormGroup;
  isSpinning: boolean = false;

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private formResetterService: FormResetterService,
    private roomMgtService: RoomMgtService
  ) { }

  ngOnInit(): void {

    // push into list
    this.subscriptions.push(
      // get current user details from data service
      this.userService.getUser().subscribe((user: UserInterface) => {
        this.user = user;
      })
    )

    this.form = new FormGroup({
      name: new FormControl('', {
        validators:
          [
            Validators.required,
            //Validators.pattern('[A-Za-z]{2,80}')
          ], updateOn: 'change'
      }),
      price: new FormControl('', {
        validators:
          [
            Validators.required,
            //Validators.pattern('[A-Za-z]{2,80}'),
          ], updateOn: 'change'
      })
    })
  }

  onSubmit(newRoomObj: RoomInterface) {
    this.isSpinning = true;

    // attach the user id
    newRoomObj['creator'] = this.user._id;

    // push into list
    this.subscriptions.push(
      this.roomMgtService.createNewRoom(newRoomObj).subscribe((res) => {
        if (res.code === 200) {
          this.snackBar.open(`${res.msg}`, `Close`, {
            duration: 4000,
            panelClass: ['success']
          });

          // reset form
          this.formResetterService.reset(this.form);
          this.isSpinning = false;
        }
      }, (error) => {
        this.snackBar.open(`${error.error.msg}`, `Close`, {
          duration: 4000,
          panelClass: ['error']
        });
        this.isSpinning = false;
      })
    )
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
        subscription.unsubscribe();
    });
  }

}

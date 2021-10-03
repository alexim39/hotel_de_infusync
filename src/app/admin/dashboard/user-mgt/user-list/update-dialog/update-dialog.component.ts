import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { ClientsInterface, ClientUpdateInterface, UserMgtService } from '../../user-mgt.service';

@Component({
  selector: 'infusync-update-status-dialog',
  template: `
    <section>
        <h2>UPDATE <span fxHide fxShow.gt-xs>OPTIONS FOR</span> {{data.names | uppercase}} </h2>
        <div class="mat-body">
          <p>Select update type</p>
          <mat-radio-group [formControl]="statusLabelControl">
            <mat-list role="list">
              <mat-list-item role="listitem">
              <mat-radio-button value="Pending">Pending</mat-radio-button>
              </mat-list-item>
              <mat-list-item role="listitem">
                <mat-radio-button value="In">Check In</mat-radio-button>
              </mat-list-item>
              <mat-list-item role="listitem">
                <mat-radio-button value="Out">Check Out</mat-radio-button>
              </mat-list-item>
              <mat-list-item role="listitem">
                <mat-radio-button value="Reserved">Reservation</mat-radio-button>
              </mat-list-item>
            </mat-list>
          </mat-radio-group>

          <mat-button-toggle-group [formControl]="paymentLabelControl" name="paymentStatus" aria-label="Payment status">
            <mat-button-toggle value="Payment complete">PAID IN FULL</mat-button-toggle>
            <mat-button-toggle value="Part payment">PAID PART</mat-button-toggle>
            <mat-button-toggle value="NO payment yet">NO PAYMENT YET</mat-button-toggle>
          </mat-button-toggle-group>

        </div>
        <div fxLayout.xs="column" fxLayout.xs="row" fxLayoutAlign="space-between center" fxLayoutGap="1em">
          <button [disabled]="isSpinning_update" (click)="updateClientStatus()" mat-flat-button color="accent" fxFlex>
            <div class="loader" *ngIf="isSpinning_update"></div>
            UPDATE
          </button>

          <button [disabled]="isSpinning_delete" (click)="removeClient(data._id)" mat-button color="warn" fxFlex>
            <div class="loader" *ngIf="isSpinning_delete"></div>
            DELETE
          </button>
        </div>
    <section>
  `,
  styles: [`
    section {
      p {
        color: gray;
      }
      mat-button-toggle-group {
        margin-bottom: 1em;
      }
    }
  `]
})
export class UpdateDialogComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  form: FormGroup;
  paymentLabelControl = new FormControl(null);
  statusLabelControl = new FormControl(null);
  isSpinning_update: boolean = false;
  isSpinning_delete: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<UpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ClientsInterface,
    private fb: FormBuilder,
    private userMgtService: UserMgtService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      statusLabel: this.statusLabelControl,
      paymentLabel: this.paymentLabelControl,
    });
  }

  updateClientStatus() {
    this.isSpinning_update = true;

    //console.log(this.form.controls.outcomeLabel.value)
    const statusUpdateObj: ClientUpdateInterface = {
      id: this.data._id,
      status: this.form.controls.statusLabel.value,
      payment: this.form.controls.paymentLabel.value
    }

    // push into list
    this.subscriptions.push(
      this.userMgtService.updateClientStaus(statusUpdateObj).subscribe((res) => {
          if (res.code === 200) {
              this.snackBar.open(`${res.msg}`, `Close`, {
                  duration: 4000,
                  panelClass: ['success']
              });

              // close dialog
              this.dialogRef.close();
              this.isSpinning_update = false;
          }
      }, (error) => {
          this.snackBar.open(`${error.error.msg}`, `Close`, {
              duration: 4000,
              panelClass: ['error']
          });
          this.isSpinning_update = false;
      })
    )
  }

  removeClient(id: string): void {
    if (!confirm("You are about to permanently delete the client record. Sure?")) {
      return null;
    } else {
      this.isSpinning_delete = true;
      // push into list
      this.subscriptions.push(
        this.userMgtService.deleteClient(id).subscribe((res) => {
            if (res.code === 200) {
                this.snackBar.open(`${res.msg}`, `Close`, {
                    duration: 4000,
                    panelClass: ['success']
                });

                // close dialog
                this.dialogRef.close();
                this.isSpinning_delete = false;
            }
        }, (error) => {
            this.snackBar.open(`${error.error.msg}`, `Close`, {
                duration: 4000,
                panelClass: ['error']
            });
            this.isSpinning_delete = false;
        })
      )
    }
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
        subscription.unsubscribe();
    });
  }

}

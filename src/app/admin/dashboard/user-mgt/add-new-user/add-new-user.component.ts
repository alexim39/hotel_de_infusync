import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { FormResetterService } from 'src/app/core/form-resetter.service';
import { UserInterface, UserService } from 'src/app/core/user.service';
import { ClientsInterface, UserMgtService } from '../user-mgt.service';

@Component({
  selector: 'infusync-add-new-user',
  styles: [`
    mat-card {
      padding: 2em 2em 0 2em;
      form {
        mat-card-content {
          mat-form-field {
            width: 100%;
            mat-hint {
              font-weight: bold;
              font-size: 1em;
            }
          }
        }
      }
    }
  `],
  templateUrl: './add-new-user.component.html'
})
export class AddNewUserComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  user: UserInterface;
  form: FormGroup;
  isSpinning: boolean = false;
  selectedAccodationPrice: number = 0;

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private userMgtService: UserMgtService,
    private formResetterService: FormResetterService
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
      names: new FormControl('', {
        validators:
          [
            Validators.required,
            //Validators.pattern('[A-Za-z]{2,80}')
          ], updateOn: 'change'
      }),
      email: new FormControl('', {
        validators:
          [
            Validators.required,
            //Validators.pattern('[A-Za-z]{2,80}'),
          ], updateOn: 'change'
      }),
      phone: new FormControl('', {
        validators:
          [
            Validators.required,
            //Validators.pattern('[A-Za-z]{2,80}'),
          ], updateOn: 'change'
      }),
      address: new FormControl('', {
        validators:
          [
            Validators.required,
            //Validators.pattern('[A-Za-z]{2,80}'),
          ], updateOn: 'change'
      }),
      country: new FormControl('', {
        validators:
          [
            Validators.required,
            //Validators.pattern('[A-Za-z]{2,80}'),
          ], updateOn: 'change'
      }),
      arrivalDate: new FormControl('', {
        validators:
          [
            Validators.required,
            //Validators.pattern('[A-Za-z]{2,80}'),
          ], updateOn: 'change'
      }),
      departureDate: new FormControl('', {
        validators:
          [
            Validators.required,
            //Validators.pattern('[A-Za-z]{2,80}'),
          ], updateOn: 'change'
      }),
      people: new FormControl('', {
        validators:
          [
            Validators.required,
            //Validators.pattern('[A-Za-z]{2,80}'),
          ], updateOn: 'change'
      }),
      room: new FormControl('', {
        validators:
          [
            Validators.required,
            //Validators.pattern('[A-Za-z]{2,80}'),
          ], updateOn: 'change'
      }),
      services: new FormControl('', {
        validators:
          [
            //Validators.required,
            //Validators.pattern('[A-Za-z]{2,80}'),
          ], updateOn: 'change'
      }),
      comment: new FormControl('', {
        validators:
          [
            Validators.required,
            //Validators.pattern('[A-Za-z]{2,80}'),
          ], updateOn: 'change'
      }),
    })
  }

  onChange(accomodation: string) {
    switch (accomodation) {
      case 'Zweibett':
        this.selectedAccodationPrice = 25000;
        break;
      case 'Doppelbett':
        this.selectedAccodationPrice = 50000;
        break;
      case 'Premiumbett':
        this.selectedAccodationPrice = 95000;
        break;
      case 'Luxurybett':
        this.selectedAccodationPrice = 120000;
        break;
      case 'standardbett':
        this.selectedAccodationPrice = 350000;
        break;
      case null:
        this.selectedAccodationPrice = 0;
    }
  }

  onSubmit(clientObj: ClientsInterface) {
    this.isSpinning = true;

    // attach the user id
    clientObj['creator'] = this.user._id;

    // push into list
    this.subscriptions.push(
      this.userMgtService.creatClientBooking(clientObj).subscribe((res) => {
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

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { FormResetterService } from 'src/app/core/form-resetter.service';
import { UserInterface, UserService } from 'src/app/core/user.service';
import { RoomInterface, RoomMgtService } from '../../room-mgt/room-mgt.service';
import { UserMgtClass } from '../user-mgt.class';
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
export class AddNewUserComponent extends UserMgtClass implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  user: UserInterface;
  form: FormGroup;
  isSpinning: boolean = false;
  selectedAccodationPrice: number = 0;
  freeRooms: Array<RoomInterface> = [];

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private userMgtService: UserMgtService,
    private formResetterService: FormResetterService,
    private roomMgtService: RoomMgtService
  ) {
    super()
  }

  private getAllFreeRooms() {
    this.subscriptions.push(
      this.roomMgtService.getAllFreeRooms().subscribe((res) => {
        if (res.code === 200) {
          this.freeRooms = res.obj;
        }
      })
    )
  }

  ngOnInit(): void {

    // get all available rooms
    this.getAllFreeRooms();

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
            Validators.email,
          ], updateOn: 'change'
      }),
      phone: new FormControl('', {
        validators:
          [
            Validators.required,
            Validators.pattern('[0-9]{1,11}'),
          ], updateOn: 'change'
      }),
      address: new FormControl('', {
        validators:
          [
            Validators.required,
          ], updateOn: 'change'
      }),
      country: new FormControl('', {
        validators:
          [
            Validators.required,
          ], updateOn: 'change'
      }),
      arrivalDate: new FormControl('', {
        validators:
          [
            Validators.required,
          ], updateOn: 'change'
      }),
      departureDate: new FormControl('', {
        validators:
          [
            Validators.required,
          ], updateOn: 'change'
      }),
      people: new FormControl('', {
        validators:
          [
            Validators.required,
          ], updateOn: 'change'
      }),
      room: new FormControl('', {
        validators:
          [
            Validators.required,
          ], updateOn: 'change'
      }),
      services: new FormControl('', {
        validators:
          [
          ], updateOn: 'change'
      }),
      comment: new FormControl('', {
        validators:
          [
          ], updateOn: 'change'
      }),
    })
  }

  onChange(room: string) {
    const fn: RoomInterface[] = []
      this.freeRooms.forEach((r) => {
        if (r.name === room) {
          fn.push(r) 
        }
      })
      this.selectedAccodationPrice = fn[0].price
  }

  onSubmit(clientObj: ClientsInterface) {
    this.isSpinning = true;

    // attach the user id
    clientObj['creator'] = this.user._id;
    clientObj['room'] = super.getRoomId(clientObj.room, this.freeRooms);

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

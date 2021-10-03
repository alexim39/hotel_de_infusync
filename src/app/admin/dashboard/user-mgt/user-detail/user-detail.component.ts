import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventTriggerService } from 'src/app/common/event-trigger.service';
import { UserInterface, UserService } from 'src/app/core/user.service';
import { RoomInterface } from '../../room-mgt/room-mgt.service';
import { UserMgtClass } from '../user-mgt.class';
import { ClientsInterface, UserMgtService } from '../user-mgt.service';

@Component({
  selector: 'infusync-user-detail',
  styleUrls: ['./user-detail.component.scss'],
  templateUrl: './user-detail.component.html'
})
export class UserDetailComponent extends UserMgtClass implements OnInit, OnDestroy {

  clientId: string;
  subscriptions: Subscription[] = [];
  profileImg: string = "assets/img/profile.jpg";
  currentUser: UserInterface;
  foundClientProfile: ClientsInterface;
  isEmptyResponse: boolean;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private titleService: Title,
    public userMgtService: UserMgtService,
    private eventTriggerService: EventTriggerService
  ) {
    super();
    this.titleService.setTitle(this.route.snapshot.data['title']);
  }

  // check for empty response
  private emptyResponse(array: ClientsInterface[]) {
    if (array.length === 0) {
      // array empty or does not exist
      this.isEmptyResponse = false;
    }else{
      this.isEmptyResponse = true;
    }
  }

  ngOnInit(): void {
    this.subscriptions.push(
      // get current user details from data service
      this.userService.getUser().subscribe((user: UserInterface) => {
        this.currentUser = user;
      })
    )

    this.subscriptions.push(
      this.route.params.subscribe((params: Params) => {
        this.clientId = params.userId; // same as :userId in route

        this.subscriptions.push(
          this.userMgtService.getAClient(this.clientId).subscribe((res) => {
            if (res.code === 200) {

              // check empty response
              this.emptyResponse(res.obj);
              
              this.foundClientProfile = res.obj;
            }
          }, (error) => {
            this.isEmptyResponse = false;
          })
        )
      })
    )
  }

  getAmount(paymentStatus: string, room: RoomInterface): number { 
    if (paymentStatus == 'Payment complete') {
      return room.price;
    } 
    return 0
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}

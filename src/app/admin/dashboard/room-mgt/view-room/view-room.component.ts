import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserInterface, UserService } from 'src/app/core/user.service';
import { MatDialog } from '@angular/material/dialog';
import { RoomInterface, RoomMgtService } from '../room-mgt.service';
import { RoomMgtClass } from '../room-mgt.class';

@Component({
  selector: 'infusync-view-room',
  styleUrls: ['./view-room.component.scss'],
  template: `
    <div class="breadcrumb-wrap">
        <ul class="breadcrumb">
          <li>
            <a [routerLink]="['/dashboard']" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Dashboard</a>
          </li>
          <li>
            <a>Room management</a>
          </li>
          <li>view room</li>
        </ul>
    </div>

    <aside>
    <div *ngIf="roomMgtService.showSpinner | async" fxLayout="column" fxLayoutAlign="space-between center" fxLayoutGap="1em">
      <mat-progress-bar mode="indeterminate"></mat-progress-bar>
      <span>Loading...</span>
    </div>

    <section *ngIf="!(roomMgtService.showSpinner | async)">

      <section *ngIf="isEmptyResponse">
          <div class="filter mat-elevation-z8">
            <mat-form-field>
              <mat-label>Search Table</mat-label>
              <input matInput (keyup)="applyFilter($event)" #input>
            </mat-form-field>
          </div>
          <table mat-table [dataSource]="rooms" matSort class="mat-elevation-z8">

          <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef> ROOM </th>
              <td mat-cell *matCellDef="let room"> 
                {{room.name | titlecase}}
              </td>
            </ng-container>

            <ng-container matColumnDef="price">
              <th mat-header-cell *matHeaderCellDef> PRICE </th>
              <td mat-cell *matCellDef="let room"> {{room.price | currency:'NIG':'&#8358;'}} </td>
            </ng-container>

            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef mat-sort-header> STATUS </th>
              <td mat-cell *matCellDef="let room"> 
                {{room.status | titlecase}}
                <small><!-- {{getStatus(client)}} --> </small>
              </td>
            </ng-container>

            <ng-container matColumnDef="createDDate">
              <th fxHide fxShow.gt-sm mat-header-cell *matHeaderCellDef> POST DATE </th>
              <td fxHide fxShow.gt-sm mat-cell *matCellDef="let room"> {{getCreatedDate(room.createdDate)}}<!-- {{bet.createDate | date}} --> </td>
            </ng-container>

            <ng-container matColumnDef="creator">
              <th mat-header-cell *matHeaderCellDef> ADMIN </th>
              <td matTooltip="View profile" mat-cell *matCellDef="let room"> 
                {{getAdmin(room.creator) | titlecase}}
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row [ngClass]="{ 'booked': getBookedRooms(room.status) }" *matRowDef="let room; columns: displayedColumns;"></tr>
          </table>
          <mat-paginator [length]="100" [pageSize]="10" [pageSizeOptions]="[10, 20, 45, 60, 100]"></mat-paginator>
      </section>
      <section class="no-user-found" *ngIf="!isEmptyResponse">
        <p>No user found</p>
      </section>

    </section>
  </aside>
  `
})
export class ViewRoomComponent extends RoomMgtClass implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  user: UserInterface;
  rooms: MatTableDataSource<RoomInterface>;
  displayedColumns: string[] = ['name', 'price', 'status', 'createDDate', 'creator'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  //profileImg: string = "assets/img/profile.jpg";
  isEmptyResponse: boolean;

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    public dialog: MatDialog,
    public roomMgtService: RoomMgtService
  ) {
    super();
    this.titleService.setTitle(this.route.snapshot.data['title']);
   }

    // check for empty response
    private emptyResponse(array: RoomInterface[]) {
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
          this.user = user;
        })
      )
  
      // call getclients
      this.getClients();
    }
  
    private getClients(): void {
      // push into list
      this.subscriptions.push(
        this.roomMgtService.getAllRooms().subscribe((res) => {
          if (res.code === 200) {
  
            // check empty response
            this.emptyResponse(res.obj);
  
            setTimeout(() => this.rooms.paginator = this.paginator);
            setTimeout(() => this.rooms.sort = this.sort);
  
            // sort arrays by date to return recent first
            const sortedResult = res.obj.sort((a: RoomInterface, b: RoomInterface) => {
              return <any>new Date(b.createdDate) - <any>new Date(a.createdDate);
            });
  
  
            // Assign the data to the data source for the table to render
            this.rooms = new MatTableDataSource(sortedResult);
          }
        })
      )
    }

  getCreatedDate(date: string): string {
    return super.createDate(date);
  }

  getAdmin(creator: UserInterface): string {
    return super.getCreator(creator, this.user._id);
  }

  getBookedRooms(status: string): boolean {
    if (status == 'booked') {
      return true
    } else {
      return false;
    }
  }

  // apply filter
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.rooms.filter = filterValue.trim().toLowerCase();

    if (this.rooms.paginator) {
      this.rooms.paginator.firstPage();
    }
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}

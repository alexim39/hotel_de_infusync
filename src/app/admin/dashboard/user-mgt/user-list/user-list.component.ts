import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserInterface, UserService } from 'src/app/core/user.service';
import { UserMgtService, ClientsInterface } from '../user-mgt.service';
import { UserMgtClass } from '../user-mgt.class';
import { MatDialog } from '@angular/material/dialog';
import { UpdateDialogComponent } from './update-dialog/update-dialog.component';

@Component({
  selector: 'infusync-user-list',
  styles: [`
    .add-pannel {
      margin: 1em 0;
    }
    section {
      .filter {
        background-color: white;
        height: 100%;
        padding: 1rem;
        margin-bottom: -2.5em;
        mat-form-field {
          width: 30%;
        }
      }
      table {
        width: 100%;
        margin-top: 2rem;
        img {
          height: 25px;
          width: 25px;
          border-radius: 50%;
          margin-bottom: -0.6em;
          border: 1px solid #ccc;
        }
        td {
          small {
            display: block;
            font-size: 0.6em;
          }
          .clickable {
            cursor: pointer;
          }
          .profile-img {
            margin-top: 6px;
          }
          .profile-name{
            padding-top: 0.6em;
            font-size: 0.8em;
            color: gray;
          }
          button {
            margin-right: 5px;
          }
        }
      }  
      .checked-out {
        color: #32cd32;
      }
      .expired {
        text-decoration: line-through;
      }  
      .no-user-found {
        text-align: center;
        p {
          color: orange;
          margin: 2em;
          font-weight: bold;
        }
      }   
    }

    /* for tablet */
    @media only screen and (max-width:800px) {
      section {
        .filter {
          mat-form-field {
            width: 100%;
          }
        }
      }
    }
    /* for mobile */
    @media only screen and (max-width:500px) {
      section {
        .filter {
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
        <li>User management</li>
        <!-- <li>user list</li> -->
      </ul>
    </div>

    <section class="add-pannel" fxLayout="row" fxLayoutAlign="end center" fxLayoutAlign.xs="center center"  fxLayoutGap="1em">
      <a mat-flat-button color="accent" fxFlex.xs [routerLink]="['/dashboard/users/new']">
        <mat-icon>add</mat-icon>
        ADD NEW CLIENT
      </a>
    </section>

    <aside>
      <div *ngIf="userMgtService.showSpinner | async" fxLayout="column" fxLayoutAlign="space-between center" fxLayoutGap="1em">
        <mat-progress-bar mode="indeterminate"></mat-progress-bar>
        <span>Loading...</span>
      </div>

      <section *ngIf="!(userMgtService.showSpinner | async)">

        <section *ngIf="isEmptyResponse">
            <div class="filter mat-elevation-z8">
              <mat-form-field>
                <mat-label>Search Table</mat-label>
                <input matInput (keyup)="applyFilter($event)" #input>
              </mat-form-field>
            </div>
            <table mat-table [dataSource]="clients" matSort class="mat-elevation-z8">

            <ng-container matColumnDef="name">
                <th mat-header-cell *matHeaderCellDef> CLIENT </th>
                <td matTooltip="View {{client.names}}'s profile" mat-cell *matCellDef="let client" (click)="loadClientProfile(client._id)" fxLayout="column" fxLayoutAlign="start start"> 
                  <img class="profile-img clickable" [src]="profileImg"/>
                  <div class="profile-name clickable"> {{client.names | titlecase}}</div>
                </td>
              </ng-container>

              <ng-container matColumnDef="arrivalDate">
                <th mat-header-cell *matHeaderCellDef> ARRIVAL </th>
                <td mat-cell *matCellDef="let client"> {{client.arrivalDate | date}} </td>
              </ng-container>

              <ng-container matColumnDef="departureDate">
                <th mat-header-cell *matHeaderCellDef> DEPARTURE </th>
                <td mat-cell *matCellDef="let client"> {{client.departureDate | date}}  </td>
              </ng-container>

              <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> STATUS </th>
                <td mat-cell *matCellDef="let client"> 
                  {{getStatus(client.status) | titlecase}}
                  <small><!-- {{getStatus(client)}} --> </small>
                </td>
              </ng-container>

              <ng-container matColumnDef="createDDate">
                <th fxHide fxShow.gt-sm mat-header-cell *matHeaderCellDef> POST DATE </th>
                <td fxHide fxShow.gt-sm mat-cell *matCellDef="let client"> {{getCreatedDate(client.createdDate)}}<!-- {{bet.createDate | date}} --> </td>
              </ng-container>

              <ng-container matColumnDef="creator">
                <th mat-header-cell *matHeaderCellDef> ADMIN </th>
                <td matTooltip="View profile" mat-cell *matCellDef="let client"> 
                  {{getAdmin(client.creator) | titlecase}}
                </td>
              </ng-container>

              <ng-container matColumnDef="action">
                <th mat-header-cell *matHeaderCellDef> ACTION </th>
                <td mat-cell *matCellDef="let client"> 
                  <button mat-stroked-button matTooltip="Edit profile" (click)="openUpdateDialog(client)">
                    <mat-icon>edit</mat-icon>
                  </button>
                  <button mat-stroked-button matTooltip="View {{client.names}}'s profile" (click)="loadClientProfile(client._id)">
                    <mat-icon>pageview</mat-icon>
                  </button>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row [ngClass]="{ 'checked-out': cilentCheckedOut(client.status),  'expired': getExpiredBookings(client.departureDate) }" *matRowDef="let client; columns: displayedColumns;"></tr>
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
export class UserListComponent extends UserMgtClass implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  user: UserInterface;
  clients: MatTableDataSource<ClientsInterface>;
  displayedColumns: string[] = ['name', 'arrivalDate', 'departureDate', 'status', 'createDDate', 'creator', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  profileImg: string = "assets/img/profile.jpg";
  isEmptyResponse: boolean;

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    public userMgtService: UserMgtService,
    public dialog: MatDialog
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
        this.user = user;
      })
    )

    // call getclients
    this.getClients();
  }

  private getClients(): void {
    // push into list
    this.subscriptions.push(
      this.userMgtService.getAllClients().subscribe((res) => {
        if (res.code === 200) {

          // check empty response
          this.emptyResponse(res.obj);

          setTimeout(() => this.clients.paginator = this.paginator);
          setTimeout(() => this.clients.sort = this.sort);

          // sort arrays by date to return recent first
          const sortedResult = res.obj.sort((a: ClientsInterface, b: ClientsInterface) => {
            return <any>new Date(b.createdDate) - <any>new Date(a.createdDate);
          });


          // Assign the data to the data source for the table to render
          this.clients = new MatTableDataSource(sortedResult);
        }
      })
    )
  }

  // apply filter
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.clients.filter = filterValue.trim().toLowerCase();

    if (this.clients.paginator) {
      this.clients.paginator.firstPage();
    }
  }

  cilentCheckedOut(status: string): boolean {
    if (status === 'Out') {
      return true;
    } else {
      return false;
    }
  }

  loadClientProfile(userId: string) {
    // redirect to dashboard
    this.router.navigate(['/dashboard/users/'+userId]);
  }

  openUpdateDialog(client: ClientsInterface) {
    const dialogRef = this.dialog.open(UpdateDialogComponent, {
      data: client
    });

    this.subscriptions.push(
      dialogRef.afterClosed().subscribe(res => {
        this.ngOnInit()
      })
    )
  }

  getCreatedDate(date: string): string {
    return this.userMgtService.createDate(date);
  }

  getAdmin(creator: UserInterface): string {
    return super.getCreator(creator, this.user._id);
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}

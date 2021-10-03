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
  templateUrl: './user-list.component.html'
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
    return super.createDate(date);
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

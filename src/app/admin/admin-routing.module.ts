import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/home/home.component';
import { AddNewRoomComponent } from './dashboard/room-mgt/add-new-room/add-new-room.component';
import { ViewRoomComponent } from './dashboard/room-mgt/view-room/view-room.component';
import { AddNewUserComponent } from './dashboard/user-mgt/add-new-user/add-new-user.component';
import { UserDetailComponent } from './dashboard/user-mgt/user-detail/user-detail.component';
import { UserListComponent } from './dashboard/user-mgt/user-list/user-list.component';
import { UserMgtComponent } from './dashboard/user-mgt/user-mgt.component';


const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard], data: {title: 'Hotel De Infusync - Admin dashboard'},
    children: [
      { path: '', component: HomeComponent },
      { path: 'new-room', component: AddNewRoomComponent, data: {title: 'Dashboard - New room management'}},
      { path: 'view-room', component: ViewRoomComponent, data: {title: 'Dashboard - View room managment'}},
      { path: 'users', component: UserMgtComponent, data: {title: 'Dashboard - User management'},
        children: [
          { path: '', component: UserListComponent },
          { path: 'new', component: AddNewUserComponent, data: {title: 'Dashboard - Create new booking profile'}},
          { path: ':userId', component: UserDetailComponent, data: {title: 'Dashboard - Client booking profile'}}
        ]
      },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
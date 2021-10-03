import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './dashboard/home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from './../common/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing.module';
import { SidenavListComponent } from './dashboard/sidenav/sidenav-list.component';
import { SidenavMenuComponent } from './dashboard/sidenav/menu/menu.component';
import { LogoModule } from '../logo/logo.module';
import { CoreModule } from '../core/core.module';
import { AccountActivationComponent } from './dashboard/home/account-activation/account-activation.component';
import { UserMgtModule } from './dashboard/user-mgt/user-mgt.module';
import { RoomMgtModule } from './dashboard/room-mgt/room-mgt.module';


@NgModule({
  declarations: [
    DashboardComponent, 
    HomeComponent,
    SidenavListComponent,
    SidenavMenuComponent,
    AccountActivationComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule,
    LogoModule,
    CoreModule,
    UserMgtModule,
    RoomMgtModule
  ]
})
export class AdminModule { }

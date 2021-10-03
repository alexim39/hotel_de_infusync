import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/common/material/material.module';
import { UserMgtComponent } from './user-mgt.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserMgtService } from './user-mgt.service';
import { UpdateDialogComponent } from './user-list/update-dialog/update-dialog.component';
import { PipesModule } from './../../../common/pipes/pipes.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { AddNewUserComponent } from './add-new-user/add-new-user.component';

@NgModule({
  declarations: [
    UserMgtComponent,
    UserListComponent,
    UpdateDialogComponent,
    UserDetailComponent,
    AddNewUserComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule,
    PipesModule,
    ReactiveFormsModule
  ],
  providers: [UserMgtService]
})
export class UserMgtModule { }

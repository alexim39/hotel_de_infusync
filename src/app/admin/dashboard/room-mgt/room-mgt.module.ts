import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNewRoomComponent } from './add-new-room/add-new-room.component';
import { RoomMgtService } from './room-mgt.service';
import { ViewRoomComponent } from './view-room/view-room.component';
import { PipesModule } from './../../../common/pipes/pipes.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/common/material/material.module';

@NgModule({
  declarations: [
    AddNewRoomComponent,
    ViewRoomComponent,
    
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule,
    ReactiveFormsModule,
    PipesModule
  ],
  providers: [RoomMgtService]
})
export class RoomMgtModule { }

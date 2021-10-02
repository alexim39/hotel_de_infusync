import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../common/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page.component';
import { LandingPageRoutingModule } from './landing-page-routing.module';
import { NavComponent } from './nav/nav.component';
import { CoreModule } from '../core/core.module';
import { LogoModule } from '../logo/logo.module';
import { AuthModule } from '../auth/auth.module';
import { BannerComponent } from './banner/banner.component';
import { ContainterComponent } from './containter/container.components';
import { TypeWriterComponent } from './type-writer/type-writer.component';
import { ServicesComponent } from './services/services.component';



@NgModule({
  declarations: [
    LandingPageComponent,
    ContainterComponent,
    NavComponent,
    BannerComponent,
    TypeWriterComponent,
    ServicesComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule,
    LandingPageRoutingModule,
    CoreModule,
    LogoModule,
    AuthModule,
  ],
  providers: []
})
export class LandingPageModule { }

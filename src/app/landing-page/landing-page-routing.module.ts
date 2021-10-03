import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from '../auth/signin/signin.component';
import { ContainterComponent } from './containter/container.components';
import { LandingPageComponent } from './landing-page.component';


const routes: Routes = [
  { path: '', component: LandingPageComponent,
    children: [
      { path: '', component: ContainterComponent },
      { path: 'signin', component: SigninComponent, data: {title: 'User account signin'}  },
    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingPageRoutingModule { }
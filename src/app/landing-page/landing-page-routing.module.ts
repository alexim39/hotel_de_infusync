import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainterComponent } from './containter/container.components';
import { LandingPageComponent } from './landing-page.component';


const routes: Routes = [
  { path: '', component: LandingPageComponent,
    children: [
      { path: '', component: ContainterComponent },
    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingPageRoutingModule { }
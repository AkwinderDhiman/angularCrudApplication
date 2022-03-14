import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CarsComponent } from './cars/cars.component';

const routes: Routes = [
  { path: ' ', component:  AppComponent},
  { path: 'cars', component: CarsComponent },];
  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LugaresComponent } from './components/lugares/lugares.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Al entrar te manda al login
  { path: 'login', component: LoginComponent },
  { path: 'lugares', component: LugaresComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

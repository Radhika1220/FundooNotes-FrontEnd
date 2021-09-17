import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './Components/Register/register.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

var data =localStorage.getItem('forgot-password');
var token=data==null?' ':JSON.parse(data).token;
const routes: Routes = [
  {path:'Register',component:RegisterComponent},
  {path:'Login',component:LoginComponent},
  {path:`reset-password/${token}`,component:ResetPasswordComponent},
  {path:'forgot-password',component:ForgotPasswordComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

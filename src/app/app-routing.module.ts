import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './Components/Register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { DashBoardComponent } from './Components/dash-board/dash-board.component';
import { NotesComponent } from './Components/notes/notes.component';
import { CollaboratorDialogBoxComponent } from './Components/collaborator-dialog-box/collaborator-dialog-box.component';
import { GetNoteComponent } from './get-note/get-note.component';
import { GetArchiveComponent } from './get-archive/get-archive.component';
var data =localStorage.getItem('forgot-password');
var token=data==null?' ':JSON.parse(data).token;
const routes: Routes = [
  {path:'Register',component:RegisterComponent},
  {path:'Login',component:LoginComponent},
  {path:`reset-password/${token}`,component:ResetPasswordComponent},
  {path:'forgot-password',component:ForgotPasswordComponent},
  {path:'dash-board',component:DashBoardComponent},
  {path:'notes',component:NotesComponent},
  {path:'collaborator',component:CollaboratorDialogBoxComponent},
  {path:'get-notes',component:GetNoteComponent},
  {path:'get-archive',component:GetArchiveComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './Components/Register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { LoginComponent } from './Components/login/login.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { HttpClientModule } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { DashBoardComponent } from './Components/dash-board/dash-board.component';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import { NotesComponent } from './Components/notes/notes.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatDialogModule} from '@angular/material/dialog';
import {CollaboratorDialogBoxComponent} from './Components/collaborator-dialog-box/collaborator-dialog-box.component';
import { GetNoteComponent } from './Components/get-note/get-note.component';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatChipsModule} from '@angular/material/chips';
import { IconsComponent } from './Components/icons/icons.component';
import { GetReminderComponent } from './Components/get-reminder/get-reminder.component';
import { GetArchiveComponent } from './Components/get-archive/get-archive.component';
import { TrashNotesComponent } from './Components/trash-notes/trash-notes.component';
import { GetLabelsComponent } from './Components/get-labels/get-labels.component';
import { UpdateNoteComponent } from './Components/update-note/update-note.component';
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    DashBoardComponent,
    NotesComponent,
    CollaboratorDialogBoxComponent,
    GetNoteComponent,
    IconsComponent,
    GetReminderComponent,
    GetArchiveComponent,
    TrashNotesComponent,
    GetLabelsComponent,
    UpdateNoteComponent,

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatIconModule,
MatToolbarModule,
MatDividerModule,
MatSidenavModule,
MatListModule,
MatMenuModule,
MatButtonToggleModule,
MatDialogModule,
MatSelectModule,
MatDatepickerModule,
MatChipsModule


  ],
  providers: [
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

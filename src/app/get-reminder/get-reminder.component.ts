import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
// import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
// import { CardDialogComponent } from '../card-dialog/card-dialog.component';
import { NoteServiceService} from 'src/app/Services/noteservice/note-service.service';
@Component({
  selector: 'app-get-reminder',
  templateUrl: './get-reminder.component.html',
  styleUrls: ['./get-reminder.component.scss']
})
export class GetReminderComponent implements OnInit {
  reminderNotes!:any[];
  constructor(private noteService:NoteServiceService) { }

  ngOnInit(): void {
    this.GetReminder();
  }
  GetReminder()
  {
    this.noteService.GetReminder()
  .subscribe(
    (result: any) => 
    {
    console.log(result.data);
    this.reminderNotes=result.data;
    console.log(this.reminderNotes);
    },(error: HttpErrorResponse) => {
    console.log(error.error.message);
  })
  }
  // OpenCard()
  // {
  //   this.dialog.open(CardDialogComponent);
  // }
}

import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoteServiceService} from 'src/app/Services/noteservice/note-service.service';
@Component({
  selector: 'app-get-reminder',
  templateUrl: './get-reminder.component.html',
  styleUrls: ['./get-reminder.component.scss']
})
export class GetReminderComponent implements OnInit {
  reminderNotes!:any[];
  pinned:boolean=true;
  constructor(private noteService:NoteServiceService,
    private snackBar: MatSnackBar) { }

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
  PinNote()
{
  this.snackBar.open(`${this.pinned?'Note Unpinned':'Note Pinned'}`, '', {
      duration: 5000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center'
    });
    this.pinned=!(this.pinned);
}
}

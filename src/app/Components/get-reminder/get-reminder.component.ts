import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoteServiceService} from 'src/app/Services/noteservice/note-service.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UpdateNoteComponent } from '../update-note/update-note.component';
import { DataserviceService } from 'src/app/Services/DataService/dataservice.service';
@Component({
  selector: 'app-get-reminder',
  templateUrl: './get-reminder.component.html',
  styleUrls: ['./get-reminder.component.scss']
})
export class GetReminderComponent implements OnInit {
  reminderNotes!:any[];
  pinned:boolean=true;
  constructor(private noteService:NoteServiceService,
    private snackBar: MatSnackBar,
    private dialog:MatDialog,
    private data:DataserviceService) { }

  ngOnInit(): void {
    this.GetReminder();
    this.data.currentMessage.subscribe((change)=>{
      if(change == true){
        this.GetReminder();
        this.data.changeMessage(false);
      }
  })
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

DeleteReminder(note:any)
{
  this.GetReminder();
  console.log(note.notesId);
  this.noteService.DeleteReminder(note.noteId)
  .subscribe(
    (result: any) => 
    {
    console.log(result.data);
    },(error: HttpErrorResponse) => {
    console.log(error.error.message);
  })
}

openDialog(note:any)
{
  console.log(note);
  
  const dialogConfig = new MatDialogConfig();
  this.dialog.open(UpdateNoteComponent, {
    panelClass: 'dialog-container-custom',
     data: {
    data: note
  }});
}
}

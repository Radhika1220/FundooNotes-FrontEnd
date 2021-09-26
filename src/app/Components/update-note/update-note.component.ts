import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoteServiceService} from 'src/app/Services/noteservice/note-service.service';
@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.scss']
})
export class UpdateNoteComponent implements OnInit {

  constructor(private snackBar:MatSnackBar,
    private noteService:NoteServiceService, 
    public dialogRef: MatDialogRef<UpdateNoteComponent>,@Inject(MAT_DIALOG_DATA) public note:any) { }
  bigNote:boolean = false;
  EditNoteForm !: FormGroup;
  pinned = false;
  noteColor = "#fff";
  isReminder=false;
  Reminder="";
  ngOnInit(): void {
    console.log(this.note,"diwa");
    
    this.EditNoteForm = new FormGroup({
      Title: new FormControl(),
      Description:new FormControl()
    });
  }
  // pinNote(note:any)
  // {
  //   console.log(note);
  //   this.noteService.TogglePin(note.noteId).subscribe();
  // }
  // RemoveReminder()
  // {
  //   this.isReminder = false;
  //   this.snackBar.open('Reminder Deleted', '', {
  //     duration: 2000,
  //     verticalPosition: 'bottom',
  //     horizontalPosition: 'left'
  //   });
  // }
  Close(note:any) 
  {
    this.noteService.UpdateNote(note).subscribe();
    console.log(note.data);
    this.dialogRef.close();
  }
  DeleteReminder(note:any)
{
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

PinNote()
{
    this.noteService.PinNote(this.note.noteId)
    .subscribe(
      (result: any) => 
      {
      console.log(result.message);
      // this.openSnackBar(result.message,'');
  
      },(error: HttpErrorResponse) => {
      console.log(error.error.message);
    })
  }
  UnPinNote()
  {
    this.noteService.UnPinNote(this.note.noteId)
    .subscribe(
      (result: any) => 
      {
      console.log(result.message);
      // this.openSnackBar(result.message,'');
  
      },(error: HttpErrorResponse) => {
      console.log(error.error.message);
    })
  }
}

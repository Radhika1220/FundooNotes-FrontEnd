import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NoteServiceService} from 'src/app/Services/noteservice/note-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UpdateNoteComponent } from '../update-note/update-note.component';
import { DataserviceService } from 'src/app/Services/DataService/dataservice.service';
@Component({
  selector: 'app-get-note',
  templateUrl: './get-note.component.html',
  styleUrls: ['./get-note.component.scss']
})
export class GetNoteComponent implements OnInit {
notes!:any[];
pinned:boolean=true;
  constructor(private noteService:NoteServiceService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private data:DataserviceService) { }

  ngOnInit(): void {
    this.GetNotes();
    this.data.currentMessage.subscribe((change)=>{
      if(change == true){
        this.GetNotes();
        this.data.changeMessage(false);
      }
  })
  }
  GetNotes()
  {
    this.noteService.GetNotes()
    .subscribe((result : any)=>
    {
       console.log(result);
       this.notes=result.data;
       console.log(this.notes);
    }),
    (error: HttpErrorResponse) => {
      console.log(error.error.message)
  }
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
  console.log(note.notesId);
  this.noteService.DeleteReminder(note.noteId)
  .subscribe(
    (result: any) => 
    {
      this.GetNotes();
    console.log(result.data);
    },(error: HttpErrorResponse) => {
    console.log(error.error.message);
  })
}


openDialog(note:any)
{
  console.log(note);
  this.GetNotes();
  const dialogConfig = new MatDialogConfig();
  this.dialog.open(UpdateNoteComponent, {
    panelClass: 'dialog-container-custom',
     data: {
    data: note
  }});
}
}

 




  

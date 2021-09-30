import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataserviceService } from 'src/app/Services/DataService/dataservice.service';
import { NoteServiceService} from 'src/app/Services/noteservice/note-service.service';
import { UpdateNoteComponent } from '../update-note/update-note.component';
@Component({
  selector: 'app-get-archive',
  templateUrl: './get-archive.component.html',
  styleUrls: ['./get-archive.component.scss']
})
export class GetArchiveComponent implements OnInit {
  pinned:boolean=true;
  archiveNotes!:any[];
  
  note:any;
  constructor(private noteService:NoteServiceService,
    private snackBar: MatSnackBar,
    private dialog:MatDialog,
    private data: DataserviceService) { }

  ngOnInit(): void {
    this.GetArchive();
    this.data.currentMessage.subscribe((change)=>{
      if(change == true){
        this.GetArchive();
        this.data.changeMessage(false);
      }
  })
  }

  GetArchive()
  {
    this.noteService.GetArchive()
  .subscribe(
    (result: any) => 
    {
    console.log(result.data);
    this.archiveNotes=result.data;
    console.log(this.archiveNotes);
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
  this.GetArchive();
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

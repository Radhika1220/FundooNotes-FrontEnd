import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataserviceService } from 'src/app/Services/DataService/dataservice.service';
import { NoteServiceService} from 'src/app/Services/noteservice/note-service.service';
@Component({
  selector: 'app-trash-notes',
  templateUrl: './trash-notes.component.html',
  styleUrls: ['./trash-notes.component.scss']
})
export class TrashNotesComponent implements OnInit {
trashNotes!:any[];
  constructor(private noteService:NoteServiceService,
    public _snackBar: MatSnackBar,
    private data: DataserviceService) { }

  ngOnInit(): void {
    this.GetTrash();
    this.data.currentMessage.subscribe((change)=>{
      if(change == true){
        this.GetTrash();
        this.data.changeMessage(false);
      }
  })
  }
  GetTrash()
  {
    this.noteService.GetTrash()
  .subscribe(
    (result: any) => 
    {
    console.log(result.data);
    this.trashNotes=result.data;
    console.log(this.trashNotes);
    },(error: HttpErrorResponse) => {
    console.log(error.error.message);
  })
  }

  DeleteTrash(note:any)
  {
    this.noteService.DeleteTrash(note.noteId)
  .subscribe(
    (result: any) => 
    {
      this.data.changeMessage(true);
    console.log(result.data);
    console.log(result.status);
    },(error: HttpErrorResponse) => {
    console.log(error.error.message);
  })
  }

  RestoreTrash(note:any)
  {  

    this.noteService.RestoreTrash(note.noteId)
    .subscribe(
      (result: any) => 
      {
        this.data.changeMessage(true);
        console.log(result);
       this.trashNotes=result.data;
       console.log(this.trashNotes)

      },(error: HttpErrorResponse) => {
      console.log(error.error.message);
    })

  }


  EmptyTrash()
  {
    this.noteService.EmptyTrash()
    .subscribe(
      (result: any) => 
      {
        this.data.changeMessage(true);
      console.log(result.status);
      this.openSnackBar(result.message);

      },(error: HttpErrorResponse) => {
      console.log(error.error.message);
      console.log(this.trashNotes)
    })
  }
  openSnackBar(message: string) {
    this._snackBar.open(message,'',
    {
      duration:5000,
      horizontalPosition: 'start',
      verticalPosition: 'bottom'
    });
  }
}

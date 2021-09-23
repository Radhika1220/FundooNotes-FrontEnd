import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoteServiceService} from 'src/app/Services/noteservice/note-service.service';
@Component({
  selector: 'app-get-archive',
  templateUrl: './get-archive.component.html',
  styleUrls: ['./get-archive.component.scss']
})
export class GetArchiveComponent implements OnInit {
  pinned:boolean=true;
  archiveNotes!:any[];
  constructor(private noteService:NoteServiceService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.GetArchive();
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
}

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NoteServiceService} from 'src/app/Services/noteservice/note-service.service';
@Component({
  selector: 'app-trash-notes',
  templateUrl: './trash-notes.component.html',
  styleUrls: ['./trash-notes.component.scss']
})
export class TrashNotesComponent implements OnInit {
trashNotes!:any[];
  constructor(private noteService:NoteServiceService) { }

  ngOnInit(): void {
    this.GetTrash();
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
}

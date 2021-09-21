import { Component, OnInit } from '@angular/core';
 import { NoteServiceService} from 'src/app/Services/noteservice/note-service.service';
import { FormControl, FormControlName, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

// import { AddCollaboratorComponent } from '../add-collaborator/add-collaborator.component';
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  NoteForm!:FormGroup
  toggle:boolean=true;
  create=false;
  constructor(
    private noteService:NoteServiceService,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    this.NoteForm=new  FormGroup(
      {
       Title: new FormControl(),
       Description:new FormControl()
   });
  }

  CreateNote()
  {
  this.toggle=!this.toggle;
  console.log("hello");
  this.noteService.CreateNote(this.NoteForm.value).subscribe
  ((result:any)=>{
  this.openSnackBar(result.message , '');
  console.log(result);
  this.NoteForm.reset();
  this.create=false
  }
  );
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action,{
      verticalPosition:'bottom',
      horizontalPosition:'start',
      duration: 2000
    }
    );
  }
  Resize(){
    var textArea = document.getElementById("textarea")!      
    textArea.style.height = 'auto';
    textArea.style.height = Math.min(20,textArea.scrollHeight) + 'px';
  }
  
}

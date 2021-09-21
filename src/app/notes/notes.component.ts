import { Component, OnInit } from '@angular/core';
 import { NoteServiceService} from 'src/app/Services/noteservice/note-service.service';
import { FormControl, FormControlName, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  NoteForm!:FormGroup
  toggle:boolean=true;
  create=false;
  expand:boolean=false;
color:string="";
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
  this.noteService.CreateNote(this.NoteForm.value).subscribe
  ((result:any)=>{
  this.openSnackBar(result.message , '');
  console.log(result);
  this.NoteForm.reset();
  this.create=false
  },
  (error:HttpErrorResponse) => { 
    if(!error.error.status)
    {            
       this.openSnackBar(error.error.message , '');
    }
    else
    {
      this.openSnackBar('Unsuccessful , Please Try again!!!' , '');
    }
    
 });
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action,{
      verticalPosition:'bottom',
      horizontalPosition:'center',
      duration: 5000
    }
    );
  }
  Resize(){
    var textArea = document.getElementById("textarea")!      
    textArea.style.height = 'auto';
    textArea.style.height = Math.min(20,textArea.scrollHeight) + 'px';
  }
  CardColor(color: any){
    var matcard = document.getElementById("matcard")! 
    var title = document.getElementById("title")! 
    var textarea=document.getElementById("textarea")!
    matcard.style.backgroundColor = color;
    title.style.backgroundColor=color;
    textarea.style.backgroundColor=color;
   this.color=color;
  }

  CheckContent()
{
  console.log(this.NoteForm.value.title);
if(this.NoteForm.value.title != "" || this.NoteForm.value.description != "")
{
  this.expand=true;
}
else{
  this.expand=false;
}

}
ReminderOption()
{
 console.log("reminder"); 
}
}
import { Component, OnInit } from '@angular/core';
 import { NoteServiceService} from 'src/app/Services/noteservice/note-service.service';
import { FormControl, FormControlName, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { CollaboratorDialogBoxComponent } from 'src/app/Components/collaborator-dialog-box/collaborator-dialog-box.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  NoteForm!:FormGroup
  toggle:boolean=true;
  pinned:boolean = false;
  archive:boolean=false;
  create=false;
  expand:boolean=false;
  color:string="";
  constructor(
    private noteService:NoteServiceService,
    private snackBar: MatSnackBar,
    private dialog:MatDialog
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
  let object=
  {
    Title:this.NoteForm.value.Title,
    Description:this.NoteForm.value.Description,
    Pin:this.pinned,
    Archieve:this.archive,
    Color:this.color
  }
  this.noteService.CreateNote(object).subscribe
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
  
openDialog()
{
  let dialogRef =this.dialog.open(CollaboratorDialogBoxComponent);
  dialogRef.afterClosed().subscribe((result: any)=>
    {
      console.log( `Dialog res: ${result}`);
    });
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

PinNote()
{
  this.snackBar.open(`${this.pinned?'Note Unpinned':'Note Pinned'}`, '', {
      duration: 5000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center'
    });
    this.pinned=!(this.pinned);
}


ArchiveNote()
{
  this.snackBar.open(`${this.archive?'Note UnArchived':'Note Archived'}`, '', {
      duration: 5000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center'
    });
    this.archive=!(this.archive);
}
}
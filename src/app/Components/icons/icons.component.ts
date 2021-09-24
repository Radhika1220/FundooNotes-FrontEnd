import { Component,Input, OnInit } from '@angular/core';
import { NoteServiceService} from 'src/app/Services/noteservice/note-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit 
{
  constructor( private noteService:NoteServiceService,
    private snackBar:MatSnackBar) { }
    @Input() note!:any;
    expand!:any;
  ngOnInit(): void {
   
  }
Colors = [ [
    { color: "white", tip: "white" },
    { color: "#F28B82", tip: "Red" },
    { color: "#FBBC04", tip: "Orange" },
    { color: "#FFF475", tip: "Yellow" },
  ],
  [
    { color: "#A7FFEB", tip: "Teal" },
    {color:"#CCFF90",tip:"Green"},
    { color: "#CBF0F8", tip: "Blue" },
    { color: "#AECBFA", tip: "Dark Blue" },
  ],
  [
    { color: "#FDCFE8", tip: "Pink" },
    { color: "#D7AEFB", tip: "Purple" },
    { color: "#E6C9A8", tip: "Brown" },
    { color: "#E8EAED", tip: "Gray" },
  ]]

  SetColor(color:any)
{
  this.noteService.SetColor(this.note.noteId,color)
  .subscribe(
    (result: any) => 
    {
    console.log(result.message);
    console.log(result.data);

    },(error: HttpErrorResponse) => {
    console.log(error.error.message);
  })
  }

  DeleteNote()
  {
    this.noteService.DeleteNote(this.note.noteId).subscribe((result : any) =>{
      console.log(result)
      this.openSnackBar(result.message,'');
    },
    (error:HttpErrorResponse) => { 
    if(!error.error.status){            
       this.openSnackBar(error.error.message,'');
    }
    else
    {
      this.openSnackBar('Unsuccessfull , Try again!','');
    }
    
 });
  }
  openSnackBar(message: string,action: string) {
    this.snackBar.open(message,action,{
      duration: 2000,
      verticalPosition:'bottom',
      horizontalPosition:'start',
    });
  }

  SetArchive()
  {
    console.log(this.note);
    if(this.note.archieve==true)
    {
    this.noteService.UnArchive(this.note.noteId).subscribe((result : any) =>{
        console.log(result)
        this.openSnackBar(result.message,'');
      });
        
    }
    else
    {
      this.noteService.SetArchive(this.note.noteId).subscribe((result : any) =>{
        console.log(result)
        this.openSnackBar(result.message , '');
      },

      (error:HttpErrorResponse) => { 
      if(!error.error.status){            
         this.openSnackBar(error.error.message , '');
      }
      else
      {
        this.openSnackBar('Unsuccessful , Please Try again!' , '');
      }
      
   });
    }
}
}
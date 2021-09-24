import { Component,Input, OnInit } from '@angular/core';
import { NoteServiceService} from 'src/app/Services/noteservice/note-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatChipInputEvent} from '@angular/material/chips';
export interface Remainder {
  name: string;
}
@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit 
{
  rem: Remainder[] = [];
  pickDate:boolean=false;
  selectable = true;
  removable = true;
  reminder:any;
  monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"

];
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.rem.push({name: value});
    }
    event.chipInput!.clear();
  }

  remove(r: Remainder): void {
    const index = this.rem.indexOf(r);

    if (index >= 0) {
      this.rem.splice(index, 1);
    }
  }
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


SetDate(date:string)
{
  if(this.rem.length == 1)
  {
    this.rem.pop();
    // this.pickDate=!this.pickDate;
  }
    console.log(date);
    if(date == 'set')
    {
      let nextDate= this.getMonday(new Date());
      date=  this.monthNames[nextDate.getMonth()] +" "+nextDate.getDate().toString() + ", 8:00 AM"
      console.log(date);
   
    }
  this.reminder=date;
    this.rem.push({name: date});
    this.pickDate=!this.pickDate;
}
getMonday(d:any) {
  d = new Date(d);
  var day = d.getDay(),
      diff = d.getDate() + day + (day == 1 ? 6:(5-day));
  return new Date(d.setDate(diff));
}


PinNote()
{
    this.noteService.PinNote(this.note.noteId)
    .subscribe(
      (result: any) => 
      {
      console.log(result.message);
      this.openSnackBar(result.message,'');
  
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
      this.openSnackBar(result.message,'');
  
      },(error: HttpErrorResponse) => {
      console.log(error.error.message);
    })
  }
// Pin()
//   {
//     console.log(this.note);
//     if(this.note.pin==true)
//     {
//     this.noteService.UnPinNote(this.note.noteId).subscribe((result : any) =>{
//         console.log(result)
//         this.openSnackBar(result.message,'');
//       });
        
//     }
//     else
//     {
//       this.noteService.PinNote(this.note.noteId).subscribe((result : any) =>{
//         console.log(result)
//         this.openSnackBar(result.message , '');
//       },

//       (error:HttpErrorResponse) => { 
//       if(!error.error.status){            
//          this.openSnackBar(error.error.message , '');
//       }
//       else
//       {
//         this.openSnackBar('Unsuccessful , Please Try again!' , '');
//       }
      
//    });
//     }
}


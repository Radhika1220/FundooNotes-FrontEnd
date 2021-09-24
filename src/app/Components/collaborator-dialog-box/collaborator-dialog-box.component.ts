import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CollaboratorServiceService } from 'src/app/Services/CollaboratorService/collaborator-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-collaborator-dialog-box',
  templateUrl: './collaborator-dialog-box.component.html',
  styleUrls: ['./collaborator-dialog-box.component.scss']
})
export class CollaboratorDialogBoxComponent implements OnInit {
  SearchField:any;


constructor(public dialogRef: MatDialogRef<CollaboratorDialogBoxComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private collaboratorService:CollaboratorServiceService,
  private snackBar: MatSnackBar
 
) { }
  userDetails =  JSON.parse(localStorage.getItem('FundooNotes')!); 
  emailsId:string[]=[]
  ngOnInit(): void {
  }

  onClick(): void {
    this.dialogRef.close();
  }

  ClearSearchField() {
console.log(this.emailsId);
this.emailsId.push(this.SearchField);
console.log(this.emailsId);
    this.SearchField = '';
  }

  RemoveCollaborator(email:any)
  {
    this.emailsId.splice(this.emailsId.indexOf(email),1);
  }

  AddCollaborator()
  {
    this.collaboratorService.AddCollaborator(this.data)
    .subscribe((result : any)=>
    {
       console.log(result);
      this.openSnackBar(result.message , '');
       this.ngOnInit();
      this.data.email="";
    },
    (error:HttpErrorResponse) => { 
    if(!error.error.status){            
       this.openSnackBar(error.error.message , '');
    }
    else
    {
      this.openSnackBar('UnSuccessfull, Please Try again!' , '');
    }
    
 });
}
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      verticalPosition:'bottom',
      horizontalPosition:'start',
    });
  }

  Removecollaborator(col:any)
  {
    console.log(col);
    this.collaboratorService.RemoveCollaborator(col.collaboratorId)
    .subscribe((result:any)=>
    {
      console.log(result);
      this.openSnackBar(result.message , '');
      this.ngOnInit();
    },
    (error:HttpErrorResponse) => { 
    if(!error.error.status){            
       this.openSnackBar(error.error.message , '');
    }
    else
    {
      this.openSnackBar('Unsuccessfull , Try again!' , '');
    }
    
 });
}
}
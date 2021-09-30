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
  emailId:string[]=[]
  collabData:any;
  ngOnInit(): void {
    console.log(this.data.collab);
    this.GetCollab();
    this.data.currentMessage.subscribe((change:any)=>{
      if(change == true){
        this.GetCollab();
        this.data.changeMessage(false);
      }
  })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  

  onClick(): void {
    this.dialogRef.close();
  }


  RemoveCollaborator(email:any)
  {
    this.emailId.splice(this.emailId.indexOf(email),1);
  }
  Save(){
    this.dialogRef.close(this.data.collab);
 }
 Close(){
   this.dialogRef.close(this.data.collab);
 }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      verticalPosition:'bottom',
      horizontalPosition:'start',
    });
  }



clearSearchField() {
  console.log(this.emailId);
  if(this.data.element == 1)
  {
    this.AddCollab(this.SearchField);
  }
  this.emailId.push(this.SearchField);
  console.log(this.emailId);
      this.SearchField = '';
    }


    AddCollab(element:any)
  {
    this.collaboratorService.AddCollaborator(element,this.data.noteId)
    .subscribe(
      (status: any) => 
      {
        this.data.changeMessage(true);
        this.ngOnInit();
      console.log(status.notesId);
      this.openSnackBar(status.message,'');
      },(error: HttpErrorResponse) => {
      console.log(error.error.message);
    })
  
  }

  GetCollab()
{
  console.log(this.data.noteId);
  this.collaboratorService.GetCollaborator(this.data.noteId)
  .subscribe(
    (status: any) => 
    {
      console.log(status.data);
      this.emailId=[];
      if(status.data != null)
      {
        status.data.forEach((element:any) => {
          this.emailId.push(element.cEmailId);
        });
        this.collabData=status.data;
      }

    console.log(status.data);
    },(error: HttpErrorResponse) => {
    console.log(error.error.message);
  });
}

RemoveCollabs(email:any)
{

  this.collabData.forEach((element:any) => {

    if(element.cEmailId == email)
    {
      this.collaboratorService.RemoveCollaborator(element.cId)
      .subscribe(
        (result: any) => 
        {
          this.ngOnInit();
          this.openSnackBar(result.message,'');
        console.log(result.data);
        this.data.changeMessage(true);
        }
        ,(error: HttpErrorResponse) => {
        console.log(error.error.message);
      });
    }
  });
}

}
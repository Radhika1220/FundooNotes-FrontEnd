import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-collaborator-dialog-box',
  templateUrl: './collaborator-dialog-box.component.html',
  styleUrls: ['./collaborator-dialog-box.component.scss']
})
export class CollaboratorDialogBoxComponent implements OnInit {
  SearchField:any;


constructor(public dialogRef: MatDialogRef<CollaboratorDialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
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

}
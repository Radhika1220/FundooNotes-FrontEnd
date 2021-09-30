import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NoteServiceService } from '../Services/noteservice/note-service.service';
import { LabelServiceService } from '../Services/LabelService/label-service.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataserviceService } from '../Services/DataService/dataservice.service';
@Component({
  selector: 'app-edit-label',
  templateUrl: './edit-label.component.html',
  styleUrls: ['./edit-label.component.scss']
})
export class EditLabelComponent implements OnInit {


  constructor(private noteService:NoteServiceService,
    private labelService:LabelServiceService,
    public dialogRef: MatDialogRef<EditLabelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private data1: DataserviceService) { }
  labels:any=[];
  editlabel:any;
  searchField:any;
  currentLabel:any;
  change:boolean=true;
  labelNames:any;
  ngOnInit(): void {
    this.  GetAllLabels();
  }
  clearSearchField() {
    console.log(this.labels);
    this.AddLabelUsingEdit();
    this.labels.push(this.searchField);
    console.log(this.labels);
        this.searchField = '';
      }
  GetAllLabels()
  {
     this.noteService.GetAllLabels().subscribe((result: any) => {
       console.log(result.data);
      this.labels=result.data;
      console.log(this.labels);
    });
  }

  AddLabelUsingEdit()
  {
   this.labelService.AddLabel(this.searchField)
   .subscribe(
     (status: any) => 
     {
      this.data1.changeMessage(true);
      this.  GetAllLabels();
     console.log(status.data);
     },(error: HttpErrorResponse) => {
     console.log(error.error.message);
   });
  }

  save(){

    this.dialogRef.close(this.labels);
 }
 close(){
  this.dialogRef.close(this.data.collab);
}

  EditLabel(label:any)
  {
   label.labelName=this.labelNames;
   console.log(label);
    this.labelService.EditLabel(label)
    .subscribe(
      (status: any) => 
      {
        this.data1.changeMessage(true);
        this.  GetAllLabels();
      console.log(status.data);
      },(error: HttpErrorResponse) => {
      console.log(error.error.message);
    });

  }

  Delete(label:any)
  {
    console.log(label);
   this.labelService.DeleteLabel(label)
   .subscribe(
     (status: any) => 
     {
      this.data1.changeMessage(true);
      this.  GetAllLabels();
     console.log(status.data);
     },(error: HttpErrorResponse) => {
     console.log(error.error.message);
   });
  }

  Change(event:any)
  {
    this.labelNames=event.target.value;
  }
}

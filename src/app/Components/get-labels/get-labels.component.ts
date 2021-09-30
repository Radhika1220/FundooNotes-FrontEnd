import { Component, Input, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { LabelServiceService } from '../../Services/LabelService/label-service.service';
import { DataserviceService } from 'src/app/Services/DataService/dataservice.service';
@Component({
  selector: 'app-get-labels',
  templateUrl: './get-labels.component.html',
  styleUrls: ['./get-labels.component.scss']
})
export class GetLabelsComponent implements OnInit {

  constructor(private labelService: LabelServiceService,
    private data:DataserviceService) { }
  @Input() labelDetails: any
  labelNotes!:any[];
  ngOnInit(): void {
    this.GetLabelNote();
    this.data.currentMessage.subscribe((change:any)=>{
      if(change == true){
        this.GetLabelNote();
        this.data.changeMessage(false);
      }
  })
  }
  GetLabelNote()
  {
    console.log(this.labelDetails);
    this.labelService.GetLabelNote(this.labelDetails)
  .subscribe(
    (result: any) => 
    {
      this.GetLabelNote();
      console.log(this.labelDetails);
    console.log(result.data);
    this.labelNotes=result.data;
    }
    ,(error: HttpErrorResponse) => {
    console.log(error.error.message);
  })
  }
  }
  

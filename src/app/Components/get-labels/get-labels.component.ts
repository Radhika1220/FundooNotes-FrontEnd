import { Component, Input, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { LabelServiceService } from '../../Services/LabelService/label-service.service';
@Component({
  selector: 'app-get-labels',
  templateUrl: './get-labels.component.html',
  styleUrls: ['./get-labels.component.scss']
})
export class GetLabelsComponent implements OnInit {

  constructor(private labelService: LabelServiceService) { }
  @Input() labelDetails: any
  labelNotes!:any[];
  ngOnInit(): void {
    this.GetLabelNote();
  }
  GetLabelNote()
  {
    console.log(this.labelDetails);
    this.labelService.GetLabelNote(this.labelDetails)
  .subscribe(
    (result: any) => 
    {
      console.log(this.labelDetails);
    console.log(result.data);
    this.labelNotes=result.data;
    }
    ,(error: HttpErrorResponse) => {
    console.log(error.error.message);
  })
  }
  }
  

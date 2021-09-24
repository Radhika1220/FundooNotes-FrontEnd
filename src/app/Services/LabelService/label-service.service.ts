import { Injectable } from '@angular/core';
import { HttpServiceService } from '../HttpService/http-service.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LabelServiceService {

  constructor(private httpService : HttpServiceService) { }
  GetLabelNote(data:any)
  {
    var user = JSON.parse(localStorage.getItem('FundooNotes')!);
    const param= 
    {
     LabelId:data.labelId,
     LabelName:data.labelName,
     UserId:user.key
    }
    return this.httpService.post(`${environment.baseUrl}/api/GetNotesByLabel?`,param,true,
    {
      headers: {Authorization:"Bearer "+user.Token}
    });
  }
}
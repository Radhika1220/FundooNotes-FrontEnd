import { Injectable } from '@angular/core';
import { HttpServiceService } from '../HttpService/http-service.service';
import { environment } from 'src/environments/environment';
import { HttpParams } from '@angular/common/http';

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
  // GetLabel(noteId:number,userId:number)
  // {
  
  //   var user = JSON.parse(localStorage.getItem('FundooNotes')!);
  //   return this.httpService.get(`${environment.baseUrl}/api/GetLabelByNotes?noteId=${noteId}&userId=${userId}`,true,
  //   {
  //     headers: {Authorization:"Bearer "+user.Token}
  //   });
  // }
}
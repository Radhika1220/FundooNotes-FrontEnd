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

  EditLabel(label:any)
  {
    console.log(label);
    var user = JSON.parse(localStorage.getItem('FundooNotes')!);
    return this.httpService.post(`${environment.baseUrl}/api/EditLabel?`,label,true,
    {
      headers: {Authorization:"Bearer "+user.Token}
    });
  }

  DeleteLabel(data:any)
  {
    var user = JSON.parse(localStorage.getItem('FundooNotes')!);
    console.log("heloo");
    
    // const param= 
    // {
    //  LabelId:data.labelId,
    //  LabelName:data.labelName,
    //  UserId:user.key
    // }
    // console.log(param);
    var headers={Authorization:"Bearer "+user.Token};
    return this.httpService.delete(`${environment.baseUrl}/api/DeleteLabel?labelId=${data.labelId}`,null,true,headers);
  }
  AddLabel(labelName:string)
  {
    var user = JSON.parse(localStorage.getItem('FundooNotes')!);
    let params = {
      LabelName:labelName,
      UserId: user.key
    };
    console.log(labelName);
    return this.httpService.post(`${environment.baseUrl}/api/AddLabel`, params,true,
    {
     
        headers: {Authorization:"Bearer "+user.Token}
      });
    }
  }
  
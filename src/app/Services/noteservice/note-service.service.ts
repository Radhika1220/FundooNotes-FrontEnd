import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpServiceService } from '../HttpService/http-service.service';
@Injectable({
  providedIn: 'root'
})
export class NoteServiceService {
  constructor(
    private httpService:HttpServiceService
  ) { }
  CreateNote(data:any)
  {
    var user = JSON.parse(localStorage.getItem('FundooNotes')!);
    const param= 
    {
        Title :data.Title,
        Description:data.Description,
        UserId:user.key,
        Color:data.Color,
        Archieve:data.Archieve,
        Pin:data.Pin,
        Remainder:data.Remainder
    }
    return this.httpService.post(`${environment.baseUrl}/api/AddNotes`,param,true,
    {
      headers: {Authorization:"Bearer "+user.Token}
    });
  }

  GetNotes()
  {
    var user = JSON.parse(localStorage.getItem('FundooNotes')!);
    return this.httpService.get(`${environment.baseUrl}/api/GetNotes?userId=${user.key}`,true,
    {
      headers: {Authorization:"Bearer "+user.Token}
    });
  }
GetAllLabels()
{
  var user = JSON.parse(localStorage.getItem('FundooNotes')!);
  return this.httpService.get(`${environment.baseUrl}/api/GetAllLabels?userId=${user.key}`,true,
  {
    headers: {Authorization:"Bearer "+user.Token}
  });
}
GetReminder()
{
  var user = JSON.parse(localStorage.getItem('FundooNotes')!);
  return this.httpService.get(`${environment.baseUrl}/api/GetNotesFromRemainder?userId=${user.key}`,true,
  {
    headers: {Authorization:"Bearer "+user.Token}
  });
}
}

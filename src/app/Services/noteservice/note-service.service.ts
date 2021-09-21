import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpServiceService } from '../HttpService/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class NoteServiceService {
  // user = JSON.parse(localStorage.getItem('FundooNotes')!);
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
        UserId:user.key
    }
    return this.httpService.post(`${environment.baseUrl}/api/AddNotes`,param,true,
    {
      headers: {Authorization:"Bearer "+user.Token}
    });
  }
}

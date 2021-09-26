
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpServiceService } from '../HttpService/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorServiceService {

  constructor(    private httpService:HttpServiceService) { }

  AddCollaborator(emailId:any,noteId:any)
  {
    var user = JSON.parse(localStorage.getItem('FundooNotes')!);
    var param=
    {
      NoteId:noteId,
      CEmailId:emailId
     
    }
    return this.httpService.post(`${environment.baseUrl}/api/AddCollaborator`,param,true,
    {
      headers: {Authorization:"Bearer "+user.Token}
  });
}
RemoveCollaborator(collaboratorId:any)
{
  var user = JSON.parse(localStorage.getItem('FundooNotes')!);
  return this.httpService.delete(`${environment.baseUrl}/api/DeleteCollaborator?collaboratorId=${collaboratorId}`,true,
  {
    headers: {Authorization:"Bearer "+user.Token}
  });
}
GetCollaborator(noteId:number)
{
  var user = JSON.parse(localStorage.getItem('FundooNotes')!);
  return this.httpService.get(`${environment.baseUrl}/api/GetCollaborator?noteId=${noteId}`,true,
  {
    headers: {Authorization:"Bearer "+user.Token}
  });
}
}
import { HttpParams } from '@angular/common/http';
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

GetArchive()
{
  var user = JSON.parse(localStorage.getItem('FundooNotes')!);
  return this.httpService.get(`${environment.baseUrl}/api/GetNotesFromArchive?userId=${user.key}`,true,
  {
    headers: {Authorization:"Bearer "+user.Token}
  });
}

GetTrash()
{
  var user = JSON.parse(localStorage.getItem('FundooNotes')!);
  return this.httpService.get(`${environment.baseUrl}/api/GetNotesFromTrash?userId=${user.key}`,true,
  {
    headers: {Authorization:"Bearer "+user.Token}
  });
}
DeleteTrash(noteId:any)
{
  var user = JSON.parse(localStorage.getItem('FundooNotes')!);
  return this.httpService.delete(`${environment.baseUrl}/api/DeleteNotes?noteId=${noteId}`,null,true,
 {
  headers: {Authorization:"Bearer "+user.Token}
 });
}

RestoreTrash(noteId:any)
{
  var user = JSON.parse(localStorage.getItem('FundooNotes')!);
  return this.httpService.put(`${environment.baseUrl}/api/RestoreNotes?noteId=${noteId}`,null,true,
 {
  headers: {Authorization:"Bearer "+user.Token}
 });
}

UploadImage(noteId:any,file:any)
{
  var user = JSON.parse(localStorage.getItem('FundooNotes')!);
  // let image = new FormData();
  // image.append("image",file);

    return this.httpService.post(`${environment.baseUrl}/api/UploadImage?noteId=${noteId}`,file,true,
    {
      headers: {Authorization:"Bearer "+user.Token}
    } );
    
}
EmptyTrash()
{
  var user = JSON.parse(localStorage.getItem('FundooNotes')!); 
  return this.httpService.delete(`${environment.baseUrl}/api/EmptyTrash?userId=${user.key}`,null,true,
  {
   headers: {Authorization:"Bearer "+user.Token}
  });
}

SetColor(noteId:any,color:string)
{
  var user = JSON.parse(localStorage.getItem('FundooNotes')!); 
  console.log(color);
  console.log(noteId);
  let params = new HttpParams().set('noteId',noteId).set('color',color);
  return this.httpService.put(`${environment.baseUrl}/api/ChangeColor`,params,true,
  {
    headers: {Authorization:"Bearer "+user.Token}
  } );
}
DeleteNote(noteId:number)
{
  var user = JSON.parse(localStorage.getItem('FundooNotes')!); 
  return this.httpService.put(`${environment.baseUrl}/api/TrashNotes?noteId=${noteId}`,null,true,
  {
    headers: {Authorization:"Bearer "+user.Token}
  });
}

SetArchive(noteId:number)
{
  var user = JSON.parse(localStorage.getItem('FundooNotes')!); 
  return this.httpService.put(`${environment.baseUrl}/api/ArchiveNotes?noteId=${noteId}`,null,true,
  {
    headers: {Authorization:"Bearer "+user.Token}
  });
}
UnArchive(noteid:number)
{
  var user = JSON.parse(localStorage.getItem('FundooNotes')!);
  return this.httpService.put(`${environment.baseUrl}/api/UnArchiveNotes?noteId=${noteid}`,null,true,
  {
    headers: {Authorization:"Bearer "+user.Token}
  });
}

PinNote(noteId:number)
{
  var user = JSON.parse(localStorage.getItem('FundooNotes')!);

  return this.httpService.put(`${environment.baseUrl}/api/PinNotes?noteId=${noteId}`,null,true,
  {
    headers: {Authorization:"Bearer "+user.Token}
  });
}

UnPinNote(noteId:number)
{
  var user = JSON.parse(localStorage.getItem('FundooNotes')!);
  return this.httpService.put(`${environment.baseUrl}/api/UnPinNotes?noteId=${noteId}`,null,true,
  {
    headers: {Authorization:"Bearer "+user.Token}
  });
}

SetReminder(noteId:any,remainder:any)
{
  var user = JSON.parse(localStorage.getItem('FundooNotes')!);

  return this.httpService.put(`${environment.baseUrl}/api/ChangeReminder?noteId=${noteId}&remainder=${remainder}`,null,true,
  {
    headers: {Authorization:"Bearer "+user.Token}
  });
}

DeleteReminder(noteId:any)
{
  var user = JSON.parse(localStorage.getItem('FundooNotes')!);
 
  return this.httpService.put(`${environment.baseUrl}/api/ChangeReminder?noteId=${noteId}`,null,true,
  {
    headers: {Authorization:"Bearer "+user.Token}
  });
}
CreateLabelForNote(labelName:any,noteId:any)
{
  var user = JSON.parse(localStorage.getItem('FundooNotes')!);
  var param={
    LabelName:labelName,
    NoteId:noteId
  };

  console.log("email"+param);
  return this.httpService.post(`${environment.baseUrl}/api/CreateLabel`, param,true,
  {
    headers: {Authorization:"Bearer "+user.Token}
  });

  
}
RemoveImage(noteId:any)
{
  var user = JSON.parse(localStorage.getItem('FundooNotes')!);
 
  return this.httpService.put(`${environment.baseUrl}/api/RemoveImage?noteId=${noteId}`,null,true,
  {
    headers: {Authorization:"Bearer "+user.Token}
  });
}
UpdateNote(data:any)
{
  var user = JSON.parse(localStorage.getItem('FundooNotes')!);
  const param= 
  {
      Title :data.title,
      Description:data.description,
  
      NoteId:data.noteId
  }
  return this.httpService.put(`${environment.baseUrl}/api/UpdateNotes`,param,true,
  {
    headers: {Authorization:"Bearer "+user.Token}
  });
}
}

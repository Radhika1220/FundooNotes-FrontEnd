import { Component, OnInit } from '@angular/core';
import { NoteServiceService } from 'src/app/Services/noteservice/note-service.service';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {
  isGrid=false;
  opened: boolean = true;
  // SearchField:any;
   constructor(
    private noteService:NoteServiceService
   ) { }
  userDetails:any;
  labels:any=[];
  ngOnInit(): void {
     this.userDetails = JSON.parse(localStorage.getItem('FundooNotes')!);
     this.GetAllLabels();
  }
  // ClearSearchField() 
  // {
  //   this.SearchField = '';
  // }
  //   Logout(){
  //     if(this.userDetails!= null){
  //         localStorage.removeItem("FundooNotes");
  //         this.router.navigateByUrl('/Login');
  //     }
  // }

  GetAllLabels()
  {
     this.noteService.GetAllLabels().subscribe((result: any) => {
       console.log(result.data);
      this.labels=result.data;
      console.log(this.labels);
    });
  }
}
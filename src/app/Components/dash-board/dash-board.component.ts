import { Component, OnInit } from '@angular/core';
import { NoteServiceService } from 'src/app/Services/noteservice/note-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {
  isGrid=false;
  opened: boolean = true;
  getnotes="Notes";
   constructor(
    private noteService:NoteServiceService,
    private router:Router
   ) { }
  userDetails:any;
  labels:any=[];
  ngOnInit(): void {
     this.userDetails = JSON.parse(localStorage.getItem('FundooNotes')!);
     this.GetAllLabels();
  }

    Logout(){
      if(this.userDetails!= null){
          localStorage.removeItem("FundooNotes");
          this.router.navigateByUrl('/Login');
      }
  }

  GetAllLabels()
  {
     this.noteService.GetAllLabels().subscribe((result: any) => {
       console.log(result.data);
      this.labels=result.data;
      console.log(this.labels);
    });
  }
}
import { Component, OnInit } from '@angular/core';
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
   constructor() { }
  userDetails:any;
  ngOnInit(): void {
     this.userDetails = JSON.parse(localStorage.getItem('FundooNotes')!);
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
}

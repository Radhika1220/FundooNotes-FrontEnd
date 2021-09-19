import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {
  isGrid=false;
  opened: boolean = true;
  constructor() { }
  userDetails:any;
  ngOnInit(): void {
     this.userDetails = JSON.parse(localStorage.getItem('FundooNotes')!);
  }
  //   Logout(){
  //   var user = JSON.parse(localStorage.getItem("FundooUser")!);
  //     if(user != null){
  //         localStorage.removeItem("FundooUser");
  //         this.route.navigateByUrl('/login');
  //     }
  // }
}

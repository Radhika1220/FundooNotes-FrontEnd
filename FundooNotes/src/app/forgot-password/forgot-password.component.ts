import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { UserServiceService } from 'src/app/Services/UserService/user-service.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  ForgotForm!:FormGroup;
  constructor
    (
      private userService:UserServiceService,
      public _snackBar: MatSnackBar)
   { }

  ngOnInit(): void {
    this.ForgotForm=new FormGroup(
      {
        email : new FormControl('',[Validators.required,Validators.email])
  }
    );
  }
  ForgotPassword()
  {
    this.userService.ForgotPassword(this.ForgotForm.value)
    .subscribe((result:any)=>
    {
      console.log(result);
      this.openSnackBar(result.message,'');
   }, (error:HttpErrorResponse) => { 
     if(!error.error.status){            
       this.openSnackBar(error.error.message , '');
     }
     else
     {
      this.openSnackBar('Please Enter EmailId!' , '');
     }
    })
 }
 openSnackBar(message: string, action: string) {
   this._snackBar.open(message, action, {
      duration: 5000
   }); 
}
}


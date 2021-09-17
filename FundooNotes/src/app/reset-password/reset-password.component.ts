import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/Services/UserService/user-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  ResetForm!:FormGroup;
  hide=true
  constructor(
    private userService: UserServiceService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.ResetForm=new FormGroup(
      {
        password : new FormControl('',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
        confirmPassword:new FormControl('',[Validators.required])
      }
    );
  }
  ResetPassword()
  { 
    var d=localStorage.getItem('forgot-password');
  
    var email=JSON.parse(d!).email;
  
   this.userService.ResetPassword(email,this.ResetForm.value)
   .subscribe((result : any)=>
   {
      console.log(result);
      this.openSnackBar(result.message , '');
      if(result.status==true)
      {
         this.router.navigateByUrl('/Login');
      } 
      
   },
   (error:HttpErrorResponse) => { 
     if(!error.error.status){            
       this.openSnackBar(error.error.message , '');
     } else
     {
       this.openSnackBar('Unsuccessful , Please Try again!!!' , '');
     }
  }
   )
  }
 
  openSnackBar(message: string, action: string) {
   this.snackBar.open(message, action, {
      duration: 5000
   }); 
 }

}


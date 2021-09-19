import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserServiceService } from 'src/app/Services/UserService/user-service.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  LoginForm!:FormGroup;
  hide=true;
  constructor( private userService:UserServiceService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.LoginForm=new FormGroup(
      {
        email : new FormControl('',[Validators.required,Validators.email]),
        password : new FormControl('',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])
      }
    );
  }

  Login()
  {
    this.userService.Login(this.LoginForm.value)
    .subscribe((result : any)=>
    {
       console.log(result);
       this.openSnackBar(result.message , '');
       var params=
       {
         key:result.userData.userId,
         FirstName:result.userData.firstName,
         LastName:result.userData.lastName,
         Email:result.userData.email,
         Token:result.data
       }
       localStorage.setItem('FundooNotes',JSON.stringify(params));
    },
      (error:HttpErrorResponse) => { 
      if(!error.error.status)
      {            
         this.openSnackBar(error.error.message , '');
      }
      else
      {
        this.openSnackBar('Unsuccessful , Please Try again!!!' , '');
      }
      
   })
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
       duration: 5000
    }); 
 } 
}

  

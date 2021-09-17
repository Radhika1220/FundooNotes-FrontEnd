import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from 'src/app/Services/UserService/user-service.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router} from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  RegisterForm!:FormGroup;
  hide=true;
  constructor(
    private userService:UserServiceService,
    public _snackBar: MatSnackBar,
    private router:Router)
    {}

  ngOnInit(): void {
    this.RegisterForm=new FormGroup(
      {
        firstName : new FormControl('',[Validators.required,Validators.pattern('^[A-Z]{1}[A-Za-z]{2,}'),Validators.minLength(3)]),
        lastName : new FormControl('',[Validators.required,Validators.pattern('^[A-Z]{1}[A-Za-z]{2,}'),Validators.minLength(3)]),
        email : new FormControl('',[Validators.required,Validators.email]),
        password : new FormControl('',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
        confirmPassword:new FormControl('',[Validators.required])
      }
    );
  }
  Register()
  {
    this.userService.Register(this.RegisterForm.value)
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
      }
      else
      {
        this.openSnackBar('Registration Unsuccessful , Try again!' , '');
      }
    })
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
       duration: 2000
    }); 
 } 
}
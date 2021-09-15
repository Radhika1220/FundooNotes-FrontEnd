import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  RegisterForm!:FormGroup;
  hide=true;
  constructor() { }

  ngOnInit(): void {
    this.RegisterForm=new FormGroup(
      {
        firstName : new FormControl('',[Validators.required,Validators.pattern('^[A-Z]{1}[A-Za-z]{2,}'),Validators.minLength(3)]),
        lastName : new FormControl('',[Validators.required,Validators.pattern('^[A-Z]{1}[A-Za-z]{2,}'),Validators.minLength(3)]),
        email : new FormControl('',[Validators.required,Validators.email]),
        password : new FormControl('',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])
      }
    );
  }
}

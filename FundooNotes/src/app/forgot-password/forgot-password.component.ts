import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  ForgotForm!:FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.ForgotForm=new FormGroup(
      {
        email : new FormControl('',[Validators.required,Validators.email])
  }
    );
  }
}

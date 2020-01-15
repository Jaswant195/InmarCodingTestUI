import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';    
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  errorMessage:string;    
  constructor(private formBuilder: FormBuilder,private router:Router, private LoginService : LoginService) { }    
  
  
ngOnInit() {
  this.loginForm = this.formBuilder.group({
    UserName: ['', Validators.required],
    Password: ['', Validators.required]
  })
}

// convenience getter for easy access to form fields
get formControls() { return this.loginForm.controls; }

isLoggedIn() {
  if (localStorage.getItem('currentUser')) {
    return true;
  }
  return false;
}

login(){ 
  this.submitted = true;

  if(this.loginForm.invalid){
    return;
  }   

  this.LoginService.Login(this.loginForm.value).subscribe(    
    (data : any) => { 
        localStorage.setItem('userToken',data.access_token);
        this.router.navigate(['/UserDetails']);    
    },    
    (error:HttpErrorResponse) => {    
      this.errorMessage = error.message;    
    });    
};

}

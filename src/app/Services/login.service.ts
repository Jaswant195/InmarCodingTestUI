import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginInfo } from '../Models/login-info';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  Url :string;  
  header : any;  
  constructor(private http : HttpClient) {   
  
    this.Url = 'http://localhost:50431/api/v1/Login/';  
  }  

  Login(model : LoginInfo){ 
    return this.http.post<any>(this.Url, model)
  } 
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from './helper';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http:HttpClient
  ){}

  
  // to generate token
  public generateToken(loginData:any) {
    return this.http.post(`${baseUrl}/auth/token`,loginData);
  }

  //get current user
public getCurrentUser() {
  return this.http.get(`${baseUrl}/auth/current-user`);
}

  // loging user set in the local storage
  public loginUser(token:any) {
    localStorage.setItem('token',token);
    return true;
  }

    // isLogin: is a user login or not
    public isLoggedIn() {
      let tokenStr = localStorage.getItem("token");
  
      if(tokenStr == undefined || tokenStr == '' || tokenStr == null) {
        return false;
        
      } else {
        return true;
               
      }
    }

      // logout: remove token from localStorage
  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  // get token
  public getToken() {
    return localStorage.getItem('token');
  }

   // set userDetails
   public setUser(user:any) {
    return localStorage.setItem("user", JSON.stringify(user));
  }

  public getUser() {
    let userStr = localStorage.getItem('user');
    if(userStr != null) {
      return JSON.parse(userStr);
    }else {
      this.logout();
      return null;
    }
  }

   // get user role
   public getUserRole () {
    let user = this.getUser();
    return user.authorities[0].authority;
  }
 
}

import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private login:LoginService,
    private snack:MatSnackBar
  ){}

  loginData = {
    username: '',
    password:''
  }
    ngOnInit(): void {
        
    }
  
  
    loginSubmit(){
      if(this.loginData.username.trim()=="" || this.loginData.username.trim()==null) {
  
        this.snack.open('Username is required!!', 'OK', {
          duration: 3000
        });
      return;
      }  
      else if(this.loginData.password.trim()=='' || this.loginData.password.trim()==null) {
     
          this.snack.open('Password is required!!', 'OK', {
            duration: 3000
          });
  
      return;
      }
  
      //request server to generate token
      this.login.generateToken(this.loginData).subscribe(
        (data:any)=>{
          // console.log("success!!");
          // console.log(data); 
          
          // login--------------
          this.login.loginUser(data.token);
          this.login.getCurrentUser().subscribe(
            (user:any)=> {
              this.login.setUser(user);
              // console.log(user);
  
          //     //redirect to admin...
          //     //redirect to normal....
              if(this.login.getUserRole()=="ADMIN") {
                window.location.href = ''
  
              }else if(this.login.getUserRole() == "NORMAL") {
  
                window.location.href = ''
  
              }else {
                this.login.logout();
              }
              
            }
          )
  
          
        },
        (error) => {
          console.log("Token is not generate!!!",error); 
          this.snack.open('Invalid Details!', 'Try again', {
            duration: 3000
          });
          
        }
      )
     
    }
}

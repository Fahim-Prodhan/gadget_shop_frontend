import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(
    private snack: MatSnackBar,
    private userService:UserService,
    private router:Router
  ) {}

  public user = {
    username:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
    password:'',
  
  }

  formSubmit() {
    if(this.user.username=='' || this.user.username == null ) {
      // alert("user name required!")
      this.snack.open('Username is required!!', 'OK', {
        duration: 3000
      });
      return;
    }
    if(this.user.email=='' || this.user.email == null ) {
      // alert("user name required!")
      this.snack.open('Email is required!!', 'OK', {
        duration: 3000
      });
      return;
    }


this.userService.addUser(this.user).subscribe(
  (data:any)=>{
    Swal.fire({
      title: 'Register',
      text: 'Your account has been created successfully!',
      icon: 'success',
      confirmButtonText: 'Ok',
      
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['login'])
      } 
    });
    
  }, (error) => {
    console.log(error);
    this.snack.open('Something is went wrong', 'OK', {
      duration: 3000
    });
  }
);

  }

}

import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  newPasswordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;

  constructor(private passwordChangeService: UserService) {}

 
  toggleNewPasswordVisibility() {
    this.newPasswordVisible = !this.newPasswordVisible;
  }

  toggleConfirmPasswordVisibility() {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
  }

  submitForm() {
    this.passwordChangeService.changePassword(this.oldPassword, this.newPassword, this.confirmPassword).subscribe(
      (response) => {
        if (response === 'Success') {
          Swal.fire("Success!!","Password is Changed sucessfully", 'success').then((e)=>{
            window.location.reload();
          })
        } else {
          console.error('Password change failed');
          alert("Failed")
        }
      },
      (error) => {
        Swal.fire("Error!!","Password change failed !", 'error')

      }
    );
  }

}

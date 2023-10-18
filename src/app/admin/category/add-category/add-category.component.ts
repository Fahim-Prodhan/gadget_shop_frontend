import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {

  constructor(private _snack:MatSnackBar, private _cat:CategoryService){}

  category={
    categoryId:'',
    title:''
  }

  formSubmit(){
    if(this.category.title.trim()=='' || this.category.title==null) {
      this._snack.open("Title Required!",'Ok',{
        duration:3000
      })
      return;
    }

    // adding
    this._cat.addCategory(this.category).subscribe(
      (data:any)=>{
        Swal.fire("Success!!","Category is added sucessfully", 'success').then((e)=>{
          window.location.reload();
        })
      },
      (error)=> {
        // console.log(error);
        Swal.fire("Error!!","Category is not added ", 'error')
      }
    )
  }

}

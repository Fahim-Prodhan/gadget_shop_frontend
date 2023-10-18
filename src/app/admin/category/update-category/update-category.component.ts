import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

interface Category {
  categoryId:any,
  title:any
}

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent {

  category:Category = {
    categoryId:'',
    title:''
  }

  constructor(
    private _cat:CategoryService,
    @Inject(MAT_DIALOG_DATA) public data:{categoryId:any},
    private dialogRef:MatDialogRef<UpdateCategoryComponent>
  ){
    this._cat.getSingleCategory(data.categoryId).subscribe((D:any)=>{
      this.category = D
    })
  }

  updateCategory() {
    this._cat.updateCategory(this.category).subscribe(
      (data:any)=>{
        Swal.fire("Success!!","Category is Updated sucessfully", 'success').then((e)=>{
          window.location.reload();
        })
        this.dialogRef.close();
      },
      (error) =>{
        console.log(error);
          Swal.fire("Error!!","Error! Category can't update ", 'error')
        
      }
    )
  }

}

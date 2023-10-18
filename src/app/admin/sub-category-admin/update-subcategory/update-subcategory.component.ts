import { Component, Inject,OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import Swal from 'sweetalert2';

interface SubCategory {
  subCategoryId:any,
  categoryId:any,
  name:any
}

@Component({
  selector: 'app-update-subcategory',
  templateUrl: './update-subcategory.component.html',
  styleUrls: ['./update-subcategory.component.css']
})
export class UpdateSubcategoryComponent implements OnInit{


  subcategory:SubCategory = {
    subCategoryId:'',
    categoryId:'',
    name:''
  }

  categories=[{
    categoryId:'',
    title:''
  }]

  constructor(
    private _cat:CategoryService,
    private _subcat:SubcategoryService,
    @Inject(MAT_DIALOG_DATA) public data:{subCategoryId:any},
    private dialogRef:MatDialogRef<UpdateSubcategoryComponent>
  ){
    this._subcat.getSingleSubCategory(data.subCategoryId).subscribe((D:any)=>{
      this.subcategory = D
    })
  }


  ngOnInit(): void {
      this._cat.getAllCategories().subscribe(
        (data:any)=>{
          this.categories = data;
        },
        (error)=>{
          console.log(error);
        }
      )
  }

  updateSubCategory() {
    this._subcat.updateSubCategory(this.subcategory).subscribe(
      (data:any)=>{
        Swal.fire("Success!!","SubCategory is Updated sucessfully", 'success').then((e)=>{
          window.location.reload();
        })
        this.dialogRef.close();
      },
      (error) =>{
        console.log(error);
          Swal.fire("Error!!","Error! SubCategory can't update ", 'error')
        
      }
    )
  }

}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import Swal from 'sweetalert2';
import { AddSubcategoryComponent } from '../add-subcategory/add-subcategory.component';
import { UpdateSubcategoryComponent } from '../update-subcategory/update-subcategory.component';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-subcategory-admin',
  templateUrl: './subcategory-admin.component.html',
  styleUrls: ['./subcategory-admin.component.css']
})
export class SubcategoryAdminComponent implements OnInit{
  filter: any;
  page=1
  searchText:any;
  pageSize = 30;

  categoryId:any

  subcategories = [{
    subCategoryId:'',
    categoryId:'',
    name:''
  }]

  subcategory={
    subCategoryId:'',
    categoryId:'',
    name:''
  }

  category ={
    title:''
  }


  constructor(
      private _subcat:SubcategoryService,
      private _cat:CategoryService,
      private _dialog:MatDialog,
      private _route:ActivatedRoute,
      private _snack:MatSnackBar
     ){}


  ngOnInit(): void {
    //getting category Id from url
    this.categoryId = this._route.snapshot.params['categoryId']

    this.subcategory.categoryId = this.categoryId;

    //get subcategory of a category
      this._subcat.getSubcategoryOfCategory(this.categoryId).subscribe(
        (data:any)=>{
          this.subcategories = data
        },
        (error)=>{
          Swal.fire("Error","Error in loading data",'error')
          
        }
      )
      
      //category get
      this._cat.getSingleCategory(this.categoryId).subscribe(
        (data:any)=>{
          this.category = data
        },
        (error)=>{
          Swal.fire("Error","Error in loading data",'error')
          
        }
      )
  }


  openAddForm(){
    this._dialog.open(AddSubcategoryComponent,{
      width:"400px"
    })
  }
  
  openUpdateForm(subCategoryId:any){
    const dialogRef = this._dialog.open(UpdateSubcategoryComponent,{
      width:"400px",
      data:{subCategoryId}
    })
  }

  //delete category
  deleteCategory(subCategoryId:any){
    Swal.fire(
      {
        icon:'info',
        title:'Are You Sure?',
      confirmButtonText:'Delete',
      showCancelButton:true
      }
    ).then((result)=>{
      if(result.isConfirmed){
        this._subcat.deleteSubCategory(subCategoryId).subscribe(
          
        (data)=>{
          this.subcategories = this.subcategories.filter((c)=>c.subCategoryId != subCategoryId);
          Swal.fire("Deleted","Category is deleted","success");
        },
      (error)=>{
        console.log(error);       
      }
        )
      }
    })
  }

  formSubmit(){
    if(this.category.title.trim()=='' || this.category.title==null) {
      this._snack.open("Title Required!",'Ok',{
        duration:3000
      })
      return;
    }

    // adding
    this._subcat.addSubCategory(this.subcategory).subscribe(
      (data:any)=>{
        Swal.fire("Success!!","Category is add sucessfully", 'success').then((e)=>{
          window.location.reload();
        })
      },
      (error)=> {
        console.log(error);
        Swal.fire("Error!!","Bus is not add ", 'error')
      }
    )
  }

}

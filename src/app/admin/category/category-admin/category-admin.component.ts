import { Component,OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { UpdateCategoryComponent } from '../update-category/update-category.component';


@Component({
  selector: 'app-category-admin',
  templateUrl: './category-admin.component.html',
  styleUrls: ['./category-admin.component.css']
})
export class CategoryAdminComponent implements OnInit{
  filter: any;
  page=1
  searchText:any;
  pageSize = 30;

  categories = [{
    categoryId:"",
    title:''
  }]

  constructor(
      private _cat:CategoryService,
      private _dialog:MatDialog
     ){}


  ngOnInit(): void {
      this._cat.getAllCategories().subscribe(
        (data:any)=>{
          this.categories = data
        },
        (error)=>{
          Swal.fire("Error","Error in loading data",'error')
          
        }
      )
  }


  openAddForm(){
    this._dialog.open(AddCategoryComponent,{
      width:"400px"
    })
  }
  openUpdateForm(categoryId:any){
    const dialogRef = this._dialog.open(UpdateCategoryComponent,{
      width:"400px",
      data:{categoryId}
    })
  }

  deleteCategory(catId:any){
    Swal.fire(
      {
        icon:'info',
        title:'Are You Sure?',
      confirmButtonText:'Delete',
      showCancelButton:true
      }
    ).then((result)=>{
      if(result.isConfirmed){
        this._cat.deleteCategory(catId).subscribe(
          
        (data)=>{
          this.categories = this.categories.filter((c)=>c.categoryId != catId);
          Swal.fire("Deleted","Category is deleted","success");
        },
      (error)=>{
        console.log(error);       
      }
        )
      }
    })
  }

}

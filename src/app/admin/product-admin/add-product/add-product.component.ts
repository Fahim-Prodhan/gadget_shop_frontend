import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FileHandle } from 'src/app/services/Models/fileHandle';
import { Product } from 'src/app/services/Models/productModel';
import { CategoryService } from 'src/app/services/category.service';
import { ProductsService } from 'src/app/services/products.service';
import Swal from 'sweetalert2';
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';



@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit{

public Editor = ClassicEditor

  
  subCategoryId:any

  constructor(private _product:ProductsService,
              private _cat:CategoryService,
              private _route:ActivatedRoute,
              private sanitizer:DomSanitizer,
              private snack:MatSnackBar
              ){
                
              }

  product:Product ={
  productId:null,
  categoryId:'',
  productName:'',
  shortDescription:'',
  longDescription:'',
  regularPrice:'',
  discountPrice:'',
  quantity:'',
  available:true,
  subCategoryId:'',
  productImages:[]
  }

  categories=[{
    categoryId:'',
    title:'',
  }]

  addProduct(productForm:NgForm){   
    if(!productForm.valid){
      this.snack.open('Field Required!', 'Try again', {
        horizontalPosition:'right',
        verticalPosition:'bottom',
        duration: 3000
      }); 
      return;
    } else{
      const productformData = this.prepareFormData(this.product);
      this._product.addProduct(productformData).subscribe(
        (response: any)=>{
          Swal.fire("Success!!","Product is add sucessfully", 'success').then((e)=>{ 
            window.location.reload()
          })
          
          productForm.reset();
          
        },
        (error:any)=>{
          console.log(error);
          Swal.fire("Error!!","Product is not add ", 'error')     
          
        }
      )
    }
   

  }




  ngOnInit(): void {
    this.subCategoryId =  this._route.snapshot.params['subCategoryId']
    this.product.subCategoryId = this.subCategoryId; 
    this.getAllCategories()
}

getAllCategories(){
  this._cat.getAllCategories().subscribe(
    (data:any)=>{
      this.categories = data;
    },
    (error)=>{
      console.log(error);
      
    }
  )
}



  prepareFormData(product:Product): FormData {
    const formData = new FormData();
    formData.append(
      'product',
      new Blob([JSON.stringify(product)],{type:'application/json'})
    );
    for(var i = 0; i < product.productImages.length;i++){
      formData.append(
        'imageFile',
        product.productImages[i].file,
        product.productImages[i].file.name
      )
    }

    return formData;

  }



 

  onFileSelected(event:any){
    if(event.target.files){
      const file = event.target.files[0];

      const fileHandle:FileHandle={
        file:file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }

      this.product.productImages.push(fileHandle);

    }
    
  }

  removeImages(i:number){
    this.product.productImages.splice(i,1);
  }

}

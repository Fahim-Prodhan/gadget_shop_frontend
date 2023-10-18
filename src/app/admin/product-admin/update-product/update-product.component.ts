import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FileHandle } from 'src/app/services/Models/fileHandle';
import { Product } from 'src/app/services/Models/productModel';
import { ProductsService } from 'src/app/services/products.service';
import Swal from 'sweetalert2';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit{

  subCategoryId:any
  public Editor = ClassicEditor

  constructor(private _product:ProductsService,
              private _route:ActivatedRoute,
              private sanitizer:DomSanitizer,
              private snack:MatSnackBar
              ){
                
              }

  product:Product ={
  productId:0,
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

  updateProduct(productForm:NgForm){   
    if(!productForm.valid){
      this.snack.open('Field Required!', 'Try again', {
        horizontalPosition:'right',
        verticalPosition:'bottom',
        duration: 3000
      }); 
      return;
    } else{
      const productformData = this.prepareFormData(this.product);
      this._product.updateProduct(productformData).subscribe(
        (response: any)=>{
          Swal.fire("Success!!","Product is Updated sucessfully", 'success').then((e)=>{ 
            window.location.reload()
          })
          
          productForm.reset();
          
        },
        (error:any)=>{
          console.log(error);
          Swal.fire("Error!!","Product is not update ", 'error')     
          
        }
      )
    }
   

  }




ngOnInit(): void {
    this.subCategoryId =  this._route.snapshot.params['subCategoryId']
    this.product.subCategoryId = this.subCategoryId;

    //update er jonno
    this.product = this._route.snapshot.data['product']
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

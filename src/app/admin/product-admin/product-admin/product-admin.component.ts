import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import Swal from 'sweetalert2';

import { MatDialog } from '@angular/material/dialog';
import { ShowImageComponent } from '../show-image/show-image.component';
import { ImageProcessService } from 'src/app/services/image-process.service';
import { map } from 'rxjs';
import { Product } from 'src/app/services/Models/productModel';

@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.css']
})



export class ProductAdminComponent implements OnInit {

  filter: any;
  page=1
  searchText:any;
  pageSize = 30;

  products=[
    {
      productId:0,
      subCategoryId:'',
      productName:'',
      description:'',
      regularPrice:'',
      discountPrice:'',
      quantity:'',
      productImages:[
        {
          picByte:'',
          name:'',
          type:''
        }
      ]
    }]



  

  constructor(
    private _product:ProductsService,
    private _subCat:SubcategoryService,
    private _route:ActivatedRoute,
    public imagesDialog:MatDialog ,
    private _imagePorcess: ImageProcessService,
    private _router:Router
    ){}

  subCategoryId:any

  //for title
  subcategory={
    name:''
  }

  ngOnInit(): void {
      this.subCategoryId = this._route.snapshot.params['subCategoryId']
      this._product.getProductsOfSubcategory(this.subCategoryId)
      .pipe(
        map((x:Product[],i)=>x.map((pro:Product)=>this._imagePorcess.createImages(pro)))
      )
      .subscribe(
        (data:any)=>{
          this.products = data;
          console.log(data);
          
        },
        (error)=>{
          console.log(error);
          
        }
      );

      this._subCat.getSingleSubCategory(this.subCategoryId).subscribe(
        (data:any)=>{
          this.subcategory = data;
        },
        (error)=>{
          console.log(error);
          
        }
      )
      
  }


  //delete
  deleteProduct(productId:any){
    Swal.fire(
      {
        icon:'info',
        title:'Are You Sure?',
      confirmButtonText:'Delete',
      showCancelButton:true
      }
    ).then((result)=>{
      if(result.isConfirmed){
        this._product.deleteProduct(productId).subscribe(
          
        (data)=>{
          this.products = this.products.filter((p)=>p.productId != productId);
          Swal.fire("Deleted","Category is deleted","success");
        },
      (error)=>{
        console.log(error);       
      }
        )
      }
    })
  }

  //showing image
  openImage(product:any){
    this.imagesDialog.open(ShowImageComponent,{
      data:{
        images: product.productImages
      },
      width:"700px",
      height:"500px",
    })
    // console.log(product)   
  }

  //edit
  editProduct(productId:any){
    this._router.navigate(['/admin/product/update',{productId:productId}])
    
  }

}

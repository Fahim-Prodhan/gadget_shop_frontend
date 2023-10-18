import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { Product } from 'src/app/services/Models/productModel';
import { CategoryService } from 'src/app/services/category.service';
import { ImageProcessService } from 'src/app/services/image-process.service';
import { ProductsService } from 'src/app/services/products.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subcategroy-all-products',
  templateUrl: './subcategroy-all-products.component.html',
  styleUrls: ['./subcategroy-all-products.component.css']
})
export class SubcategroyAllProductsComponent {

  subCategory = {
    name:''
  }
  products:Product[] = []
  subCategoryId = null

  constructor(
    private _product: ProductsService,
    private _imagePorcess:ImageProcessService,
    private _route:ActivatedRoute,
    private _router:Router,
    private _Subcat:SubcategoryService,
    private _snack:MatSnackBar) {}


    ngOnInit(): void {
      this.subCategoryId=this._route.snapshot.params['subCategoryId'];

      //fetching category products
        this._product.getProductsOfSubcategory(this.subCategoryId)
        .pipe(
          map((x:Product[],i)=>x.map((pro:Product)=>this._imagePorcess.createImages(pro)))
        )
        .subscribe(
          (data:Product[])=>{        
            this.products = data;
            console.log(data);   
          },
          (error)=>{
            console.log(error);
            
          }
        );

        //
        this._Subcat.getSingleSubCategory(this.subCategoryId).subscribe(
          (data:any)=>{
            this.subCategory = data;
          },
          error=>{
            console.log(error);
            
          }
        )
        


      }



  showProductDetail(productId:any){
    this._router.navigate(['/user/view-product',{productId:productId}])
  }

  isSingleProductCheckout:boolean = true;
  buyProduct(productId: any) {
    this._router.navigate(['/user/buy'], {
      queryParams: {
        isSingleProductCheckout: true,
        id: productId
      }
    });
  }
    //Cart
    addToCart(productId:any){
      this._product.addToCart(productId).subscribe(
        (data:any)=>{
          Swal.fire("Success!!","Product is added to Cart sucessfully", 'success').then((e)=>{
            window.location.reload();
          }) 
        },
      (error)=>{
        Swal.fire("Error!!","Product is not added To Cart ", 'error')
      }
      )
    }


}

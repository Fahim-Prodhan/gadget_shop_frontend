import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Product } from './Models/productModel';
import { Observable, map, of } from 'rxjs';
import { ProductsService } from './products.service';
import { ImageProcessService } from './image-process.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolverService implements Resolve<Product>{

  constructor(private _product:ProductsService,
              private _imageProcess:ImageProcessService) { }

  resolve(route: ActivatedRouteSnapshot):  Observable<Product> {
   const id = route.paramMap.get('productId');

   if(id){
      return this._product.getSingleProduct(id)
              .pipe(
                map(p=>this._imageProcess.createImages(p))
              )

   }
   else{
    return form(this.getProductDetails()); 
  }
  }

  getProductDetails(){
    return {
      productId:'',
      productName:'',
      description:'',
      regularPrice:'',
      discountPrice:'',
      quantity:'',
      available:true,
      subCategoryId:'',
      productImages:[]
    }
  }
  
}
function form(arg0: { productId: string; productName: string; description: string; regularPrice: string; discountPrice: string; quantity: string; available: boolean; subCategoryId: string; productImages: never[]; }): Observable<Product> {
  throw new Error('Function not implemented.');
}


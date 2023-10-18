import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Product } from './Models/productModel';
import { Observable, map } from 'rxjs';
import { ProductsService } from './products.service';
import { ImageProcessService } from './image-process.service';

@Injectable({
  providedIn: 'root'
})
export class BuyProductResolverService implements Resolve<Product[]>{

  constructor(
    private _product:ProductsService,
    private _image:ImageProcessService) { }

    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Product[] | Observable<Product[]> | Promise<Product[]> {
    const id = route.queryParamMap.get('id');
    const isSingleProductCheckoutString = route.queryParamMap.get('isSingleProductCheckout');
    const isSingleProductCheckout = isSingleProductCheckoutString === 'true';

    return this._product.getProductDetails(isSingleProductCheckout,id).pipe(
      map((x:Product[],i)=>x.map((product:Product)=>this._image.createImages(product)))
    )
  }
 
}

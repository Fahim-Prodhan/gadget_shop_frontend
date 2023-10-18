import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { CartDetails } from './Models/cartDetails.model';
import { ProductsService } from './products.service';
import { ImageProcessService } from './image-process.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartResolverService implements Resolve<CartDetails[]>{

  constructor(
    private cartService: ProductsService,
    private imageProcessService: ImageProcessService
  ) {}

  resolve(): Observable<CartDetails[]> {
    // Call the cartService to get cart details
    return this.cartService.getCartDetails().pipe(
      map((cartDetails: CartDetails[]) => {
        // Process images for each product in the cart details
        const cartDetailsWithProcessedImages = cartDetails.map((cartDetail) => {
          cartDetail.product = this.imageProcessService.createImages(cartDetail.product);
          return cartDetail;
        });
        return cartDetailsWithProcessedImages;
      })
    );
  }
}

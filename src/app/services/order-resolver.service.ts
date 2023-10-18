import { Injectable } from '@angular/core';
import { OrderService } from './order.service';
import { ImageProcessService } from './image-process.service';
import { OrderDetailsResponse } from './Models/orderResponse.model';
import { Resolve } from '@angular/router';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderResolverService implements Resolve<OrderDetailsResponse[]>{

  constructor(
    private orderService: OrderService,
    private imageProcessService: ImageProcessService
  ) {}

  resolve(): Observable<OrderDetailsResponse[]> {
    // Call the cartService to get cart details
    return this.orderService.getOrderByUser().pipe(
      map((orderDetails: OrderDetailsResponse[]) => {
        // Process images for each product in the cart details
        const orderDetailsWithProcessedImages = orderDetails.map((orderDetail) => {
          orderDetail.product = this.imageProcessService.createImages(orderDetail.product);
          return orderDetail;
        });
        return orderDetailsWithProcessedImages;
      })
    );
  }
}

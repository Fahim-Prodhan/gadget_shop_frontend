import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { orderDetails } from './Models/order-details-model';
import { OrderDetailsResponse } from './Models/orderResponse.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _http:HttpClient) { }

  
  //create transaction
  public createTransaction(amount:any){
    return this._http.get(`${baseUrl}/orders/pay/${amount}`);
  }

  public placeOrder(orderDetails:orderDetails,isCartCheckout:boolean) {
    return this._http.post(`${baseUrl}/orders/place_order/${isCartCheckout}`,orderDetails);
  }

  public getAllOrders(status:string){
    return this._http.get(`${baseUrl}/orders/all/${status}`);
  }

  public getOrderByUser(){
    return this._http.get<OrderDetailsResponse[]>(`${baseUrl}/orders/userOrders`)
  }

  public countUserOrder(){
    return this._http.get(`${baseUrl}/orders/count`);
  }

  //mark as delivered
  public markAsDelivered(orderId:Number) {
    return this._http.get(`${baseUrl}/orders/delivered/${orderId}`)
  }
  
  //placed order count
  public CountPlacedOrder(){
    return this._http.get(`${baseUrl}/orders/placed/count`);
  }
}

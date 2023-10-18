import { Component,OnInit } from '@angular/core';
import { OrderDetailsResponse } from 'src/app/services/Models/orderResponse.model';
import { LoginService } from 'src/app/services/login.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit{

  cartCount = 0;
  orderCount = 0;

  

  constructor(
    private _product:ProductsService,
    private _order:OrderService,
    public _login:LoginService,
  ){}

  ngOnInit(): void {
      this.getCartCount();
      this.getOrderCount();
  }



   //cart count
   getCartCount(){
    this._product.countCartsByUser().subscribe(
      (data:any)=>{
        this.cartCount = data;
      },
      (error)=>{
        console.log(error);
        
      }
    )
  }
   //order count
   getOrderCount(){
    this._order.countUserOrder().subscribe(
      (data:any)=>{
        this.orderCount = data;
      },
      (error)=>{
        console.log(error);
        
      }
    )
  }

}

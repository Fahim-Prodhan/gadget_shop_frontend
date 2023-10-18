import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderDetailsResponse } from 'src/app/services/Models/orderResponse.model';
import { OrderService } from 'src/app/services/order.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css']
})
export class OrderViewComponent implements OnInit{

  orderDetailsResponse:OrderDetailsResponse[] = [];

  constructor(
    private _route:ActivatedRoute
  ){}


  ngOnInit(): void {
    this.orderDetailsResponse = this._route.snapshot.data['orderDetails']

    
  }

}

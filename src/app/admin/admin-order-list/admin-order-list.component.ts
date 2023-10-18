import { Component,OnInit } from '@angular/core';
import { OrderDetailsResponse } from 'src/app/services/Models/orderResponse.model';
import { LoginService } from 'src/app/services/login.service';
import { OrderService } from 'src/app/services/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-order-list',
  templateUrl: './admin-order-list.component.html',
  styleUrls: ['./admin-order-list.component.css']
})
export class AdminOrderListComponent implements OnInit{

  filter: any;
  page=1
  searchText:any;
  pageSize = 30;

  orderlist:OrderDetailsResponse[] = []

  orderId = 0
  status:string = "allOrders"

  constructor(
    private _order:OrderService
  ){}

  ngOnInit(): void {
    this.getAllOrdersForAdmin(this.status)
  }

  getAllOrdersForAdmin(status:string){
    this._order.getAllOrders(status).subscribe(
      (data:any)=>{
        this.orderlist = data;
        // console.log(data);
        
      },
      (error)=>{
        console.log(error);
        
      }
    )
    
  }

  markAsDelivered(orderId:Number) {
    this._order.markAsDelivered(orderId).subscribe(
      (data:any)=>{
          Swal.fire("Success!!","Order is Delivered sucessfully", 'success').then((e)=>{
          window.location.reload();
        })
      },
      (error)=>{
        Swal.fire("Error!!","Order is not Delivered ", 'error')
      }
    )
  }


}

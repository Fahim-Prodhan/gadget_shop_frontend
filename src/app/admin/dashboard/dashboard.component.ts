import { Component,OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  constructor(
    public _login:LoginService,
    private _order:OrderService,
    private _user:UserService
  ){}

  countPlacedOrder = 0
  userCount = 0

  ngOnInit(): void {
    this.getPlacedOrderCount();
    this.getUserCount();
  }

  getPlacedOrderCount(){
    this._order.CountPlacedOrder().subscribe(
      (data:any)=>{
        this.countPlacedOrder = data
      },
      (error)=>{
        console.log(error);   
      }
    )
  }

  getUserCount(){
    this._user.countUser().subscribe(
      (data:any)=>{
        this.userCount = data;
      },
      (error)=>{
        console.log(error);
        
      }
    )
  }

}

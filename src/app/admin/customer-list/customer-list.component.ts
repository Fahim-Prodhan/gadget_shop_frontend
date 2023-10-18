import { Component,OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit{

  filter: any;
  page=1
  searchText:any;
  pageSize = 30;

  users=[{
    id:null,
    username:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
    authorities:[
      {
        authority:''
      }
    ]
  }]

  constructor(
    private _user:UserService
  ){}

  ngOnInit(): void {
      this._user.getAllUsers().subscribe(
        (data:any)=>{
          this.users = data;
        },
        (error)=>{
          console.log(error);
          
        }
      )
  }

}

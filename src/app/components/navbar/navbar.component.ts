import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { LoginService } from 'src/app/services/login.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(
    public login:LoginService,
    private router:Router,
    private _cat:CategoryService,
    private _product:ProductsService
    ){}

    cartCount = 0;

    categories = [{
      categoryId:'',
      title:'',
      subCategories: [
        {
            subCategoryId: "",
            categoryId: "",
            name: ""  
        }
      ]
    }]

  logIn=false;
  user=null;

  isAdmin = false


  ngOnInit(): void {

    this.logIn = this.login.isLoggedIn();
    this.user = this.login.getUser();

     //getting all categories
     this._cat.getAllCategories().subscribe(
     (data:any)=>{
      this.categories = data
      // console.log(data);
     },
     (error)=>{
      console.log(error);
      
     }
     )

     if(this.login.getUserRole()=="ADMIN") {
      this.isAdmin = true;
    }

    this.getCartCount();
}



  public logout(){
    this.login.logout();
    this.logIn=false;
    this.user=null;
    window.location.href='/login'
  }


  

  redirectUser()
  {
    if(this.login.getUserRole()=="ADMIN")
    {
      this.router.navigate(['/admin/dashboard'])
    }
    // else if(this.login.getUserRole()=="SELLER"){
    //   this.router.navigate(['/seller/seller-dashboard']);
    // }
    else
    {
      this.router.navigate(['/user/user-dashboard']);
    }
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



}

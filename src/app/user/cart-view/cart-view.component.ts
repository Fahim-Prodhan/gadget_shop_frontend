import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { CartDetails } from 'src/app/services/Models/cartDetails.model';
import { Product } from 'src/app/services/Models/productModel';
import { ImageProcessService } from 'src/app/services/image-process.service';
import { ProductsService } from 'src/app/services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent implements OnInit{

  constructor(
    private _product:ProductsService,
    private _router:Router,
    private _route:ActivatedRoute,
  ){}

  cartDetails:CartDetails[] = []

  

  ngOnInit(): void {
      // this.getCartDetails();
      this.cartDetails = this._route.snapshot.data['cartDetails']
      console.log(this.cartDetails);
      
  }

  // getCartDetails(){
  //   this._product.getCartDetails()
  //   .subscribe(
  //     (data:any)=>{
  //       this.cartDetails = data
  //       console.log(data);
        
  //     },
  //     (error)=>{
  //       console.log(error);
        
  //     }
  //   )
  // }

  isSingleProductCheckout:boolean = true;
  checkout() {
    this._router.navigate(['/user/buy'], {
      queryParams: {
        isSingleProductCheckout: false,
        id: 0
      }
    });
  }

  //delete From cart list
  deleteCart(cartId:any){
    Swal.fire(
      {
        icon:'info',
        title:'Are You Sure?',
      confirmButtonText:'Remove',
      showCancelButton:true
      }
    ).then((result)=>{
      if(result.isConfirmed){
        this._product.deleteCart(cartId).subscribe(
          
        (data)=>{
          this.cartDetails = this.cartDetails.filter((c)=>c.cartId != cartId);
          Swal.fire("Removed","Product is removed from cart","success");
        },
      (error)=>{
        console.log(error);       
      }
        )
      }
    })
  }

  //buy from cart
  buyProduct(productId: any) {
    this._router.navigate(['/user/buy'], {
      queryParams: {
        isSingleProductCheckout: true,
        id: productId
      }
    });
  }

}

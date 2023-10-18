import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/services/Models/productModel';
import { ProductsService } from 'src/app/services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-view-details',
  templateUrl: './product-view-details.component.html',
  styleUrls: ['./product-view-details.component.css']
})
export class ProductViewDetailsComponent implements OnInit{

  product:Product = {
    productId: 0,
    categoryId:"",
    productName: '',
    shortDescription: '',
    longDescription:'',
    regularPrice: '',
    discountPrice: '',
    quantity: '',
    available: true,
    subCategoryId: '',
    productImages: []
  }

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _product:ProductsService
    ){

  }

  selectedProductIndex = 0;

  ngOnInit(): void {
      this.product = this._route.snapshot.data['product']

      
  }

  changeImage(index:any){
    this.selectedProductIndex = index;
  }

 
  isSingleProductCheckout:boolean = true;
  buyProduct(productId: any) {
    this._router.navigate(['/user/buy'], {
      queryParams: {
        isSingleProductCheckout: true,
        id: productId
      }
    });
  }

  //add to cart
  addToCart(productId:any){
    this._product.addToCart(productId).subscribe(
      (data:any)=>{
        Swal.fire("Success!!","Product is added to Cart sucessfully", 'success').then((e)=>{
          window.location.reload();
        })
      },
    (error)=>{
      Swal.fire("Error!!","Product is not added To Cart ", 'error')
    }
    )
  }

}

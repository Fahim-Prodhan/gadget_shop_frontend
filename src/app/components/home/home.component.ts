import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Product } from 'src/app/services/Models/productModel';
import { ImageProcessService } from 'src/app/services/image-process.service';
import { ProductsService } from 'src/app/services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  pageNumber:number = 0

  showLoadButton = false

  products: Product[] = []

  newArrival:Product[] = []

  constructor(
    private _product: ProductsService,
    private _imagePorcess:ImageProcessService,
    private _router:Router,
    private _snack:MatSnackBar) {}



    ngOnInit(): void {
        this.getAllProduct();
        this.getNewArrivalProduct();
    }

    searchProduct(searchKeyword:any){
      this.pageNumber = 0;
      this.products = [];
      this.getAllProduct(searchKeyword);
    }

  public getAllProduct(searchKey:string="") {
    this._product.getAllProducts(this.pageNumber,searchKey)
    .pipe(
      map((x:Product[],i)=>x.map((pro:Product)=>this._imagePorcess.createImages(pro)))
    )
    .subscribe(
      (data:Product[])=>{
        if(data.length == 4){
          this.showLoadButton = true
        }else{
          this.showLoadButton = false
        }
        data.forEach(p => this.products.push(p))
        // this.products = data;       
      },
      (error)=>{
        console.log(error);
        
      }
    );
  }

  //get getNewArrivalProduct
  getNewArrivalProduct(){
    this._product.getNewArrivalProduct()
    .pipe(
      map((x:Product[],i)=>x.map((pro:Product)=>this._imagePorcess.createImages(pro)))
    )
    .subscribe(
      (data:Product[])=>{
        this.newArrival = data;
      },
      (error)=>{
        console.log(error);
        
      }
    )
  }

  showProductDetail(productId:any){
    this._router.navigate(['/user/view-product',{productId:productId}])
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

  //loading product
  loadMoreProduct(){
    this.pageNumber = this.pageNumber + 1;
    this.getAllProduct();
  }

  //Cart
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

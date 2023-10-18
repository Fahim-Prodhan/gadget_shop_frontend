import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
// import * as Razorpay from 'razorpay';
import { orderDetails } from 'src/app/services/Models/order-details-model';
import { Product } from 'src/app/services/Models/productModel';
import { OrderService } from 'src/app/services/order.service';
import Swal from 'sweetalert2';

declare var Razorpay:any;

@Component({
  selector: 'app-buy-product-info',
  templateUrl: './buy-product-info.component.html',
  styleUrls: ['./buy-product-info.component.css']
})
export class BuyProductInfoComponent implements OnInit{


  productDetails:Product[] = []
  isSingleProductCheckout:any = ''

  orderDetails:orderDetails = {
    fullName: '',
    address1: '',
    address2: '',
    orderContactNumber: '',
    orderAltContactNumber: '',
    transactionId: '',
    orderProductQuantityList: [],
  }
  quantity: number = 1;

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }


  constructor(
    private _route:ActivatedRoute,
    private _order:OrderService,){}

  ngOnInit(): void {

      this.productDetails =  this._route.snapshot.data['productDetails']
      
      //getting parameter value
      this._route.queryParams.subscribe(params => {
        this.isSingleProductCheckout = params['isSingleProductCheckout'];  
      });

      this.productDetails.forEach(
        x => this.orderDetails.orderProductQuantityList.push(
          {
            productId:x.productId,orderQuantity:1
          }
        )
      )

      // console.log(this.orderDetails);
      // console.log(this.productDetails);
      
      
  }


  placeOrder(orderForm:NgForm){
    this._order.placeOrder(this.orderDetails,this.isSingleProductCheckout).subscribe(
      (data:any)=> {
        Swal.fire("Success!!","Order is placed sucessfully", 'success').then((e)=>{ 
          window.location.href='/user/orderConfirm'
        })
        
        
      },
      (error:any)=>{
        console.log(error);
        Swal.fire("Error!!","Order is not placed! ", 'error')     
        
      }
      
    )
  }

  //
  getQuantityForProduct(productId:any){
    const filteredProduct=this.orderDetails.orderProductQuantityList.filter(
      (productQuantity)=>productQuantity.productId === productId
    );
    return filteredProduct[0].orderQuantity;
  }

  //

  getCalculatedTotal(productId:any,discountPrice:any){
    const filteredProduct = this.orderDetails.orderProductQuantityList.filter(
      (productQuantity)=> productQuantity.productId === productId
    )

   return filteredProduct[0].orderQuantity * discountPrice

  }

  //on Quantity change 
  onQuantityChanged(orderQuantity:any,productId:any){
    this.orderDetails.orderProductQuantityList.filter(
      (orderProduct)=> orderProduct.productId === productId
    )[0].orderQuantity = orderQuantity
  }

  // Last total calculate
  getGrandTotal(){
    let grandTotal = 0;
    this.orderDetails.orderProductQuantityList.forEach(
      (productQuantity)=>{
        const price=this.productDetails.filter(product=> product.productId === productQuantity.productId)[0].discountPrice;
        grandTotal=grandTotal + price * productQuantity.orderQuantity;
      }
    )
    return grandTotal;
  }

  //createTransactionAndplaceOrder(orderForm)
  createTransactionAndplaceOrder(orderForm:NgForm){
    let total = this.getGrandTotal();
    this._order.createTransaction(total).subscribe(
      (data:any)=>{
        this.openTransactionModal(data, orderForm);
      },
      (error)=>{
        console.log(error);
        
      }
    )
  }

  openTransactionModal(data:any, orderForm:NgForm) {
    var options = {
      order_id: data.orderId,
      key: data.key,
      amount: data.amount,
      currency: data.currency,
      name: 'TechUniverse',
      description: "Payment Online",
      Image:"https://cdn.shopify.com/shopifycloud/help/assets/manual/shop-pay-installments/shop-pay-logo-color-e824c8c627de20423f3abba730d2d5df83c5b848847f029f91ec1bd011f6b0e3.png",
      handler: (data:any)=>{
        if(data!= null && data.razorpay_payment_id != null){
          this.processResponse(data,orderForm);
        }else{
          alert("Payment Failed!")
        }
      },
      prefill:{
        name: '',
        email:"techuniverse@gmail.com",
        contact: "01303687632"
      },
      notes:{
        adress: 'Online Shopping'
      },
      theme: {
        color: '#282D91'
      }
    };
    var razor =  new Razorpay(options)
    razor.open();
  }

  processResponse(resp:any,orderForm:NgForm){
    this.orderDetails.transactionId = resp.razorpay_payment_id;
    this.placeOrder(orderForm);
  }
  

}

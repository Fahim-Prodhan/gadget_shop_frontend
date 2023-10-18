import { Product } from "./productModel"

export interface OrderDetailsResponse{
    orderId:Number,
    orderFullName:string,
    orderAddress1:string,
    orderAddress2:string,
    orderContactNumber:string,
    orderAltContactNumber:string,
    orderStatus:string,
    orderAmount:any,
    orderDate:string,
    orderQuantity:Number,
    product:Product
    user:any

}
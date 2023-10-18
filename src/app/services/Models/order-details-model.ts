import { orderQuantity } from "./order-quantity-model";

export interface orderDetails{
    fullName:any,
    address1:any,
    address2:any,
    orderContactNumber:any,
    orderAltContactNumber:any,
    transactionId:any
    orderProductQuantityList:orderQuantity[];
}
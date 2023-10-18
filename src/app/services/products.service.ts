import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Product } from './Models/productModel';
import { Observable } from 'rxjs';
import { CartDetails } from './Models/cartDetails.model';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _http:HttpClient) { }


  //adding product
  public addProduct(product:FormData){
    return this._http.post<Product>(`${baseUrl}/products/add`,product);
  }
  //get all products
  public getAllProducts(pageNumber:number,searchKey:string="") {
    return this._http.get<Product[]>(`${baseUrl}/products/all?pageNumber=${pageNumber}&searchKey=${searchKey}`);
  }

  //get new arrival
  public getNewArrivalProduct(){
    return this._http.get<Product[]>(`${baseUrl}/products/newArrival`);
  }
  
  //get all product of a subCategory
  public getProductsOfSubcategory(subCategoryId:any){
    return this._http.get<Product[]>(`${baseUrl}/products/subcategory/${subCategoryId}`);
  }

  //get products of category
  public getProductsOfCategory(catId:any) {
    return this._http.get<Product[]>(`${baseUrl}/products/category/${catId}`)
  }

  //get single product
  public getSingleProduct(productId:any){
    return this._http.get<Product>(`${baseUrl}/products/${productId}`);
  }

  //update products
  public updateProduct(product:FormData){
    return this._http.put<Product>(`${baseUrl}/products/update`,product);
  }

  //delete product
  public deleteProduct(productId:any){
    return this._http.delete(`${baseUrl}/products/${productId}`)
  }

  //
  public getProductDetails(isSingleProductCheckout:boolean, productId:any) {
    return this._http.get<Product[]>(`${baseUrl}/products/product_details/${isSingleProductCheckout}/${productId}`);
  }

  //
  public addToCart(productId:any) {
    return this._http.get(`${baseUrl}/carts/addToCart/${productId}`);
  }

  //
  public getCartDetails(){
    return this._http.get<CartDetails[]>(`${baseUrl}/carts/cartDetails`);
  }

  //delete Cart
  public deleteCart(cartId:any){
    return this._http.delete(`${baseUrl}/carts/${cartId}`);
  }
  
  //cart count
  public countCartsByUser(){
    return this._http.get(`${baseUrl}/carts/count`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  
  constructor(private _http:HttpClient) { }

  //add Subcategory
  public addSubCategory(Subcategory:any){
    return this._http.post(`${baseUrl}/subcategories/add`,Subcategory);
  }

  //get all subcategories
  public getAllSubCategories() {
    return this._http.get(`${baseUrl}/subcategories/all`);
  }

  //get single Subcategory
  public getSingleSubCategory(subId:any) {
    return this._http.get(`${baseUrl}/subcategories/${subId}`);
  }

  //delete Subcategory
  public deleteSubCategory(subId:any) {
    return this._http.delete(`${baseUrl}/subcategories/${subId}`);
  }

  //update Subcategory
  public updateSubCategory(Subcategory:any) {
    return this._http.put(`${baseUrl}/subcategories/update`,Subcategory);
  }

  //get All Subcategories of a category
  public getSubcategoryOfCategory(catId:any) {
    return this._http.get(`${baseUrl}/subcategories/category/${catId}`);
  }

}

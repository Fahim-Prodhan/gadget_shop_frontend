import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _http:HttpClient) { }

  //add category
  public addCategory(category:any){
    return this._http.post(`${baseUrl}/categories/add`,category);
  }

  //get all categories
  public getAllCategories() {
    return this._http.get(`${baseUrl}/categories/all`);
  }

  //get single category
  public getSingleCategory(catId:any) {
    return this._http.get(`${baseUrl}/categories/${catId}`);
  }

  //delete category
  public deleteCategory(catId:any) {
    return this._http.delete(`${baseUrl}/categories/${catId}`);
  }

  //update category
  public updateCategory(category:any) {
    return this._http.put(`${baseUrl}/categories/update`,category);
  }

  

}

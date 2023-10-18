import { FileHandle } from "./fileHandle"


export interface Product{
    productId:any,
    categoryId:any,
    productName:any,
    shortDescription:any,
    longDescription:any,
    regularPrice:any,
    discountPrice:any,
    quantity:any,
    available:true,
    subCategoryId:any
    productImages: FileHandle[]
  }
  
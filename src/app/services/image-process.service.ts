import { Injectable } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';
import { Product } from './Models/productModel';
import { FileHandle } from './Models/fileHandle';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessService {

  constructor(private _sanitizer: DomSanitizer) { }


  public createImages(product:Product):Product{
    const productImages:any = product.productImages;
    const productImagesToFileHandle: FileHandle[] =[];

    for (let i = 0; i < productImages.length; i++) {
      const imageFileData=productImages[i];
      const imageBlob = this.dataURItoBlob(imageFileData.picByte,imageFileData.type);

      const imageFile=new File([imageBlob], imageFileData.name,{type:imageFileData.type});

      const finalFileHandle:FileHandle ={
        file:imageFile,
        url: this._sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
      };
      productImagesToFileHandle.push(finalFileHandle);
    }
    product.productImages = productImagesToFileHandle
    return product;
  }

  public dataURItoBlob(picByte:any,imageType:any){
    const byteString=window.atob(picByte);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for(let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i)
    }

    const blob = new Blob([int8Array], {type:imageType})
    return blob;
  }
}

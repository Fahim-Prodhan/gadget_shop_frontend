import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'base64ToImage'
})
export class Base64ToImagePipe implements PipeTransform {

  transform(base64Data: string, contentType: string = 'image/png'): string {
    // Create a data URI for the image
    return `data:${contentType};base64,${base64Data}`;
  }

}

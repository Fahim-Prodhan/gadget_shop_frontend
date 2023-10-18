import { Component, Inject,OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-show-image',
  templateUrl: './show-image.component.html',
  styleUrls: ['./show-image.component.css']
})
export class ShowImageComponent implements OnInit{

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any
  ){}


  ngOnInit(): void {
      this.receiveImages();
  }


  receiveImages(){
    console.log(this.data)  
  }

}

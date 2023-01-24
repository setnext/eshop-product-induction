import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-savesuccessful',
  templateUrl: './product-savesuccessful.component.html',
  styleUrls: ['./product-savesuccessful.component.css']
})
export class ProductSavesuccessfulComponent implements OnInit {

  
  productId: string ="";

  
  productUrl: string="";


  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.queryParamMap.get('productId')||'';
    this.productUrl = this.route.snapshot.queryParamMap.get('url')||'';

    
  }

}

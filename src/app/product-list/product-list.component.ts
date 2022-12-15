import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ObjectType } from '../interfaces/User';
import { AuthService } from '../services/authService/auth.service';
import { LocalService } from '../services/storage/local.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  isLogged="";
  constructor(private http: HttpClient, private router:Router, private auth:AuthService, private localstore:LocalService) {
   this.auth.checkLoginStatus();
   }
 

  ngOnInit(): void {
  }



}

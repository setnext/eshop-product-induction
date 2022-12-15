import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ObjectType, User } from './interfaces/User';
import { AuthService } from './services/authService/auth.service';
import { LocalService } from './services/storage/local.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'eshop-product-induction';
  isLoggedIn:boolean=false;
  user:User = {} as User;

  constructor(private http: HttpClient, private router:Router, private auth:AuthService, private localstore:LocalService) {

    this.auth.isLoggedIn$?.subscribe(loggedIn =>{
      ////console.log("header loggin status" + loggedIn);

      switch(loggedIn){
      case true:
        console.log("loggedIn User");
        this.isLoggedIn=true;
        this.user = this.localstore.getData("customerInfo",ObjectType.json,true);

        break;
      case false:
        console.log("Not Logged User");
        this.isLoggedIn=false;
        this.router.navigateByUrl('/login');
    }; 
  });

   }
  ngOnInit(): void {}
    

}

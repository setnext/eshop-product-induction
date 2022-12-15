import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ObjectType, User } from '../interfaces/User';
import { AuthService } from '../services/authService/auth.service';
import { LocalService } from '../services/storage/local.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn:boolean=false;
  user:User = {} as User;

  constructor(private http: HttpClient, private router:Router, private auth:AuthService, private localstore:LocalService) {

    this.auth.checkLoginStatus();

   }

  
  ngOnInit(): void {
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

}

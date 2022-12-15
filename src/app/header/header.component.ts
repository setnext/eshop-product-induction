import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ObjectType, User } from '../interfaces/User';
import { AuthService } from '../services/authService/auth.service';
import { LocalService } from '../services/storage/local.service';
declare var window: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  formModal: any;

  

  isLoggedIn:boolean=false;
  user:User = {} as User;

  constructor(private http: HttpClient, private router:Router, private auth:AuthService, private localstore:LocalService) {

    this.auth.isLoggedIn$?.subscribe(loggedIn =>{
      ////console.log("header loggin status" + loggedIn);

      switch(loggedIn){
      case true:
        this.isLoggedIn=true;
        this.user = this.localstore.getData("customerInfo",ObjectType.json,true);

        break;
      case false:
        this.isLoggedIn=false;
    }; 
  });

   }

  ngOnInit(): void {

    // this.formModal = new window.bootstrap.Modal(
    //   document.getElementById('quoteForm')
    // );
    console.log("Header")
    if (this.localstore.getData("isLogged",ObjectType.text, false) && this.localstore.getData("isLogged",ObjectType.text, false)=="true")
    {
      
      this.isLoggedIn=true;
      this.user = this.localstore.getData("customerInfo",ObjectType.json,true);
    }
    else{
      this.isLoggedIn=false;
      this.router.navigateByUrl('/login');
      console.log("Not Found");
      
    }

  }

  logout(){
    console.log("Not Found");
    this.auth.logout();
    this.router.navigateByUrl("/login");

  }

  openFormModal() {
    this.formModal.show();
  }
  saveSomeThing() {
    // confirm or save something
    this.formModal.hide();
  }

  }



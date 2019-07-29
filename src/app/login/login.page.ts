import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private us:UserService) { }

  ngOnInit() {
  }
  
  myform = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });

  Login(data){
    
    this.us.Login(data.email , data.password);
     
  }

}

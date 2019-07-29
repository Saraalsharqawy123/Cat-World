import { Component, OnInit, ViewChild } from '@angular/core';
import { IUser, UserService } from '../user.service';
import { FormGroup, FormControl } from '@angular/forms';
import { IonInput, NavController} from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {
  
  @ViewChild('p') private phoneinput:IonInput;
  
 
  countries:any[] = [
    {
      "id":1,
      "country": "Egypt",
      "code":"0020"
    },
    {
      "id":2,
      "country": "Iraq",
      "code":"00964"
    },
    {
      "id":3,
      "country": "Jordan",
      "code":"00962"
    },
    {
      "id":4,
      "country": "Kuwait",
      "code":"00965"
     },
    {
      "id":5,
      "country": "Lebanon",
      "code":"00961"
    },
    {
      "id":6,
      "country": "Oman",
      "code":"00968"
    },

    {
      "id":7,
      "country": "Qatar",
      "code":"00974"
    },
    {
      "id":8,
      "country": "Saudi Arabia",
      "code":"00966"
    },
    {
      "id":9,
      "country": "Sudan",
      "code":"00249"
    },
    {
      "id":11,
      "country": "Tunisia",
      "code":"00216"
     },
    { "id":12,
      "country": "Turkey" ,
      "code":"0090" 
      },
    { "id":13,
      "country": "United Arab Emirates",
      "code":"00971"
    }
];
    

  form = new FormGroup({
      name: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      country: new FormControl(),
      phone: new FormControl(),
      gender:new FormControl()
    });
    
  msg:string=null;
  Useraccount : IUser;


  constructor(private us:UserService,private nav:NavController) { }

  ngOnInit() {}

  
  registerUser(data)
  {

   //get code of country
    let code=  this.countries.find(c=>{return c.country == data.country}).code;
    data.phone=code+data.phone;
    
    //new account
    this.Useraccount={name:data.name,gender:data.gender ,email:data.email,phone:data.phone,password:data.password,address:data.country};
    
    //register account
    this.us.AddAccount(this.Useraccount).subscribe(res=>{
        
      //check if email was registered before
      if(res.json().sqlState == "23000")
      {
        this.msg="Sorry .. this email is already registered "    
      }
      else
      {
        this.msg=null;
        localStorage.setItem("token",res.json().token);
        localStorage.setItem("user",res.json().email);
        this.nav.navigateRoot('/');
  
      }
    });
        
  }

  getCode(country)
  {
    let code=  this.countries.find(c=>{return c.country == country}).code;
    this.phoneinput.value=code;
  }

}

import { Injectable } from '@angular/core';

import { Headers,RequestOptions, Http } from '@angular/http';
import { NavController } from '@ionic/angular';


export interface IUser {
  Id?:string;
  name:string;
  email:string;
  password:string;
  address:string;
  phone:string;
  gender:string;
  Review?:number;
};
export interface response{
  message:string;
  token:string;
  success:number;
  email:string;
};

@Injectable({
  providedIn: 'root'
})


export class UserService {

  token=null;
  
  //for post request
   httpHeaders = new Headers({
    'Content-Type' : 'application/json'
  }); 

  options=new RequestOptions({'headers':this.httpHeaders}); 
  
  constructor(private http :Http,private nav:NavController) { }

  public  AddAccount(Udata:IUser)
  {
      return this.http.post("https://smart-baby1.herokuapp.com/Users/add",Udata,this.options); 
  }

  public getUsers()
  {
    return this.http.get("https://smart-baby1.herokuapp.com/Users",this.options);
  }

 

  public Login(email:string,pass:string)
  {
    let user={"email":email,"password":pass};
    this.token= this.http.post("https://smart-baby1.herokuapp.com/Users/login",user,this.options).subscribe(res=>{
     
    let result=res.json() as response;
   
    if(result.success == 1)
    {
     let userToken=result.token;
     
     
      if(userToken != null)
      {
        localStorage.setItem("token",userToken);
        localStorage.setItem("user",user.email);
        
        this.nav.navigateRoot('/');

      }
    }
     else
     {
       alert(result.message);
     }

    });
  }
  



getuserInfo(email)
{
  this.options.headers.set('x-access-token',localStorage.getItem("token"));
 return this.http.get('https://smart-baby1.herokuapp.com/Users/info/'+email,this.options);
}

changePassword(data)
{
return this.http.put('https://smart-baby1.herokuapp.com/Users/ChangePass',data,this.options);
}

EditProfile(data)
{  
  return this.http.put('https://smart-baby1.herokuapp.com/Users/EditProfile',data,this.options);
}

Review(data)
{
  return this.http.post('https://smart-baby1.herokuapp.com/Users/Reviews',data,this.options);
}

GetReview(Id)
{
  return this.http.get('https://smart-baby1.herokuapp.com/Users/Reviews/'+Id,this.options);
}

logout()
{
  localStorage.removeItem("token");
  localStorage.removeItem("user");
 localStorage.removeItem("UserData");
  this.nav.navigateRoot("/login");
}

}

 
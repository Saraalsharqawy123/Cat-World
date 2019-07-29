import { Injectable } from '@angular/core';
import { RequestOptions, Http, Headers } from '@angular/http';

export interface ICat {
  Id?:string;
  img:string;
  type:string;
  gender:string;
  age:string;
  goal:string;
  price?:number;
  note:string;
  love:number;
  status:boolean;
  userId:string;
  f?:boolean;  // favourite cats
};

@Injectable({
  providedIn: 'root'
})
export class CatService {

  constructor(private http : Http) { }


  //for post request
  httpHeaders = new Headers({
    'Content-Type' : 'application/json',
    'x-access-token':localStorage.getItem("token")
  }); 
 
  options=new RequestOptions({'headers':this.httpHeaders}); 
  

  public  AddCat(newCat:ICat)
  {
    return this.http.post("https://smart-baby1.herokuapp.com/Cats/add",newCat,this.options);
  }

  public getCatsByUserId(userId)
  {
    return this.http.get("https://smart-baby1.herokuapp.com/Cats/"+userId,this.options);
  }

  
  public getCatsByAddress(country)
  {
    return this.http.get("https://smart-baby1.herokuapp.com/Cats/address/"+country,this.options);
  }


  deleteCat(catId)
  {
    return this.http.delete("https://smart-baby1.herokuapp.com/Cats/del/"+catId,this.options);
  }


  EditCat(cat)
  {
    return this.http.put("https://smart-baby1.herokuapp.com/Cats/update",cat,this.options);
  }

  updateLove(value)
  {
    return this.http.put("https://smart-baby1.herokuapp.com/Cats/love",value,this.options);
  }
  
  InsertLove(value)
  {
    return this.http.post("https://smart-baby1.herokuapp.com/Cats/love",value,this.options);
  }
    
  DeleteLove(value)
  {
    return this.http.post("https://smart-baby1.herokuapp.com/Cats/love/delete",value,this.options);
  }

}
 
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ModalController, IonInput } from '@ionic/angular';
import { CatService, ICat } from '../cat.service';
import { Camera } from '@ionic-native/camera/ngx';


@Component({
  selector: 'app-addcat',
  templateUrl: './addcat.page.html',
  styleUrls: ['./addcat.page.scss'],
})
export class AddcatPage implements OnInit {

types:string[]=["Siamese","Shirazi","birman","Ragdoll","Burmese","Angora","bobtail","Siberian","scottish fold","tonkinese"];
ages:string[]=["1m - 1year","2y - 4y","5y-7y","8y-10y","more than 11y"]
goals:string[]=["Sale","Marrige","Adoption"];
newCat:ICat;
PriceFlag: boolean;
base64Image: any;
userId;
@ViewChild('pricefield') pricefield:IonInput;
@Input() value: number;

form = new FormGroup({
    type: new FormControl(),
    age: new FormControl(),
    gender:new FormControl(),
    img: new FormControl(),
    note: new FormControl(),
    goal: new FormControl(),
    price:new FormControl()
  });


 
  constructor(public modalCtrl:ModalController,private cs:CatService,private camera: Camera) { }

  ngOnInit() { }


  AddCat(data)
  {
    if(this.form.valid)    
    {
      data.img=this.base64Image;
      this.newCat={age:data.age,type:data.type,gender:data.gender,img:data.img,note:data.note,goal:data.goal,love:0,status:false,userId:this.userId,price:data.price};

      if(data.goal == 'Sale' && data.price == null)
      {
        this.pricefield.color="danger";
        this.pricefield.setFocus();
      }
      else
      {
        this.cs.AddCat(this.newCat).subscribe(res=>{ 
         if (res.json().success == 1)
          {
            this.newCat.Id=res.json().data.insertId;
            
            //return inserted data 
            this.modalCtrl.dismiss(this.newCat);
          }
          
        });
      }
    }
  }

 


  AccessGallery(){

    this.camera.getPicture({
   
       sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
   
       destinationType: this.camera.DestinationType.DATA_URL
   
      }).then((imageData) => {
   
        this.base64Image = 'data:image/jpeg;base64,'+imageData;
   
       
           }, (err) => {
   
        console.log(err);
   
      });
   
   }
  
  choose(e)
  {
    let value=e.target.value;
    if(value == "Sale")
    {
        this.PriceFlag=true;
    }
    else
    {
      this.PriceFlag=false;
    }
  }
  

  closeModal()
  { 
    this.modalCtrl.dismiss(null);
  }
}

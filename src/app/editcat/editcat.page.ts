import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {  ModalController, IonInput } from '@ionic/angular';
import { FormGroup, FormControl } from '@angular/forms';
import { CatService } from '../cat.service';
import { Camera } from '@ionic-native/camera/ngx';


@Component({
  selector: 'app-editcat',
  templateUrl: './editcat.page.html',
  styleUrls: ['./editcat.page.scss'],
})
export class EditcatPage implements OnInit {

  
  ages:string[]=["1m - 1year","2y - 4y","5y-7y","8y-10y","more than 11y"];
  types:string[]=["Siamese","Shirazi","birman","Ragdoll","Burmese","Angora","bobtail","Siberian","scottish fold","tonkinese"];
  goals:string[]=["Sale","Marrige","Adoption"];

  @Input() value: number;
  cat;
  form;
  PriceFlag=false;
  @ViewChild('pricefield') pricefield:IonInput;
  base64Image: string;

  constructor(public modalCtrl:ModalController,private cs:CatService,private camera: Camera) { }

  ngOnInit() {
    this.base64Image=this.cat.img;  

    this.form = new FormGroup({
    Id:new FormControl(this.cat.Id),
    type: new FormControl(this.cat.type),
    age: new FormControl(this.cat.age),
    gender:new FormControl(this.cat.gender),
    img: new FormControl(this.cat.img),
    price:new FormControl(this.cat.price),
    note: new FormControl(this.cat.note),
    goal: new FormControl(this.cat.goal),
    status:new FormControl(this.cat.status)
  });

  if(this.cat.goal== 'Sale')
     {this.PriceFlag=true;}

  }


  EditInfo(data)
  {
    //edit cat information 
    if(this.form.valid)    
    {
      if(data.goal == 'Sale' && data.price == null)
        {
          this.pricefield.color="danger";
          this.pricefield.setFocus();
        }
      else
        {
          data.img=this.base64Image;         
          this.cs.EditCat(data).subscribe(res=>{
            if(res.json().affectedRows == 1)
              {
                this.modalCtrl.dismiss(data);
              }
          });
         }
    }
  }

  closeModal()
  {
    this.modalCtrl.dismiss();
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
}
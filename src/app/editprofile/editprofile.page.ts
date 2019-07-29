import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { UserService } from '../user.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})

export class EditprofilePage implements OnInit {


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

  user;
  form;

  constructor(public modalCtrl:ModalController,private us:UserService) { }

  ngOnInit() {
    this.form = new FormGroup({
      Id:new FormControl(this.user.Id),
      name: new FormControl(this.user.name),
      email: new FormControl(this.user.email),
      address: new FormControl(this.user.address),
      phone: new FormControl(this.user.phone),
      gender:new FormControl(this.user.gender)
    }); 
  }


  EditProfile(data)
  {
    this.us.EditProfile(data).subscribe(res=>{
      
      if(res.json().status == 1)
      {
        localStorage.setItem("user",data.email);
        this.modalCtrl.dismiss(data);
      }
     })

  }

  closeModal()
  {
    this.modalCtrl.dismiss();
  }

}

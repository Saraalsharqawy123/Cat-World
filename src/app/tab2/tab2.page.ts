import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { UserService, IUser } from '../user.service';
import { CatService, ICat } from '../cat.service';
import { ModalController, IonCardTitle } from '@ionic/angular';
import { EditcatPageModule } from '../editcat/editcat.module';
import { AlertController } from '@ionic/angular';
import { EditcatPage } from '../editcat/editcat.page';
import { AddcatPage } from '../addcat/addcat.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  
  currentUser:IUser;
  cats:ICat[];
  
  constructor(private us:UserService,private cs:CatService,public modalCtrl : ModalController,public alertCtrl:AlertController)
   { }
 
ngOnInit()
{
  //get cats of current user
  this.currentUser=JSON.parse(localStorage.getItem("UserData"));
  this.cs.getCatsByUserId(this.currentUser.Id).subscribe(result=>{
    this.cats=result.json();

  });
}

ionViewWillEnter()
{
    //get user info
    this.currentUser=JSON.parse(localStorage.getItem("UserData"));
}



removeCat(cat)
{
    this.cs.deleteCat(cat.Id).subscribe(res=>{
  
      if(res.json().success == 1)
      {
      this.cats.splice(this.cats.indexOf(cat),1);
      }
    });

} 


async EditCatModal(currentCat) {
  
  const modal = await this.modalCtrl.create({
    component: EditcatPage,
    componentProps: { cat:currentCat }
  });

  
  modal.onDidDismiss().then((data) =>{
    
    let editableCat:ICat=data['data']
    if(editableCat != null)
    {
      //how change appear dirctly
     let cat= this.cats.find((cat:ICat,index:number,arr:ICat[])=>{
        return cat.Id == editableCat.Id;
     });
     
     cat.age=editableCat.age;
            cat.goal=editableCat.goal;
            cat.img=editableCat.img;
            cat.note=editableCat.note;
            cat.status=editableCat.status;
            cat.type=editableCat.type;
            cat.price=editableCat.price;
            


        }
      
    
});

  return await modal.present();
}


async AddCatModal() {
  const mymodal = await this.modalCtrl.create({
    component: AddcatPage,
    componentProps: { userId: this.currentUser.Id } 
  });

  mymodal.onDidDismiss().then((data) => {
   if(data['data'] != null)
     this.cats.push(data['data']);
});
  return await mymodal.present();
}



async presentAlertConfirm(params) {
  const alert = await this.alertCtrl.create({
    header: 'Confirm!',
    message: 'Are you sure you want to delete this ?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
        }
      }, {
        text: 'Yes',
        handler: () => {
          this.removeCat(params);
        }
      }
    ]
  });

  await alert.present();
}



doRefresh(event) {
  setTimeout(() => {
    //get  cats
    this.cs.getCatsByUserId(this.currentUser.Id).subscribe(result=>{
      this.cats=result.json();

    });

    event.target.complete();
   
  }, 2000);
}

  }



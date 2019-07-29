import { Component } from '@angular/core';
import { UserService, IUser } from '../user.service';
import { EditpasswordPage } from '../editpassword/editpassword.page';
import { ModalController } from '@ionic/angular';
import { EditprofilePage } from '../editprofile/editprofile.page';
import { AboutPage } from '../about/about.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  currentUser:IUser;
  NumOfRate: any;
  
  constructor(private us:UserService,private modalCtrl:ModalController)
  {
    this.currentUser=JSON.parse(localStorage.getItem("UserData"));
   }

ionViewWillEnter()
{
 
  this.us.GetReview(this.currentUser.Id).subscribe(result=>{
    let average=0;
    result.json().map(num=>{
    average+=num.review;

    })
    average/=result.json().length;
    this.currentUser.Review=average;
    this.NumOfRate=result.json().length;
  })

}

async EditPassword() {
 
  const modal = await this.modalCtrl.create({
    component: EditpasswordPage,
    componentProps: { userId:this.currentUser.Id ,pass:this.currentUser.password }
  });

  
  modal.onDidDismiss().then((data) => {
    if(data['data']!= null)
    {
    this.currentUser.password=data['data'];
 }

});

  return await modal.present();
}



async EditProfile() {
  
  
  const modal = await this.modalCtrl.create({
    component: EditprofilePage,
    componentProps: { user:this.currentUser }
  });

  
  modal.onDidDismiss().then((data) => {
    if(data['data']!= null)
    {
      let updatedProfile=data['data']; // Here's your selected user!
      this.currentUser.name=updatedProfile.name;
      this.currentUser.email=updatedProfile.email;
      this.currentUser.address=updatedProfile.address;
      this.currentUser.phone=updatedProfile.phone;
      this.currentUser.gender=updatedProfile.gender;
      localStorage.setItem("UserData",JSON.stringify(this.currentUser));
    }
  });

  return await modal.present();
}


async About(){

  const modal = await this.modalCtrl.create({
    component: AboutPage,
    componentProps: { }
  });
  return await modal.present();
}
Logout()
{
  this.us.logout();
}

}
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalController, AlertController, IonInput } from '@ionic/angular';
import { UserService } from '../user.service';

@Component({
  selector: 'app-editpassword',
  templateUrl: './editpassword.page.html',
  styleUrls: ['./editpassword.page.scss'],
})

export class EditpasswordPage implements OnInit {

userId;  
pass; 
@ViewChild('oldval') oldval:IonInput;

form = new FormGroup({
    oldpass:new FormControl(),
    newpass:new FormControl()
  });
  
  constructor(public modalCtrl:ModalController,private us:UserService,public alertCtrl:AlertController) { }

  ngOnInit() { }


  EditInfo(data)
  {
    
    let edit_pass={"newpass":data.newpass,"Id":this.userId};

    if(data.oldpass == this.pass)
    {
      this.us.changePassword(edit_pass).subscribe(res=>{
      let result=res.json();
        
      if(result.status == 1)
      {
        this.presentAlertMsg(result.msg,data.newpass);
      }
      else
      {
        this.presentAlertMsg(result.msg,null);
      }  
      });
    }
    else
    {
      this.oldval.color="danger";
      this.oldval.setFocus();
    }

  }

  closeModal(newpass)
  {
    this.modalCtrl.dismiss(newpass);
  }


  
async presentAlertMsg(msg,data) {
  const alert = await this.alertCtrl.create({
    header: 'Message',
    message: msg,
    buttons: [
      {
        text: 'Ok',
        role: 'cancel',
        cssClass: 'primary',
        handler: () => {
          this.closeModal(data);
        }
      }
      
    ]
  });

  await alert.present();
}

}

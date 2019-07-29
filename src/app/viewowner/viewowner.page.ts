import { Component, OnInit } from '@angular/core';
import { UserService, IUser } from '../user.service';
import { ModalController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';
 
enum Colors{grey="#E0E0E0",green="#76FF03",yellow="#FFCA28",red="#DD2C00"}

@Component({
  selector: 'app-viewowner',
  templateUrl: './viewowner.page.html',
  styleUrls: ['./viewowner.page.scss'],
})


export class ViewownerPage implements OnInit {
  owner:IUser;
  email:string;
  rating: number =0;
  NumOfRate:number=0;
  currentUserId;
  
  constructor(private us:UserService,private ModalCtrl:ModalController,private callNumber: CallNumber) 
  { }

  ngOnInit() {
    
    //get information of owner
    this.us.getuserInfo(this.email).subscribe(res=>{
      this.owner=res.json()[0];
     
      this.us.GetReview(this.owner.Id).subscribe(result=>{
        let average=0;
        result.json().map(num=>{
        average+=num.review;

        })
        average/=result.json().length;
        this.owner.Review=average;  
        this.NumOfRate=result.json().length;
      })
    });
   
    

    
  }

  rate(value: number) {

    this.rating=value;

    //save review in db
    this.us.Review({'userId':this.currentUserId,'ownerId':this.owner.Id,'rate':this.rating}).subscribe(res=>{
      console.log(res);
    });
 }


getColor(index: number) {
    /* function to return the color of a star based on what
     index it is. All stars greater than the index are assigned
     a grey color , while those equal or less than the rating are
     assigned a color depending on the rating. Using the following criteria:
          1-2 stars: red
          3 stars  : yellow
          4-5 stars: green 
    */
if(index > this.rating)
{
return Colors.grey;
}

switch(this.rating)
{
  case 1:
  case 2 : return Colors.red;
  case 3 : return Colors.yellow;
  case 4:
    case 5:
      return Colors.green;
      default:
        return Colors.grey;
}
  }

  callNow(number) {
    this.callNumber.callNumber(number, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  closeModal()
{
  
  this.ModalCtrl.dismiss(null);
}

}

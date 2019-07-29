import { Component } from '@angular/core';
import { UserService, IUser } from '../user.service';
import { ICat, CatService } from '../cat.service';
import { FilterPage } from '../filter/filter.page';
import { ModalController, AlertController} from '@ionic/angular';
import { ViewownerPage } from '../viewowner/viewowner.page';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})


export class Tab1Page {

cats:ICat[];
CurrentUser:IUser;
Allusers:IUser[];
searchitems:IUser[]=[];
msg:string;  
Cancelfilterbtn: boolean;

constructor(private cs:CatService,private us:UserService,private modalCtrl:ModalController)
{
   
}


ngOnInit()
 {
   //get user data & cats
   this.us.getuserInfo(localStorage.getItem("user")).subscribe(res=>{
    this.CurrentUser=res.json()[0];
    //store user data in local storage to used in app.
    localStorage.setItem("UserData",JSON.stringify(this.CurrentUser));
    this.GetCats();
  });
  
}


GetCats()
{
  this.Cancelfilterbtn=false;

  //get all cats from the user country only
  let userAddress=JSON.parse(localStorage.getItem("UserData")).address;
 
  this.cs.getCatsByAddress(userAddress).subscribe(res =>{
    this.cats=res.json().cats;

    if(this.cats.length==0)
    {
      this.msg=" Sorry ..  there are no cats in your country currently added"
    }
    
      //get loves cat of user to check love icons
    let loves:any[] =res.json().loves;

    //compare loves in two table to sign favourite cats
     loves.filter(love =>{return (love.userId == this.CurrentUser.Id) }).forEach(love=>{     
      this.cats.filter(cat=>{return cat.Id == love.catId}).forEach(cat=>{
        cat.f=true;
      }); 
      
    })

  })

}





// View cat's owner to review 
async ViewOwner(email)
{
  const mymodal = await this.modalCtrl.create({
    component: ViewownerPage,
    componentProps: { email:email ,currentUserId:this.CurrentUser.Id} //send data to modal
  });
  return await mymodal.present();
}


//For Search
getItems(ev: any) {
    // get  all  users 
    this.us.getUsers().subscribe(res=>{
      this.Allusers= res.json();
    });
    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '')
    {
      this.searchitems = this.Allusers.filter((item) => {
       return (item.name.toLowerCase().includes((val.toLowerCase())));
      });
    }
    else
    {
      this.searchitems=[];
    }

  }


//refresh content
  doRefresh(event)
  {
    setTimeout(() => {this.GetCats(); event.target.complete();},2000);
  }


  
//when user press love icon
updatelove(event,catId,value)
{
  //add cat to user's favourite 
  if(event.target.name =="heart-empty")
  {
    //insert love in favourite table in DB.
    this.cs.InsertLove({Id:catId,userId:this.CurrentUser.Id}).subscribe(res=>{
      value+=1;
      event.target.name="heart";
      
      //update value of love in cat table and in view
    this.cs.updateLove({love:value,Id:catId,userId:this.CurrentUser.Id}).subscribe(res=>{       
       this.cats.find(cat=>{return cat.Id==catId}).love=value;
       
      });
        
      
    })

   
  }
  else
  {
    //remove from favourite table
    this.cs.DeleteLove({catId:catId,userId:this.CurrentUser.Id}).subscribe(res=>{

      value=value-1;
      event.target.name="heart-empty";

        //update the total value and view
      this.cs.updateLove({love:value,Id:catId,userId:this.CurrentUser.Id}).subscribe(res=>{
        this.cats.find(cat=>{return cat.Id==catId}).love=value;
          });
            
    });
  }
  
}


  async OpenFilter()
  {
    const mymodal = await this.modalCtrl.create({
      component: FilterPage,
      componentProps: { cats:this.cats } //send all cats to filter them
    });
  
    mymodal.onDidDismiss()
    .then((data) => {
     if(data['data'] != null)
       {
        this.cats = data['data']; //receive filtered data

              //check if there is no cat applied this filter
            if(this.cats.length  == 0)
              { 
                   this.msg="Sorry .. no cats apply this filter";
              }
               this.Cancelfilterbtn=true;
       }
        
       });
    
  
    return await mymodal.present();
  
  }

  Cancelfilter()
{
  this.Cancelfilterbtn=false;
  // return basic cats
  this.GetCats();
}


}
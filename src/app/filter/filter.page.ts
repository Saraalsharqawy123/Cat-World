import { Component, OnInit } from '@angular/core';
import { ICat } from '../cat.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {

types:string[]=["Siamese","Shirazi","birman","Ragdoll","Burmese","Angora","bobtail","Siberian","scottish fold","tonkinese"];
goals:string[]=["Sale","Marrige","Adoption"];


selectedType:string[]=new Array();
selectedGoal:string=null;
filtercats:ICat[];
Gender:String=null;
price=null;

//data come from modal
cats;

  constructor(private modalCtrl:ModalController) {

   }

  ngOnInit() { }

  segmentChanged(e,category)
  {
    if(category == 'goal')
      this.selectedGoal= e.detail.value;
      else 
      {
          this.price=e.detail.value;
      }

  }

 

select(event,attribute,value)
{

  if(this.selected(event))
  {
  switch(attribute)
    {
      case 'type':this.selectedType.push(value);break;
      case 'gender':this.Gender=value;
    }
  }
  else
  {
      this.selectedType.splice(this.selectedType.indexOf(value),1);
  }
}


//to check ion-cip selected or not
selected(event):boolean
{
  if(event.target.style.backgroundColor=="lightgray")
  {
    event.target.style.backgroundColor="white";
    return false; //not selected
  }
  else
  {
    event.target.style.backgroundColor="lightgray"
    return true; //selected
  }
}


filter()
{
  
  this.filtercats=this.cats;
 
  //get only specific cats with selectedGoal and age and gender and price;
    this.filtercats=this.filtercats.filter(cat=>{
      
     
      switch(this.selectedGoal)
      {
        case "Sale":
          if(this.price != null)
              return (cat.goal==this.selectedGoal && ( cat.price <= this.price));
              
        case "Marrige":
          if(this.Gender != null)
            return (cat.goal==this.selectedGoal && cat.gender==this.Gender );
      
           
        case "Adoption":
            return (cat.goal==this.selectedGoal );
            
            
        
        default :
            return this.cats;    
      }
    });    
  
  
    if(this.selectedType.length != 0)
    {
      this.filtercats =this.filtercats.filter((cat)=>{

        return this.selectedType.includes(cat.type);

      });
    }

  this.modalCtrl.dismiss(this.filtercats);

}

closeModal()
{  
  this.modalCtrl.dismiss(null);
}

}

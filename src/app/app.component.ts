import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Dealers } from './dealers.model';
import { ApiService } from './shared/api.service';
import { CarsService } from './shared/cars.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-angular-crud-app';
  formValue!: FormGroup
  dealrModelObj: Dealers = new Dealers();
  dealrData: any;
  showUpdate!: boolean;
  showAdd!: boolean;
  carsData: any;
  CarsService: any;
  carsModelObj: any;
  should_open = false;
  dealr_open=true;
  

  constructor(private formBuilder: FormBuilder, private api: ApiService, private carsService: CarsService,
    private route: ActivatedRoute,) { }

   ngOnInit(): void {

    this.formValue = this.formBuilder.group({
      name: [''],
      model:[''],
      brand: [''],
      color: [''],
      price:['']
       });this.getAllcarsDAta(),
  
    this.formValue = this.formBuilder.group({
      dealrName: [''],
      amountOfCars: [''],
      totalBudget: [''],
      remainingBudget: [''],
      owner: {
        firstName: [''],
        lastName: ['']
      },
      location: {
        latitude: [''],
        longitude: ['']
      }
    })
    this.getAllDealrs();
     
  }
  
  addDealr() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

 

  getAllDealrs() {
    this.api.getDealr().subscribe(res => {
      this.dealrData = res;
      console.log(res);
    })
  }
  deleteDealrs(dealr: any) {
    this.api.deleteDealr(dealr.id).subscribe(res => {
      alert("Dealer record deleted")
      this.getAllDealrs()
    })
  }

  // onEditDealrs(dealr: any,index:any) {
  //   console.log(dealr[index])
    // this.showAdd = false;
    // this.showUpdate = true;
    // this.dealrModelObj.id = dealr.id;
    // this.formValue.controls['dealrName'].setValue(dealr.dealrName);
    // this.formValue.controls['amountOfCars'].setValue(dealr.amountOfCars)
    // this.formValue.controls['totalBudget'].setValue(dealr.totalBudget);
    // this.formValue.controls['remainingBudget'].setValue(dealr.remainingBudget);
    // this.formValue.controls['owner'].setValue(dealr.owner)
    // this.formValue.controls['location'].setValue(dealr.location);
  // }
   onEditDealrs(dealr:any,index:any){
      this.showAdd=false;
      this.showUpdate=true;
      this.dealrModelObj.id=dealr.id;
      this.formValue.controls['dealrName'].setValue(dealr.dealrName);
      this.formValue.controls['amountOfCars'].setValue(dealr.amountOfCars)
      this.formValue.controls['totalBudget'].setValue(dealr.totalBudget);
      this.formValue.controls['remainingBudget'].setValue(dealr.remainingBudget);
      this.formValue.controls['owner'].setValue(dealr.owner)
      this.formValue.controls['location'].setValue(dealr.location);
    }
  updateDealrsDetails(){
    this.dealrModelObj.name = this.formValue.value.dealrName;
    this.dealrModelObj.amountOfCars = this.formValue.value.amountOfCars;
    this.dealrModelObj.totalBudget = this.formValue.value.totalBudget;
    this.dealrModelObj.remainingBudget = this.formValue.value.remainingBudget;
    this.dealrModelObj.owner = this.formValue.value.owner;
    this.dealrModelObj.location = this.formValue.value.location;

    this.api.updateDealr(this.dealrModelObj,this.dealrModelObj.id).subscribe(res=>{
      alert("Dealr record updated"); 
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllDealrs()
    })

  }
  
  carsView(){
    this.dealr_open=false;
    this.should_open = true;
  }
  getAllcarsDAta() {
    this.carsService.getCars().subscribe(res => {
      this.carsData = res;
      console.log(res);
    })
  }

  addCar() {
    console.log("add Car")
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  onEditCars(car:any){
    this.showAdd=false;
    this.showUpdate=true;
    this.carsModelObj.id=car.id;
    this.formValue.controls['name'].setValue(car.name);
    this.formValue.controls['model'].setValue(car.model)
    this.formValue.controls['brand'].setValue(car.brand);
    this.formValue.controls['color'].setValue(car.color);
    this.formValue.controls['price'].setValue(car.price)
  }

deleteCars(car: any) {
  this.carsService.deleteCars(car.id).subscribe(res => {
    alert("Car record deleted")
    this.getAllcarsDAta()
  })
}
}

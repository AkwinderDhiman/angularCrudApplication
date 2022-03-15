import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';
import { Cars } from './cars.model';
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
  
  filterTerm!: string;
  formValueCar!: FormGroup
  formValue!: FormGroup
  dealrModelObj: Dealers = new Dealers();
  dealrData: any;
  // showUpdate!: boolean;
  // showUpdateCar!:boolean;
  showAdd!: boolean;
  showAddCar!: boolean;
  carsData: any;
  CarsService: any;
  carsModelObj: Cars = new Cars();
  should_open = false;
  dealr_open = true;

  constructor(private formBuilder: FormBuilder, private api: ApiService, private carsService: CarsService) { }

  ngOnInit(): void {
    
    this.formValueCar = new FormGroup({
      name: new FormControl(),
      model: new FormControl(),
      brand: new FormControl(),
      color: new FormControl(),
      price: new FormControl(),
    }); this.getAllcarsDAta(),

      this.formValue = this.formBuilder.group({
        dealrName: [''],
        amountOfCars: [''],
        totalBudget: [''],
        remainingBudget: [''],
        ownerFirstName:[''],
        ownerLastName:[''],
        location:['']
      })
    this.getAllDealrs();

  }

  search() {
    } 
  addDealr() {
    this.formValue.reset();
    this.showAdd = true;
  }

  dealrView() {
    this.dealr_open = true;
    this.should_open = false;
  }
  postDealrDetail() {
    this.dealrModelObj.name = this.formValue.value.dealrName;
    this.dealrModelObj.totalBudget = this.formValue.value.totalBudget;
    this.dealrModelObj.remainingBudget = this.formValue.value.remainingBudget;
    this.dealrModelObj.owner = this.formValue.value.owner;
    this.dealrModelObj.location = this.formValue.value.location;

    this.api.postDealr(this.dealrModelObj).subscribe(res => {
      console.log(res);
      alert("dealr record")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllDealrs()
    },
      err => {
        alert("something wrong")
      })
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


  onEditDealrs(dealr: any) {
    this.showAdd = false;
    // this.showUpdate = true;
    this.dealrModelObj.id = dealr.id;
    this.formValue.controls['dealrName'].setValue(dealr.dealrName);
    this.formValue.controls['amountOfCars'].setValue(dealr.amountOfCars)
    this.formValue.controls['totalBudget'].setValue(dealr.totalBudget);
    this.formValue.controls['remainingBudget'].setValue(dealr.remainingBudget);
    this.formValue.controls['owner'].setValue(dealr.owner)
    this.formValue.controls['location'].setValue(dealr.location);
  }

  updateDealrsDetails() {
    this.dealrModelObj.name = this.formValue.value.dealrName;
    this.dealrModelObj.amountOfCars = this.formValue.value.amountOfCars;
    this.dealrModelObj.totalBudget = this.formValue.value.totalBudget;
    this.dealrModelObj.remainingBudget = this.formValue.value.remainingBudget;
    this.dealrModelObj.owner = this.formValue.value.owner;
    this.dealrModelObj.location = this.formValue.value.location;

    this.api.updateDealr(this.dealrModelObj, this.dealrModelObj.id).subscribe(res => {
      alert("Dealr record updated");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllDealrs()
    })

  }

  //------------car data--------//

  carsView() {
    this.dealr_open = false;
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
    this.formValueCar.reset();
    this.showAddCar = true;
    // this.showUpdateCar = false;
  }

  postCarsDetail() {
    debugger
    this.carsModelObj.name = this.formValueCar.value.name;
    this.carsModelObj.model = this.formValueCar.value.model;
    this.carsModelObj.brand = this.formValueCar.value.brand;
    this.carsModelObj.color = this.formValueCar.value.color;
    this.carsModelObj.price = this.formValueCar.value.price;

    this.carsService.postCars(this.carsModelObj).subscribe((res) => {
      console.log(res);
      alert("cars record")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValueCar.reset();
      this.getAllcarsDAta()
    },
      err => {
        alert("something wrong")
      })
  }
  onEditCars(car: any) {
    // this.showAddCar = false;
    // this.showUpdateCar = true;
    this.carsModelObj.id = car.id;
    this.formValueCar.controls['name'].setValue(car.name);
    this.formValueCar.controls['model'].setValue(car.model)
    this.formValueCar.controls['brand'].setValue(car.brand);
    this.formValueCar.controls['color'].setValue(car.color);
    this.formValueCar.controls['price'].setValue(car.price)
  }

  deleteCars(car: any) {
    this.carsService.deleteCars(car.id).subscribe(res => {
      alert("Car record deleted")
      this.getAllcarsDAta()
    })
  }
}

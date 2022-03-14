import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Cars } from '../cars.model';
import { CarsService } from '../shared/cars.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {
 
  carsData: any;
  formValue!: FormGroup
  carsModelObj: Cars = new Cars();
  showAdd!: boolean;
  showUpdate!: boolean;
  dealr_open: boolean | undefined;
  should_open: boolean | undefined;

  constructor(private formBuilder: FormBuilder, private carsService: CarsService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      model: [''],
      brand: [''],
      color: [''],
      price: ['']
    })
    this.getAllcarsDAta()
  }
  carsView(){
    this.dealr_open=false;
    this.should_open = true;
  }
  addCars() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postCarsDetail() {
    this.carsModelObj.name = this.formValue.value.name;
    this.carsModelObj.model = this.formValue.value.model;
    this.carsModelObj.brand = this.formValue.value.brand;
    this.carsModelObj.color = this.formValue.value.color;
    this.carsModelObj.price = this.formValue.value.price;

    this.carsService.postCars(this.carsModelObj).subscribe((res) => {
      console.log(res);
      alert("cars record")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllcarsDAta()
    },
      err => {
        alert("something wrong")
      })
  }
  getAllcarsDAta() {
    this.carsService.getCars().subscribe(res => {
      this.carsData = res;
      console.log(res);
    })
  }
  
deleteCars(car:any){
  this.carsService.deleteCars(car);
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

}







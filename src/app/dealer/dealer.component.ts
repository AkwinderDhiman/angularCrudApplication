import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Dealers } from '../dealers.model';
import { ApiService } from '../shared/api.service';
@Component({
  selector: 'app-dealer',
  templateUrl: './dealer.component.html',
  styleUrls: ['./dealer.component.scss']
})
export class DealerComponent implements OnInit {
  formValue!: FormGroup
  dealrModelObj: Dealers = new Dealers();
  dealrData: any;
  showUpdate!: boolean;
  showAdd!: boolean;

  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
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

  onEditDealrs(dealr:any){
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


}
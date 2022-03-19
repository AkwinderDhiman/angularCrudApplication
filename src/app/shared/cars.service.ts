import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Cars } from '../cars.model';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  car: Cars = new Cars();
  constructor(private httpClient:HttpClient) { }

  postCars( data:any){
    return this.httpClient.post<any>("http://localhost:3000/posts",data).pipe(map((res:any)=>{
      return res;
    }))
  }
  getCars(){
    return this.httpClient.get<any>("http://localhost:3000/posts").pipe(map((res:any)=>{
      return res;
    }))
  }
  updateCars( data:any, id:number){
    return this.httpClient.put<any>("http://localhost:3000/posts/"+ id,data).pipe(map((res:any)=>{
      return res;
    }))
  }
  deleteCars(id:number){
    return this.httpClient.delete<any>("http://localhost:3000/posts/"+ id).pipe(map((res:any)=>{
      return res;
    }))
  }
}

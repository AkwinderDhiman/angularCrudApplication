import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Dealers } from '../dealers.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  dealr: Dealers= new Dealers();
  constructor( private httpClient:HttpClient) { }

  postDealr( data:any){
    return this.httpClient.post<any>("http://localhost:3000/posts",data).pipe(map((res:any)=>{
      return res;
    }))
  }
  getDealr(){
    return this.httpClient.get<any>("http://localhost:3000/posts").pipe(map((res:any)=>{
      return res;
    }))
  }
  updateDealr( data:any, id:number){
    return this.httpClient.put<any>("http://localhost:3000/posts/"+ id,data).pipe(map((res:any)=>{
      return res;
    }))
  }
  deleteDealr(id:number){
    return this.httpClient.delete<any>("http://localhost:3000/posts/"+ id).pipe(map((res:any)=>{
      return res;
    }))
  }
}

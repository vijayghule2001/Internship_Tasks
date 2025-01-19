import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  saveStudentApi(obj:any)
  {
    return this.http.post("http://localhost:3000/students",obj)
  }
  getStudentListApi()
  {
    return this.http.get("http://localhost:3000/students")
  }

  getStudentById(id:any)
  {
    return  this.http.get("http://localhost:3000/students/"+id)
  }
  saveUpdatedStudentApi(obj:any,id:any)
  {
    return  this.http.patch("http://localhost:3000/students/"+id,obj)
 
  }
}

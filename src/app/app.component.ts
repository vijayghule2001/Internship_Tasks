import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'reactiveFormProject';
  studet_list:any;
  edit_id:any=0;
  studentForm= new FormGroup({
    "student_name":new FormControl("",Validators.required),
    "student_mobile":new FormControl("",[Validators.required,
                                          Validators.pattern(/^\d{10}$/)])
  })

  constructor(private api:ApiService){
    this.getList()
  }
  getList()
  {
    this.api.getStudentListApi().subscribe((res)=>{
      this.studet_list=res;
      
    })
  }
  saveStudent()
  {
    if (this.studentForm.invalid)
      alert("Invalid Details");
      else
      {
        if(this.edit_id==0)
        {
             this.api.saveStudentApi(this.studentForm.value ).subscribe((res)=>{
               this.studentForm.reset();
              
           })
        }  
        else
        {
          this.api.saveUpdatedStudentApi(this.studentForm.value,this.edit_id ).subscribe((res)=>{
            this.edit_id=0;
            this.studentForm.reset();
            this.getList()
        })

        }
       
        
      }
      this.getList()
  }
  edit(id:any)
  {
     this.api.getStudentById(id).subscribe((res:any)=>{
        this.edit_id=id;
        this.studentForm= new FormGroup({
          "student_name":new FormControl(res.student_name,Validators.required),
          "student_mobile":new FormControl(res.student_mobile,[Validators.required,
                                                Validators.pattern(/^\d{10}$/)])
        })
     })
  }
   
}

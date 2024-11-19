import { Component, OnInit,Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DailyEngagementFilterDTO } from '../DailyEngagementFilterDTO';
import { RegisterService } from 'src/app/shared/services/RegisterService/RegisterService';
//import { TaskDetailComponent } from '../task-detail/task-detail.component';
import { CreateDailyEngagementsComponent } from '../create-daily-engagements/create-daily-engagements.component';
import { PaginationControlsComponent, PaginationInstance } from 'ngx-pagination';
import { state } from '@angular/animations';
declare var require
const Swal = require('sweetalert2')

@Component({
  selector: 'app-public-engagement-list',
  templateUrl: './public-engagement-list.component.html',
  styleUrls: ['./public-engagement-list.component.scss']
})
export class PublicEngagementListComponent implements OnInit {
  private subs = new Subscription();
  temp = [];
  rows = [];
  overdue = [];
  userList =[];
  FilterForm: FormGroup;
  DailyEngagementFilterDTO : DailyEngagementFilterDTO = new DailyEngagementFilterDTO()
  isAdmin:boolean
  isAddTask:boolean
  counts:any
  User: any
  userDesignation:any
  userId:any
  Status:any
  Priority: any[] = [
    { name:"High"},
    { name:"Medium"},
    { name:"Low"} ]
  

    public config: PaginationInstance = {
   id: 'advanced',
    itemsPerPage: 10,
    currentPage: 1
};    

  constructor(private readonly registerService: RegisterService, private readonly toastr: ToastrService,
    private readonly router: Router, private modalService: NgbModal,private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.GetDailyEngagementPublicList();

    


  
  }

  

  




  onPageChange(number: number) {
    
    this.config.currentPage = number;
}

onPageBoundsCorrection(number: number) {
  
    this.config.currentPage = number;
}


  


  

 

 
 

  GetDailyEngagementPublicList() {
    debugger
            this.subs.add(
              this.registerService.GetDailyEngagementPublicList(state).subscribe(
                (data) => {
        
                  this.temp = [...data.result];
        
                  this.rows = data.result;
        console
                  return data;
                },
                (error) => {
                  alert(error);
                }
              )
            );
          }

  
}

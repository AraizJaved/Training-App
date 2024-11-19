import { Component, OnInit,Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ContactFilterDTO } from '../ContactFilterDTO';
import { ContactAllFilterDTO } from '../ContactAllFilterDTO';
import { RegisterService } from 'src/app/shared/services/RegisterService/RegisterService';
//import { TaskDetailComponent } from '../task-detail/task-detail.component';
import { AddContactComponent } from '../add-contact/add-contact.component';
import { PaginationControlsComponent, PaginationInstance } from 'ngx-pagination';
import { AddContactTypeComponent } from '../add-contact-type/add-contact-type.component';
import { state } from '@angular/animations';
import { UpdateContactComponent } from '../update-contact/update-contact.component';
import * as XLSX from 'XLSX'

declare var require
const Swal = require('sweetalert2')

@Component({
  selector: 'app-contact-list-view',
  templateUrl: './contact-list-view.component.html',
  styleUrls: ['./contact-list-view.component.scss']
})
export class ContactListViewComponent implements OnInit {
  public obj: { id: number, title: string } = {
    id: 0,
    title: ''
}
loading = false;
  RegisterForm: FormGroup;
  private subs = new Subscription();
  temp = [];
  rows = [];
  overdue = [];
  userList =[];
  FilterForm: FormGroup;
  ContactFilterDTO : ContactFilterDTO = new ContactFilterDTO()
  ContactAllFilterDTO : ContactAllFilterDTO = new ContactAllFilterDTO()
  isAdmin:boolean
  isAddTask:boolean
  isContactAdd:Boolean
  isContactDelete:Boolean
  counts:any
  User: any
  userDesignation:any
  userId:any
  Status:any
  Company: any[] = [];
  Department: any[] = [];
  Category: any[] = [];
  Designation: any[] = [];
  contactDesignation:any[]=[];
  fileName = '.xlsx';
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

    this.FilterForm = this.formBuilder.group({
      userList: ["All", Validators.required],
      Priority: ["All", Validators.required],
      Status: ["All", Validators.required],
      contactDesignation: [0, Validators.required],
    });
    this.RegisterForm = this.formBuilder.group({

  
      designation: ["", Validators.required],
      department: [0, Validators.required],
   
    
      company: [0, Validators.required],
      category: [0, Validators.required],



    });
    this.isAdmin=true
    var a = JSON.parse(localStorage.getItem('currentUser')).userrole.filter(x=> x.name =='Admin');
    if(a.length =='0' ){
      this.isAdmin=false
    }

    this.isAddTask=true
    var a = JSON.parse(localStorage.getItem('currentUser')).userrole.filter(x=> x.name =='AddTask');
    if(a.length =='0' ){
      this.isAddTask=false
    }

    this.isContactAdd=true
    var a = JSON.parse(localStorage.getItem('currentUser')).userrole.filter(x=> x.name =='ContactAdd');
    if(a.length =='0' ){
      this.isContactAdd=false
    }
    this.isContactDelete=true
    var a = JSON.parse(localStorage.getItem('currentUser')).userrole.filter(x=> x.name =='ContactDelete');
    if(a.length =='0' ){
      this.isContactDelete=false
    }

    this.User = JSON.parse(localStorage.getItem('currentUser'))
      this.userId=this.User.user.id
      this.userDesignation=this.User.user.designation
      console.log("sdfsdfdsfsdf",this.userDesignation)
    this.TaskCount() 
    this.getStatus()
    this.getUserList()
    //this.TaskList()
    this.FilterTasks()
 
    this.getCompany()
  }

  IsCCFn(taskCC:any){

var a=taskCC.includes(this.userDesignation) 
return taskCC.includes(this.userDesignation) ? '#96c796':'';
 

  }

  onPageChange(number: number) {
    
    this.config.currentPage = number;
}

onPageBoundsCorrection(number: number) {
  
    this.config.currentPage = number;
}
GetLink(filename:string){
  //return "http://localhost:56990/Uploads/ProfilePictures/"+filename;
  return "https://mms.pshealthpunjab.gov.pk/Uploads/ProfilePictures/"+filename;
  
}
  AddTask(){

   const modalRef =  this.modalService.open(AddContactComponent, { size: 'lg' });

    modalRef.result.then((data) => {
      debugger
      this.FilterTasks()
      this.TaskCount()
      //this.activeModal.close()
    }, (reason) => {
      // on dismiss
    });
  }
  AddContactType(){

    const modalRef =  this.modalService.open(AddContactTypeComponent, { size: 'lg' });
 
     modalRef.result.then((data) => {
       debugger
       this.FilterTasks()
       this.TaskCount()
       //this.activeModal.close()
     }, (reason) => {
       // on dismiss
     });
   }
  TaskList(){
    debugger
    this.subs.add(
      this.registerService.getFilteredList(this.ContactFilterDTO).subscribe(
        (data) => {
          debugger

          this.temp = [...data.result];

          this.rows = data.result;

          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }

  TaskCount(){
    this.subs.add(
      this.registerService.getTaskCount().subscribe(
        (data) => {
          debugger
         // this.temp = [...data.result];
          this.counts = data.result;
          // this.rows = this.rows.filter(x => x.taskStatus == "Pending")
          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }

  getUserList(){

    this.subs.add(

      this.registerService.getUserList().subscribe(
        (data) => {
          debugger
          //this.temp = [...data.result];
          // this.userList.push({
          //   id : "0",
          //   name : 'All Users'
          // });
          data.data.forEach(element => {
            this.userList.push(element)
          });
          this.userList=this.userList.filter(x=> x.name !=='Secretary')
          console.log("userList", this.userList)
          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }

  FilterTasks(){
  debugger
    // if(this.FilterForm.controls.userList.value=="All"){
    //   this.ContactAllFilterDTO.userList=null;
    // }
    // else{
    //   this.ContactAllFilterDTO.userList = this.FilterForm.controls.userList.value;
    // }

    
      this.ContactAllFilterDTO.contactCompanyIds=this.RegisterForm.controls.company.value;
   
 
      this.ContactAllFilterDTO.contactDepartmentIds=this.RegisterForm.controls.department.value;

      this.ContactAllFilterDTO.contactCategoryIds=this.RegisterForm.controls.category.value;
  
      this.ContactAllFilterDTO.contactDesignationIds=this.FilterForm.controls.contactDesignation.value;
    
      this.loading = true;

    this.subs.add(
      this.registerService.getContactAllFilteredList(this.ContactAllFilterDTO).subscribe(
        (data) => {
          debugger

          this.temp = [...data.result];

          this.rows = data.result;
          this.loading = false;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }

  


  

  getStatus(){
    debugger
    this.subs.add(

      this.registerService.getStatus().subscribe(
        (data) => {
          debugger
        

          this.Status = data.data;
          
        // if(this.isAdmin !=true){

        //   this.Status=this.Status.result.filter(x=>x.status!="Completed")
          
        //   this.Status=this.Status.filter(x=>x.status!="ReOpen")
          
        // }
        
          console.log("Status", this.Status)
          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }
    getContactDesignation(category: any) {
        debugger
                this.subs.add(
                  this.registerService.getDesignation(category).subscribe(
                    (data) => {
            
                      this.temp = [...data.result];
            
                      this.contactDesignation = data.result;
            console
                      return data;
                    },
                    (error) => {
                      alert(error);
                    }
                  )
                );
              }


              //old  getContactDesignation() {
              //   debugger
              //           this.subs.add(
              //             this.registerService.getContactAllDesignationList(state).subscribe(
              //               (data) => {
                    
              //                 this.temp = [...data.result];
                    
              //                 this.contactDesignation = data.result;
              //       console
              //                 return data;
              //               },
              //               (error) => {
              //                 alert(error);
              //               }
              //             )
              //           );
              //         }

  getList(id:any){

    debugger 

    this.ContactFilterDTO.userList =null;
    this.ContactFilterDTO.Priority = "All";
    if(id=="1"){
      this.ContactFilterDTO.Status = "All";
    }
    if(id=="2"){
      this.ContactFilterDTO.Status = "Pending";
    }
    if(id=="3"){
      this.ContactFilterDTO.Status = "In Progress";
    }

    if(id=="4"){
      this.ContactFilterDTO.Status = "Overdue";
    }
    if(id=="5"){
      this.ContactFilterDTO.Status = "Submit For Approval";
    }
    if(id=="6"){
      this.ContactFilterDTO.Status = "Completed";
    }
    this.subs.add(
      this.registerService.getFilteredList(this.ContactFilterDTO).subscribe(
        (data) => {
          debugger

          this.temp = [...data.result];
          this.rows = data.result;
          this.FilterForm.controls.Status.setValue(this.ContactFilterDTO.Status)

        },
        (error) => {
          alert(error);
        }
      )
    );
  }

  onDelete(id:any){
    debugger
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: false,
      showCancelButton: true,

    }).then((result) => {

      if (result.value) {

        this.subs.add(this.registerService.deleteContact(id).subscribe(
          (data) => {

            swalWithBootstrapButtons.fire(
              'Deleted!',
              'Your Record has been deleted.',
              'success',
              this.FilterTasks(),
              this.TaskCount()
            )
          }
        ))

      } else if (
        // Read more about handling dismissals
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Record is Safe :)',
          'error'
        )
      }
    })
  }
  OnUpdateContact(taskId: any): void {
    debugger;

    const modalRef = this.modalService.open(UpdateContactComponent, { size: 'lg' });
    
    modalRef.componentInstance.taskId = taskId;
    
  }

  //  Start My Work
  getCompany() {

    this.subs.add(
      this.registerService.getCompany(state).subscribe(
        (data) => {

          this.temp = [...data.result];
          let d = data.result;
          // console.log(d);
          // if (this.isSpecializedDE == true) {
          //   d = d.filter(x => x.id == 5);
          // }
          console.log(d);
          this.Company = d;


          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }
  getDepartment(company: any) {


    this.subs.add(
      this.registerService.getDepartment(company).subscribe(
        (data) => {


          this.temp = [...data.result];

          this.Department = data.result;


          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }


  getCategory(department: any) {

    this.subs.add(
      this.registerService.getCategory(department).subscribe(
        (data) => {


          this.temp = [...data.result];

          this.Category = data.result;


          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }





  getDesignation(category: any) {

    this.subs.add(
      this.registerService.getDesignation(category).subscribe(
        (data) => {


          this.temp = [...data.result];

          this.Designation = data.result;


          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }

  exportexcel(): void {
    this.fileName = this.obj.title + ' ContactList.xlsx'
    /* table id is passed over here */
    let element = document.getElementById('reportTable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);

}



  // End My Work


  
  
}

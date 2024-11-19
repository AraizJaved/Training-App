import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { Subscription, throwError } from 'rxjs';
import { YesNoDTO } from 'src/app/FormsIndicator/FormIndicatorDTO';
import { RegisterService } from 'src/app/shared/services/RegisterService/RegisterService';
import { TaskDTO } from '../TaskDTO';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import moment from 'moment';
declare var require
const Swal = require('sweetalert2')

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {

  public taskDetail: any
  task = []
  public temp: any
  public show: boolean = false
  TaskDetailsForm: FormGroup;
  files: string[] = []
  public searchString: string;
  @Input() taskId;
  @Input() currentStatus;
  @Input() isCc;
  error = "";
  formData: FormData;
  AssignTo: any[] = [];
  TaskDTO: TaskDTO = new TaskDTO();
  loading: boolean;
  userName: string
  Status: any
  isAdmin: boolean
  taskForward: boolean = false;
  taskForwardHide: boolean = true;
  user: any;
  ShowDate = false;
  Priority: any[] = [
    { name: "High" },
    { name: "Medium" },
    { name: "Low" }];
  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    allowSearchFilter: true
  };
  parentSubmitted = false;
  RegisterForm: FormGroup;
  lSDesgination: any;
  lSUser: any;
  progress: number;
  minDate = moment(new Date()).format('YYYY-MM-DD');
  private subs = new Subscription();
  constructor(private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router, private formBuilder: FormBuilder,
    private readonly toastr: ToastrService, private readonly registerService: RegisterService,
    public activeModal: NgbActiveModal, private modalService: NgbModal) {

    //this.taskId = this.activatedRoute.snapshot.queryParams.id
    this.user = JSON.parse(localStorage.getItem("currentUser"))

  }

  ngOnInit(): void {
    debugger

    this.TaskDetailsForm = this.formBuilder.group({
      comments: ["", Validators.required],
      status: ["", Validators.required],
      extendedDueDate: [null, Validators.required]
    });

    this.RegisterForm = this.formBuilder.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      assignTo: ["", Validators.required],
      dueDate: ["", Validators.required],
      priority: ["", Validators.required],


    });
    this.isAdmin = true
    var a = JSON.parse(localStorage.getItem('currentUser')).userrole.filter(x => x.name == 'Admin');
    if (a.length == '0') {
      this.isAdmin = false
    }

    this.userName = JSON.parse(localStorage.getItem('currentUser')).user.normalizedUserName;

    if (this.currentStatus == 'Pending') {
      this.TaskDetailsForm.controls.status.setValue(1)
    } if (this.currentStatus == 'In Progress') {
      this.TaskDetailsForm.controls.status.setValue(3)
    } if (this.currentStatus == 'Completed') {
      this.TaskDetailsForm.controls.status.setValue(4)
    } if (this.currentStatus == 'Submit For Approval') {
      this.TaskDetailsForm.controls.status.setValue(7)
    } if (this.currentStatus == 'ReOpen') {
      this.TaskDetailsForm.controls.status.setValue(9)
    }

    this.getTaskDetail(this.taskId);
    this.getTask(this.taskId);
    this.getStatus();
    this.formData = new FormData()

    this.subs.add(

      this.registerService.getUserList().subscribe(
        (data) => {
          debugger
          //this.temp = [...data.result];
          this.AssignTo = data.data;
          this.AssignTo = this.AssignTo.filter(x => x.name !== 'Imran Skindar')

          console.log("AssignTo", this.AssignTo)
          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );
    this.lSUser = JSON.parse(localStorage.getItem('currentUser'))
    this.lSDesgination = this.lSUser.user.id
  }

  CheckSuggestion() {
    debugger
    if (this.TaskDetailsForm.controls.comments.value == "@") {
      console.log("dsfs")
    }
  }
  checkShow() {
    debugger
    this.show = true
  }
  checkHide() {
    this.show = false
  }
  onFileChange(event) {
    debugger
    for (var i = 0; i < event.target.files.length; i++) {
      this.files.push(event.target.files[i]);
    }
  }
  getStatus() {
    debugger
    this.subs.add(

      this.registerService.getStatus().subscribe(
        (data) => {
          debugger

          this.Status = data.data;

          if (this.isAdmin != true) {

            this.Status = this.Status.filter(x => x.status != "Completed")

            this.Status = this.Status.filter(x => x.status != "ReOpen")

          }
          if (this.currentStatus != 'Submit For Approval') {

            this.Status = this.Status.filter(x => x.status != "Completed")

            this.Status = this.Status.filter(x => x.status != "ReOpen")

          }
          if (this.currentStatus == 'Submit For Approval') {

            this.Status = this.Status.filter(x => x.status != "Pending")

            this.Status = this.Status.filter(x => x.status != "In Progress")



          }

          console.log("Status", this.Status)
          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }

  onClose() {
    this.activeModal.close()
  }
  onDownload(attachment: any) {


    attachment.forEach(element => {


      setTimeout(() => {

        let attachmentName = "https://dsr.pshealthpunjab.gov.pk/Uploads/" + element;

        const link = document.createElement('a');
        link.href = attachmentName;
        link.target = "_blank";
        link.setAttribute('download', attachmentName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        console.log("attachment", element)

      }, 100)

    });


  }

  getTaskDetail(id: any) {
    debugger
    this.subs.add(

      this.registerService.getTaskDetail(id).subscribe(
        (data) => {
          debugger

          this.taskDetail = data;




          console.log("taskDetail", this.taskDetail)
          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );

  }

  getTask(id: any) {
    debugger
    this.subs.add(

      this.registerService.getTaskById(id).subscribe(
        (data) => {
          debugger

          this.task = data.result;
          console.log("task", this.task)
          return this.task;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }

  getInitials(name) {
    debugger
    var canvas = document.createElement("canvas");
    canvas.style.display = "none";
    canvas.width = 50;
    canvas.height = 50;
    document.body.appendChild(canvas);
    var context = canvas.getContext("2d");
    context.fillStyle = "orange";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.font = "24px Arial";
    context.fillStyle = "#fff";
    var first, last;
    if (name && name.first && name.first != "") {
      first = name.first[0];
      last = name.last && name.last != "" ? name.last[0] : null;
      if (last) {
        var initials = first + last;
        context.fillText(initials.toUpperCase(), 10, 33);
      } else {
        var initials = first;
        context.fillText(initials.toUpperCase(), 20, 33);
      }
      var data = canvas.toDataURL();
      document.body.removeChild(canvas);
      return data;
    } else {
      return false;
    }
  }

  GetNameInitials(name) {

    var arr = name.substring(0, 2)
    return arr;
  }

  onFileSelect(event) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.TaskDTO.attachment = file;
    }
  }

  onCommentDelete(id: any) {
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

        this.subs.add(this.registerService.onCommentDelete(id).subscribe(
          (data) => {

            swalWithBootstrapButtons.fire(
              'Deleted!',
              'Your Record has been deleted.',
              'success',
              this.getTaskDetail(this.taskId),
              this.getTask(this.taskId),
              this.getStatus()
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



  onSubmit() {

    debugger
    //this.formData.append('attachment', this.TaskDTO.attachment)

    if (this.TaskDetailsForm.controls.comments.value == "") {

      this.toastr.error("Please write some comments...", "Comments Required", { closeButton: true });
      return
    }

    for (var i = 0; i < this.files.length; i++) {
      this.formData.append("taskAttachments", this.files[i]);
    }
    this.formData.append('comments', this.TaskDetailsForm.controls.comments.value)
    // if(this.TaskDetailsForm.controls.status.value ==)

    this.formData.append('taskStatus', this.TaskDetailsForm.controls.status.value)
    this.formData.append('taskId', this.taskId)
    this.loading = true;
    this.subs.add(
      this.registerService.AddDetails(this.formData)
        .pipe(
          map((event: any) => {
            if (event.type == HttpEventType.UploadProgress) {
              this.progress = Math.round((100 / event.total) * event.loaded);
              if (this.progress == 100) {

                var contaxt = this;
                setTimeout(() => {
                  debugger
                  contaxt.activeModal.close();
                }, 2000);
                // function fun(){
                //   debugger
                //   contaxt.activeModal.close();
                // }  

                this.toastr.success("Details Added Sucessfully", "Saved", { closeButton: true });

              }
            } else if (event.type == HttpEventType.Response) {
              this.progress = null;
            }
          }),
          catchError((err: any) => {
            this.progress = null;
            debugger
            //alert(err.message);
            console.log(err.message);
            return throwError(err.message);

          })
        ).subscribe(
          (data) => {
            debugger
            this.loading = false;

            //window.location.reload()
            // this.activeModal.close()
            // this.router.navigate(['/taskList']);
          },
          (error) => {
            this.error = error;
            this.loading = false;
          }
        )
    );


  }



  onSubmitUpdateExtendedDate() {

    debugger
    //this.formData.append('attachment', this.TaskDTO.attachment)

    this.formData.append('Id', this.taskId)

    this.formData.append('ExtendedDate', this.TaskDetailsForm.controls.extendedDueDate.value)
    // if(this.TaskDetailsForm.controls.status.value ==)



    this.subs.add(
      this.registerService.UpdateTaskExtendedDate(this.formData).subscribe(
        (data) => {
          debugger
          this.loading = false;
          this.toastr.success("Details Added Sucessfully", "Saved", { closeButton: true });
          window.location.reload()
          this.activeModal.close()
          // this.router.navigate(['/taskList']);
        },
        (error) => {
          this.error = error;
          this.loading = false;
        }
      )
    );


  }


  onItemSelectAssignTo(item: any) {


  }
  onSelectAllAssignTo(items: any) {

  }

  onItemDeSelectAssignTo(item: any) {


  }

  onItemDeSelectAssignToAll() {

  }

  onTaskForwardShowFunc() {
    this.taskForward = true;
    this.taskForwardHide = false
  }
  onTaskForwardHideFunc() {
    this.taskForward = false;
    this.taskForwardHide = true
  }

  onTaskForwardFunc() {
    this.formData = new FormData()
    debugger
    this.parentSubmitted = true
    this.loading = true;

    if (this.RegisterForm.invalid) {

      if (!this.RegisterForm.controls.description.value
        || !this.RegisterForm.controls.assignTo.value || !this.RegisterForm.controls.priority.value
        || !this.RegisterForm.controls.dueDate.value) {

        this.toastr.info("Please Fill all Fields", "Invalid", { closeButton: true });
        return
      }

    }



    let assigness = []
    this.RegisterForm.controls.assignTo.value.forEach(element => {
      assigness.push({
        taskAssigneeId: element.id,
        taskAssigneeName: element.name,
      })
    });

    debugger
    this.formData.append('description', this.RegisterForm.controls.description.value)
    this.formData.append('title', this.task[0].title)
    this.formData.append('assignTo', "")
    this.formData.append('taskAssigneeData', JSON.stringify(assigness))
    this.formData.append('taskCcData', "Not Available")
    this.formData.append('designation', this.lSDesgination)
    this.formData.append('dueDate', this.RegisterForm.controls.dueDate.value)
    this.formData.append('priority', this.RegisterForm.controls.priority.value)
    this.formData.append('taskStatus', '1')
    this.formData.append('parentTaskId', this.task[0].id)
    debugger


    this.subs.add(
      this.registerService.AddTask(this.formData).subscribe(
        (data) => {
          console.log("data Response", data)
          this.loading = false;


          if (this.TaskDTO.id > 0) {
            this.toastr.success("Record Updated Sucessfully", "Updated", { closeButton: true });
          } else {
            this.toastr.success("Record Added Sucessfully", "Saved", { closeButton: true });
          }
          this.activeModal.close()
          // if (data.status == 'Warning') {

          //   this.toastr.error(data.message, "Warning", { closeButton: true });
          // } else {
          //   if (this.TaskDTO.id > 0) {
          //     this.toastr.success("Record Updated Sucessfully", "Updated", { closeButton: true });
          //   } else {
          //     this.toastr.success("Record Added Sucessfully", "Saved", { closeButton: true });
          //   }
          //   this.RegisterForm = this.formBuilder.group({

          //     title: "",
          //     description: "",
          //     assignTo: "",
          //     dueDate: "",
          //     attachment: "",
          //   });
          //   //this.router.navigate(['/taskDashboard']);
          // //  window.location.reload()
          //  this.activeModal.close()
          // }
        },
        (error) => {
          this.error = error;
          this.loading = false;
        }
      )
    );
  }
}



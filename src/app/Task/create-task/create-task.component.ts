import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, throwError } from 'rxjs';
import { TaskDTO } from '../TaskDTO';
import { RegisterService } from 'src/app/shared/services/RegisterService/RegisterService';
import { RoleService } from 'src/app/shared/services/RoleService/RoleService';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { catchError, map } from 'rxjs/operators';
import moment from 'moment';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {

  RegisterForm: FormGroup;
  private subs = new Subscription();
  TaskDTO: TaskDTO = new TaskDTO();
  error = "";
  loading = false;
  AssignTo: any[] = [];
  TaskCC: any[] = [];
  public id: number = 0;
  parentSubmitted = false;
  temp: any[];
  rows = [];
  files: string[] = []
  forms: any;
  date: Date;
  minDate = moment(new Date()).format('YYYY-MM-DD');
  formData: FormData;
  lSUser: any;
  lSDesgination: any;
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
  progress: number;
  public isEdit: boolean = false;

  constructor(private formBuilder: FormBuilder, private readonly httpClient: HttpClient, private readonly toastr: ToastrService,
    private readonly router: Router, private readonly registerService: RegisterService, private readonly activatedRoute: ActivatedRoute,
    private readonly roleService: RoleService, public activeModal: NgbActiveModal,) { }

  ngOnInit(): void {

    this.id = this.activatedRoute.snapshot.queryParams.id;
    //this.Edit(this.id);

    this.RegisterForm = this.formBuilder.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      assignTo: ["", Validators.required],
      taskCc: ["", Validators.required],
      dueDate: ["", Validators.required],
      priority: ["", Validators.required],
      attachment: ["", Validators.required],

    });

    debugger
    this.date = new Date();
    //this.RegisterForm.controls.dueDate.setValue(date.getDate() - 1);

    this.subs.add(

      this.registerService.getUserList().subscribe(
        (data) => {
          debugger
          //this.temp = [...data.result];
          this.AssignTo = data.data;
          this.AssignTo = this.AssignTo.filter(x => x.name !== 'Imran Skindar')
          this.TaskCC = this.AssignTo.filter(x => x.name !== 'Imran Skindar')
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
    console.log("dsffffffffff", this.lSDesgination)
  }

  onFileSelect(event) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.TaskDTO.attachment = file;
    }
  }
  onItemSelectAssignTo(item: any) {
    debugger

    this.TaskCC = this.TaskCC.filter(x => x.name !== item.name)

    console.log("asdsad", this.TaskCC);
  }
  onSelectAllAssignTo(items: any) {
    debugger
    for (var i = 0; i < items.length; i++) {
      this.TaskCC = this.TaskCC.filter(x => x.name !== items[i].name)
    }
    console.log(items);
  }

  onItemDeSelectAssignTo(item: any) {

    this.TaskCC = [...this.TaskCC, { name: item.name, id: item.id }]

    console.log("asdsad", this.TaskCC);
  }

  onItemDeSelectAssignToAll() {
    debugger
    this.TaskCC = this.AssignTo.filter(x => x.name !== 'Imran Skindar')
  }
  onItemSelect(item: any) {

    console.log("asdsad", item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }


  onFileChange(event) {
    debugger
    for (var i = 0; i < event.target.files.length; i++) {
      this.files.push(event.target.files[i]);
    }
  }

  onSubmit() {
    this.formData = new FormData()
    debugger
    this.parentSubmitted = true
    this.loading = true;
    if (this.RegisterForm.invalid) {

      if (!this.RegisterForm.controls.title.value || !this.RegisterForm.controls.description.value
        || !this.RegisterForm.controls.assignTo.value || !this.RegisterForm.controls.priority.value
        || !this.RegisterForm.controls.dueDate.value) {

        this.toastr.info("Please Fill all Fields", "Invalid", { closeButton: true });
        return
      }

    }


    // const formData = new FormData()

    // Object.keys(this.TaskDTO)
    //   .forEach(k => {
    //     formData.append(k, this.TaskDTO[k])
    //   })
    this.formData.append('Id', '0')
    for (var i = 0; i < this.files.length; i++) {
      this.formData.append("taskAttachments", this.files[i]);
    }
    let assigness = []
    this.RegisterForm.controls.assignTo.value.forEach(element => {
      assigness.push({
        taskAssigneeId: element.id,
        taskAssigneeName: element.name,
      })
    });
    let taskCcs = []
    if (this.RegisterForm.controls.taskCc.value) {
      this.RegisterForm.controls.taskCc.value.forEach(element => {
        taskCcs.push({
          taskCcId: element.id,
          taskCcName: element.name,
        })
      });
    }
    debugger
    this.formData.append('description', this.RegisterForm.controls.description.value)
    this.formData.append('title', this.RegisterForm.controls.title.value)
    this.formData.append('assignTo', "")
    this.formData.append('taskAssigneeData', JSON.stringify(assigness))
    this.formData.append('taskCcData', JSON.stringify(taskCcs))
    this.formData.append('designation', this.lSDesgination)
    this.formData.append('dueDate', this.RegisterForm.controls.dueDate.value)
    this.formData.append('priority', this.RegisterForm.controls.priority.value)
    this.formData.append('taskStatus', '1')
    debugger


    this.subs.add(
      this.registerService.AddTask(this.formData)
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
                if (this.TaskDTO.id > 0) {
                  this.toastr.success("Record Updated Sucessfully", "Updated", { closeButton: true });
                } else {
                  this.toastr.success("Record Added Sucessfully", "Saved", { closeButton: true });
                }

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
        )
        .subscribe(
          (data) => {
            console.log("data Response", data)
            this.loading = false;

            // if (data.status == 'Warning') { comented bcz of progress bar

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
            // // this.activeModal.close()
            // }
          },
          (error) => {
            this.error = error;
            this.loading = false;
          }
        )
    );
  }


  onClose() {
    this.activeModal.close()
  }

}

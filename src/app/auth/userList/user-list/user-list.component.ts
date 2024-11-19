import { state } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { RoleService } from 'src/app/shared/services/RoleService/RoleService';
import { ChangePasswordComponent } from '../../change-password/change-password.component';
declare var require
const Swal = require('sweetalert2')
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  private subs = new Subscription();
  temp: any[];
  rows = [];
  TableRowsData = [];
  Role: string;
  submitted = false;
  error = "";
  loading = false;
  public id: any;

  @ViewChild(DatatableComponent) myFilterTable: DatatableComponent;

  constructor(private readonly roleService: RoleService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly toastr: ToastrService,
    private readonly router: Router, private modalService: NgbModal) {


  }

  ngOnInit(): void {
    this.getDataUsersList();
  }


  getDataUsersList() {
    this.subs.add(
      this.roleService.getUsers(state).subscribe(
        (data) => {
          debugger
          this.temp = [...data.result];
          this.rows = data.result;
          this.TableRowsData = data.result;
          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `http://swimlane.github.io/ngx-datatable/assets/data/company.json`);

    req.onload = () => {
      const data = JSON.parse(req.response);
      cb(data);
    };

    req.send();
  }


  routeToCreateUser() {
    this.router.navigate(['/register']);
  }




  updateFilter(event) {

    var val = event.target.value.toLowerCase();

    // filter our data
    this.TableRowsData = this.rows.filter(function (d) {
      return d.userName.toLowerCase().indexOf(val) !== -1 || d.designation.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    //this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.myFilterTable.offset = 0;
  }

  assignRole(id: number) {

    this.router.navigate(['/userRoleAssign'], { queryParams: { id } })
  }

  assignDistrict(id: number) {

    this.router.navigate(['/assignDistrict'], { queryParams: { id } })
  }

  changePassword(id: any) {
    debugger
    const modalRef = this.modalService.open(ChangePasswordComponent, { size: 'lg' });
    const a = this.TableRowsData.filter(x => x.id == id)

    modalRef.componentInstance.oldPassword = a[0].np;

    modalRef.componentInstance.userID = id;
    // this.getDataUsersList();
  }

  onDelete(id: string) {

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

        this.subs.add(this.roleService.DeleteUser(id).subscribe(
          (data) => {

            this.loading = false;

            swalWithBootstrapButtons.fire(
              'Deleted!',
              'Your Record has been deleted.',
              'success',


              this.getDataUsersList()
            )
          }
        ))

  } else if(
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

}

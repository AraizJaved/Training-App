import { state } from "@angular/animations";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import {  Subscription } from "rxjs";
import { RoleService } from "src/app/shared/services/RoleService/RoleService";
declare var require
const Swal = require('sweetalert2')
@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})


export class RoleComponent implements OnInit {

  RoleForm: FormGroup;
  rows = [];
  Role:string;
  submitted = false;
  error = "";
  loading = false;
  public id: any;

  //AddDrugFormulary: DrugFormulary = new DrugFormulary();
  private subs = new Subscription();
  temp:any [];

  constructor(
    private formBuilder: FormBuilder,
    private readonly roleService: RoleService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly toastr: ToastrService,

  ) {

    this.subs.add(
      this.roleService.getData(state).subscribe(
        (data) => {
        
          this.temp = [...data.result];
          this.rows = data.result;
          this.rows = this.rows.map(a => {
            return {
              name: a
            }
          })
          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }

  ngOnInit(): void {

    this.RoleForm = this.formBuilder.group({
      Name: ["", Validators.required],
    });
  }

  onSubmit() {

    this.submitted = true;

    if (this.RoleForm.invalid) {
      this.toastr.info("Please Provide Valid Role Name", "Invalid", { closeButton: true });
      return;
    }
    this.loading = true;
    this.Role = this.RoleForm.controls.Name.value;

    this.subs.add(
      this.roleService.AddRole(this.Role).subscribe(
        (data) => {
          this.loading = false;
          
          this.toastr.success("Role Added Sucessfully", "Saved", { closeButton: true });

          this.subs.add(
            this.roleService.getData(state).subscribe(
              (data) => {
                // this.router.navigate(['/account/login'])
               
                this.temp = [...data.result];
                this.rows = data.result;

                this.rows = this.rows.map(a => {
                  return {
                    name: a
                  }
                })
                return data;
              },
              (error) => {
                this.error = error;
                this.loading = false;
              }
            )
          );
        },
        (error) => {
          this.error = error;
          this.loading = false;
        },

      )
    );
    this.RoleForm = this.formBuilder.group({
      Name: "",
    });
  }


  onDelete(role: string) {


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

        this.subs.add(this.roleService.DeleteRole(role).subscribe(
          (data) => {

            this.loading = false;
          
            swalWithBootstrapButtons.fire(
              'Deleted!',
              'Your Record has been deleted.',
              'success',
              this.subs.add(this.roleService.getData(state).subscribe(

                (data) => {
                  
                  this.temp = [...data.result];
                  this.rows = data.result;

                  this.rows = this.rows.map(a => {
                    return {
                      name: a
                    }
                  })

                  return this.rows;
                }
              )),
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



}


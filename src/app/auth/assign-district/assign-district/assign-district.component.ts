import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { RegisterService } from 'src/app/shared/services/RegisterService/RegisterService';
import { RoleService } from 'src/app/shared/services/RoleService/RoleService';
import { AssignDistrict, DeleteDistrict } from '../assign-district-dto';
declare var require
const Swal = require('sweetalert2')
@Component({
  selector: 'app-assign-district',
  templateUrl: './assign-district.component.html',
  styleUrls: ['./assign-district.component.scss']
})
export class AssignDistrictComponent implements OnInit {

  AssignDistrictForm: FormGroup;
  rows: AssignDistrict[] = [];
  userInfo: any;
  Role: string;
  parentSubmitted = false;
  AssignDistrictDTO: AssignDistrict = new AssignDistrict();
  error = "";
  loading = false;
  public id: any;
  Division: any[] = [];
  District: any[] = [];
  userId: string;
  district: number;
  //AddDrugFormulary: DrugFormulary = new DrugFormulary();
  private subs = new Subscription();
  temp: any[];

  constructor(
    private formBuilder: FormBuilder,
    private readonly roleService: RoleService,
    private readonly registerService: RegisterService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly toastr: ToastrService,

  ) {
  }

  ngOnInit(): void {

    this.userId = this.activatedRoute.snapshot.queryParams.id

    this.AssignDistrictForm = this.formBuilder.group({
      district: ["", Validators.required],
      division: ["", Validators.required],

    });

    this.getUserinfo(this.userId)
    this.getAssignedDistricts(this.userId)

    // this.subs.add(

    //   this.registerService.getDivision(state).subscribe(

    //     (data) => {

    //       this.temp = [...data.result];

    //       this.Division = data.result;

    //       return data;
    //     },
    //     (error) => {
    //       alert(error);
    //     }
    //   )
    // );
  }

  getUserinfo(id: any) {

    this.subs.add(

      this.roleService.getUserinfo(id).subscribe(

        (data) => {



          //this.temp = [...data.result];

          this.userInfo = data.userinfo;


          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }

  getDistricts(Division: any) {

    this.subs.add(

      this.registerService.getDistrict(Division).subscribe(

        (data) => {


          this.temp = [...data.result];

          this.District = data.result;


          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }

  onChange(Code: string) {

    if (Code.length == 3) {
      this.District = [];
      this.getDistricts(Code);
    }
  }

  onSubmit() {

    this.parentSubmitted = true;

    if (this.AssignDistrictForm.controls.district.value == "") {
      this.toastr.info("Please Select at least one District or Exit the Form", "Invalid", { closeButton: true });
      return;
    }
    for (let i = 0; i < this.rows.length; i++) {

      var dis = this.rows[i].geolvl == this.AssignDistrictForm.controls.district.value;
      if (dis) {
        this.toastr.info("This district is already Assigned", "Invalid", { closeButton: true });
        this.AssignDistrictForm = this.formBuilder.group({
          district: "",
          division: "",
        });
        return;
      }
    }

    this.loading = true;
    this.AssignDistrictDTO.geolvl = this.AssignDistrictForm.controls.district.value;
    this.AssignDistrictDTO.userId = this.userId;

    this.subs.add(
      this.roleService.AddDistrict(this.AssignDistrictDTO).subscribe(
        (data) => {
          this.loading = false;

          this.toastr.success("District Assigned Sucessfully", "Saved", { closeButton: true });

          this.getAssignedDistricts(this.userId)
        },
        (error) => {
          this.error = error;
          this.loading = false;
        },

      )
    );
    this.AssignDistrictForm = this.formBuilder.group({
      district: "",
      division: "",
    });
  }

  getAssignedDistricts(userId: any) {


    this.subs.add(
      this.roleService.GetUserDistrictById(userId).subscribe(data => {

        // this.temp = [...data.result];
        this.rows = data.data;

        return data;


      }, error => {
        alert(error)
      },
      )
    );
  }


  onDelete(district: string) {


    var deleteEntry = new DeleteDistrict();
    deleteEntry = {
      Id: 0,
      userId: this.userId,
      Geolvl: district,

    };

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

        this.subs.add(this.roleService.DeleteDistrict(deleteEntry).subscribe(
          (data) => {

            this.loading = false;

            swalWithBootstrapButtons.fire(
              'Deleted!',
              'Your Record has been deleted.',
              'success',

              this.subs.add(
                this.roleService.GetUserDistrictById(this.userId).subscribe(
                  (data) => {
                    this.rows = data.data;
                    return data;
                  },
                  (error) => {
                    alert(error);
                  }
                )
              ),


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

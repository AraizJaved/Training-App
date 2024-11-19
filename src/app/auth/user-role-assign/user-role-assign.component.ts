import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { Subscription } from 'rxjs'
import { RoleService } from 'src/app/shared/services/RoleService/RoleService'
import { UserAllRoles, UserRoleAssignModel } from 'src/app/auth/user-role-assign/dto/role.assign.dto'
import { ToastrService } from 'ngx-toastr'

@Component({
  templateUrl: './user-role-assign.component.html',
  styleUrls: ['./user-role-assign.component.scss'],
})

export class UserRoleAssignComponent implements OnInit, OnDestroy {

  userId: string

  userAllRoles: UserAllRoles = new UserAllRoles()

  userCurrentRoles: [];
  userAssignForm: FormGroup
  isLoading: boolean
  submit: boolean

  private subs = new Subscription()
  temp: any[]

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly roleService: RoleService,
    private readonly toastr: ToastrService,
    private readonly router: Router,
  ) {
  }

  ngOnInit(): void {

    this.userId = this.activatedRoute.snapshot.queryParams.id
    this.userAssignForm = new FormGroup({
      searchRole: new FormControl(''),
      roles: new FormArray([]),
    })
    this.getUserRoleById(this.userId);
    this.submit = false
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }

  onSubmit(): void {
    debugger
    this.submit = true
    console.log(JSON.stringify(this.userAssignForm.value))
    const addRoleIds: string[] = []
    const deleteRoleIds: string[] = []

    this.form.roles.value.map((value, index) => {
      console.log("Value", value);

      if (value) {
        addRoleIds.push(this.userAllRoles.allRoles[index])
      } else {
        deleteRoleIds.push(this.userAllRoles.allRoles[index])
      }
    })

    console.log('AddRoleIds', addRoleIds)
    console.log('DeleteRoleIds', deleteRoleIds)
    this.assignUserRoles(addRoleIds, deleteRoleIds)
    return
  }

  get form() {
    return this.userAssignForm.controls
  }

  get rolesFormArray() {
    return this.form.roles as FormArray
  }

  private addCheckboxes() {
    debugger
    const checkBoxesValues: boolean[] = []

    this.userAllRoles.allRoles.map((role) => {
      console.log("Role from AddCheckboxes", role);

      checkBoxesValues.push(this.checkValueInArray(role, this.userAllRoles.userRoles))
    })
    debugger
    console.log("checkBox from AddCheckboxes", checkBoxesValues);

    checkBoxesValues.forEach((checkBox) => this.rolesFormArray.push(new FormControl(checkBox)))


    //this.userAllRoles.forEach(() => this.rolesFormArray.push(new FormControl(false)))
  }

  private getUserRoleById(id: any): void {

    this.isLoading = true
    this.subs.add(
      this.roleService.GetUserRoleById(id).subscribe(response => {
        this.userAllRoles = response
        this.addCheckboxes()
        this.isLoading = false
      }, error => {
        alert(error)
      },
      )
    );
  }

  private checkValueInArray(value: string, array: string[]): boolean {
    let isFound = false

    array.map((val) => {
      if (value === val) {
        isFound = true
        return
      }
      return
    })
    return isFound
  }

  private assignUserRoles(addRoleIds: string[], deleteRoleIds: string[]) {

    this.isLoading = true
    let assignUserRolesModel: UserRoleAssignModel = new UserRoleAssignModel()
    assignUserRolesModel.UserId = this.userId
    assignUserRolesModel.AddRoleId = addRoleIds
    assignUserRolesModel.DeleteRoleId = deleteRoleIds
    console.log(JSON.stringify(assignUserRolesModel))
    this.subs.add(this.roleService.assignUserRoles(assignUserRolesModel)
      .subscribe(response => {
        console.log(response)
        if (response.status == "Succeed") {

          this.toastr.success("Roles Update Sucessfully", "Sucess", { closeButton: true });
          this.isLoading = false
          this.router.navigate(['/userList'])
        }

      }, error => {
        alert(error)
      },
      ))
  }
}

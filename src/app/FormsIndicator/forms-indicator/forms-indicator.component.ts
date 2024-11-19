import { state } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { FormIndicatorService } from 'src/app/shared/services/FormIndicatorService/FormIndicatorService';
import { FormIndicatorDTO, OptionList, SubIndicatorListDTO, YesNoDTO } from '../FormIndicatorDTO';
declare var require
const Swal = require('sweetalert2')

@Component({
  selector: 'app-forms-indicator',
  templateUrl: './forms-indicator.component.html',
  styleUrls: ['./forms-indicator.component.scss']
})
export class FormsIndicatorComponent implements OnInit {

  FormIndicator: FormGroup;
  public AttachmentList: SubIndicatorListDTO[] = [];
  public InputTypeList: OptionList[] = [];
  public InputTypeChildList: OptionList[] = [];
  private subs = new Subscription();
  FormIndicatorDto: FormIndicatorDTO = new FormIndicatorDTO();
  error = "";
  loading = false;
  parentSubmitted = false;
  childSubmitted = false;
  childSubmittedOption = false;
  SubmittedChild=false;
  public id: number = 0;
  public parentId: number = 0;
  public childId: number = 0;
  public subEditId: number = 0;
  public childOptionsId = 0;
  public subEditOptionsId = 0;
  public isParentIndicatorChildTypeDifferent: boolean = false
  public isSubIndicatorChildTypeDifferent: boolean = false
  public isEditChild:boolean = false;
  public parentIndicatorChildTypeSelected: string = null
  public subIndicatorChildTypeSelected: string = null
  public parentIndicatorChildType: string = null
  public subIndicatorChildType: string = null
  public parentIndicatorAttachmentListTemp: OptionList[] = []
  public subIndicatorAttachmentListTemp: OptionList[] = []
  public isEditOptions: boolean = false;
  temp: any[];
  forms: any;
  FormType: any[] = [];
  public isEdit: boolean = false;

  constructor(private formBuilder: FormBuilder, private readonly httpClient: HttpClient, private readonly toastr: ToastrService,
  private readonly router: Router, private readonly formindicatorservice: FormIndicatorService, private readonly activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.id = this.activatedRoute.snapshot.queryParams.id;
    this.Edit(this.id);

    this.FormIndicator = this.formBuilder.group({
      HavingSubIndicator: [null, Validators.required],
      InnerInputType: ["", Validators.required],
      InnerComments: [null, Validators.required],
      IndicatorName: ["", Validators.required],
      InputType: ["", Validators.required],
      Comments: [null, Validators.required],
      IndicatorCategory: ["", Validators.required],
      FormType: ["", Validators.required],
      SubIndicatorDependancy: ["", Validators.required],
      InnerIndicatorName: ["", Validators.required],
      InnerSubIndicatorDependancy: ["", Validators.required],
      Type: ["", Validators.required],
      InputLabel: ["", Validators.required],
      TypeComments: ["", Validators.required],
      Indicator: ["", Validators.required],
      ChildType: ["", Validators.required],
      ChildInputLabel: ["", Validators.required],
      ChildTypeComments: ["", Validators.required],
      ChildIndicator: ["", Validators.required],
      Required: ["", Validators.required],
      InnerRequired: ["", Validators.required],
    });

    this.subs.add(
      this.formindicatorservice.getForms(state).subscribe(
        (data) => {
  
          this.temp = [...data.result];

          this.FormType = data.result;

          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }

  Comments: YesNoDTO[] = [
  {value:true , text:"YES"},
  {value:false, text:"NO"} ]

  Indicator: YesNoDTO[] = [
  {value:true , text:"YES"},
  {value:false, text:"NO"} ]

  TypeCommentsOption: YesNoDTO[] = [
  {value:true , text:"YES"},
  {value:false, text:"NO"} ]

  InnerCommentsList: YesNoDTO[] = [
  {value:true , text:"YES"},
  {value:false, text:"NO"} ]

  HavingSubIndicator: YesNoDTO[] = [
  {value:true , text:"YES"},
  {value:false, text:"NO"} ]

  Required: YesNoDTO[] = [
    {value:true , text:"YES"},
    {value:false, text:"NO"} ]

  ParentType: string[] = [
    'Drop Down',
    'Multiple Selection',
    'Edit Text',
    'Image',
    'Date Time', ]
  EditTextOptions: string[] = [
    'Number',
    'Text',
    'CNIC',
    'Email',
    'Image',
    'Date']
  InnerInputType: string[] = [
    'Text Field',
    'Radio Button',
    'Check Box',]
  IndicatorCategory: string[] = [
    'Administrative',
    'Technical']

  public get realRows(): any {
    // return [{type: 'asasa'}]
    return this.AttachmentList.map(a => {
      return { Id: a.id, Comments: a.comments, IndicatorName: a.indicatorName, SubIndicatorDependancy: a.subIndicatorDependency, id: a.id, parentIndicatorId: a.parentIndicatorId }
    })
  }

  Add(parentId: number): void {

    if (this.isEditChild == true) {
      this.toastr.info("Please Save Edited Sub Indicator", "Edit Mode Enabled", { closeButton: true });
      return
    }
    this.childSubmitted = true;
    ;
    if (!this.FormIndicator.controls.InnerIndicatorName.value || !this.FormIndicator.controls.ChildType.value
      || !this.FormIndicator.controls.InnerComments.value ||  !this.FormIndicator.controls.InnerSubIndicatorDependancy.value
      || !this.FormIndicator.controls.InnerRequired.value ) {

        this.toastr.info("Please Provide All Fields", "Invalid", { closeButton: true });
        return;
    }
    if(this.InputTypeChildList.length==0){
      this.toastr.info("Please Add Input Type Details", "Invalid", { closeButton: true });
        return;
    }

    this.AttachmentList.push({

      inputType: this.FormIndicator.controls.ChildType.value,
      comments: this.FormIndicator.controls.InnerComments.value.value,
      indicatorName: this.FormIndicator.controls.InnerIndicatorName.value,
      isrequired:this.FormIndicator.controls.InnerRequired.value.value,
      subIndicatorDependency: this.FormIndicator.controls.InnerSubIndicatorDependancy.value,
      id: this.subEditId,
      parentIndicatorId: parentId,
      optionListToRemove: this.isSubIndicatorChildTypeDifferent ? this.subIndicatorAttachmentListTemp : [],
      optionList: this.InputTypeChildList.map(a => {

        return <OptionList>{
          id: a.id,
          label: a.label,
          forComments: a.forComments,
          forSubindicator: a.forSubindicator,
          parentIndicatorId: a.parentIndicatorId,
          inputType:a.inputType
        }
      })
    })
    this.AttachmentList = this.AttachmentList.map(a => {
      const temp: any = a
      temp.Comments = a.comments
      return temp;
    })
   
    this.FormIndicator.controls.InnerIndicatorName.setValue("");
    this.FormIndicator.controls.ChildType.setValue("");
    this.FormIndicator.controls.InnerComments.setValue("");
    this.FormIndicator.controls.InnerSubIndicatorDependancy.setValue("");
    this.FormIndicator.controls.InnerInputType.setValue("");
    this.FormIndicator.controls.ChildInputLabel.setValue("");
    this.FormIndicator.controls.ChildTypeComments.setValue("");
    this.FormIndicator.controls.ChildIndicator.setValue("");
    this.FormIndicator.controls.InnerRequired.setValue("");
    this.InputTypeChildList=[];

    this.childSubmitted = false;
    this.isEdit = false;
  }

  onSubmit() {

    this.parentSubmitted = true;
    this.loading = true;
    if (this.isEdit == true || this.isEditOptions == true ||this.isEditChild == true) {
      this.toastr.info("Please Save Edited Sub Indicator", "Edit Mode Enabled", { closeButton: true });
      return
    }
    if (this.FormIndicator.invalid) {
      if(this.InputTypeList.length==0){
        this.toastr.info("Please Provide Input Type Details", "Invalid", { closeButton: true });
        return
      }
      else{

        if (this.FormIndicator.controls.HavingSubIndicator.value == false) {
        }
        else {
          if (this.FormIndicator.controls.HavingSubIndicator.value == true && this.AttachmentList.length == 0) {
            this.toastr.info("Please Add Subindicator Detail", "Invalid", { closeButton: true });
            this.childSubmitted = true;
            return;
          } else if (this.FormIndicator.controls.HavingSubIndicator.value == true && this.AttachmentList.length != 0) {

          }
          else {
            this.toastr.info("Please Provide All Fields", "Invalid", { closeButton: true });
            return
          }
        }
    }
    } else {
          if (this.FormIndicator.valid && this.AttachmentList.length == 0 ) {
            this.toastr.info("Please Provide ", "Missing Data", { closeButton: true });
            return
          } else
            if (this.FormIndicator.valid && this.FormIndicator.controls.HavingSubIndicator.value == false) {
              this.AttachmentList = [];
            }
    }
    if (this.FormIndicator.controls.IndicatorName.value != '' && this.FormIndicator.controls.Comments.value != null && this.FormIndicator.controls.Required.value != null
      && this.FormIndicator.controls.IndicatorCategory.value != '' && this.FormIndicator.controls.FormType.value != '' && this.FormIndicator.controls.SubIndicatorDependancy.value != '') {
    } else if (this.FormIndicator.invalid) {
      this.toastr.info("Please Provide All Fields", "Invalid", { closeButton: true });
      return;
    }
    if(this.isSubIndicatorChildTypeDifferent==true){


    }

    this.FormIndicatorDto.id = this.id;
    this.FormIndicatorDto.indicatorName = this.FormIndicator.controls.IndicatorName.value;
    this.FormIndicatorDto.type = (this.FormIndicator.controls.Type.value.toLowerCase()).replace(/\s/g, "");
    this.FormIndicatorDto.subIndicatorDependency = this.FormIndicator.controls.SubIndicatorDependancy.value;
    this.FormIndicatorDto.indicatorCategory = this.FormIndicator.controls.IndicatorCategory.value;
    this.FormIndicatorDto.isrequired = this.FormIndicator.controls.Required.value;
    this.FormIndicatorDto.havingSubIndicator = this.FormIndicator.controls.HavingSubIndicator.value;
    this.FormIndicatorDto.comments = this.FormIndicator.controls.Comments.value;
    this.FormIndicatorDto.formId = this.FormIndicator.controls.FormType.value;
    this.FormIndicatorDto.optionListToRemove=this.isParentIndicatorChildTypeDifferent ? this.parentIndicatorAttachmentListTemp : []

    this.FormIndicatorDto.optionList = this.InputTypeList.map(a => {

      return <OptionList>{
        id: a.id,
        label: a.label,
        forComments: a.forComments,
        forSubindicator: a.forSubindicator,
        parentIndicatorId: a.parentIndicatorId,
        inputType:a.inputType,
      }
    } )

    this.FormIndicatorDto.subIndicatorListDTOs = this.AttachmentList.map(a => {

      if (this.FormIndicator.controls.HavingSubIndicator.value == true) {

        return <SubIndicatorListDTO>{
          id: a.id,
          comments: true,
          inputType: (a.inputType.toLowerCase()).replace(/\s/g, ""),
          optionList:a.optionList,
          subIndicatorDependency: a.subIndicatorDependency,
          isrequired:a.isrequired,
          indicatorName: a.indicatorName,
          parentIndicatorId: a.parentIndicatorId,
          optionListToRemove: this.isSubIndicatorChildTypeDifferent ? this.subIndicatorAttachmentListTemp : []
        }
      } else {

        return <SubIndicatorListDTO>{
          id: this.childId,
          comments: false,
          inputType: (a.inputType.toLowerCase()).replace(/\s/g, ""),
          optionList:a.optionList,
          subIndicatorDependency: a.subIndicatorDependency,
          isrequired:a.isrequired,
          indicatorName: a.indicatorName,
          parentIndicatorId: this.parentId,
          optionListToRemove: this.isSubIndicatorChildTypeDifferent ? this.subIndicatorAttachmentListTemp : []

        }
      }
    } )

    this.subs.add(
      this.formindicatorservice.AddFormsIndicator(this.FormIndicatorDto).subscribe(
        (data) => {

          // if(data.HttpErrorResponse.error.isException==true){
          //   this.toastr.error(data.HttpErrorResponse.error.messages, "Error", { closeButton: true });
          // }

          this.loading = false;
      
          if (this.FormIndicatorDto.id > 0) {
            this.toastr.success("Record Updated Sucessfully", "Updated", { closeButton: true });
          } else {
            this.toastr.success("Record Added Sucessfully", "Saved", { closeButton: true });
          }

          this.FormIndicator = this.formBuilder.group({

            HavingSubIndicator: "",
            InnerInputType: "",
            InnerComments: true,
            IndicatorName: "",
            InputType: "",
            Type: "",
            InputLabel: "",
            Comments: "",
            IndicatorCategory: "",
            FormType: "",
            SubIndicatorDependancy: "",
            InnerIndicatorName: "",
            InnerSubIndicatorDependancy: "",
            TypeComments: "",
            Indicator: "",
            ChildTypeComments: "",
            ChildIndicator: "",
            ChildInputLabel:"",
            ChildType:"",
            Required:"",
            InnerRequired:""
          });
          this.AttachmentList = [];
          this.InputTypeList = [];
          this.InputTypeChildList=[];
          this.router.navigate(['/formsindicatorlist']);
        },
        (error) => {
          this.error = error;
          this.loading = false;
        }
      )
    );

  }
  Edit(id: number) {
    this.parentId = id;
    this.subs.add(
      this.formindicatorservice.GetFormsIndicatorById(id).subscribe(
        (data) => {

          // this.router.navigate(['/account/login'])
          this.loading = false;
     

          this.FormIndicator.controls.IndicatorName.setValue(data.data.indicatorName);
          this.FormIndicator.controls.Comments.setValue(data.data.comments);
          this.FormIndicator.controls.IndicatorCategory.setValue(data.data.indicatorCategory);
          this.FormIndicator.controls.FormType.setValue(data.data.formId);
          this.FormIndicator.controls.SubIndicatorDependancy.setValue(data.data.subIndicatorDependency);
          //this.FormIndicator.controls.id.setValue(data.data.subIndicatorListDTOs.id);
          this.parentIndicatorChildType = data.data.type;
          this.parentIndicatorAttachmentListTemp = data.data.optionList

          if(data.data.type=='image'){
            this.FormIndicator.controls.Type.setValue("Image");
          }if(data.data.type=='dropdown'){
            this.FormIndicator.controls.Type.setValue("Drop Down");
          }if(data.data.type=='multipleselection'){
            this.FormIndicator.controls.Type.setValue("Multiple Selection");
          }if(data.data.type=='edittext'){
            this.FormIndicator.controls.Type.setValue("Edit Text");
          }if(data.data.type=='datetime'){
            this.FormIndicator.controls.Type.setValue("Date Time");
          }
          this.FormIndicator.controls.InputType.setValue(data.data.type);
          this.FormIndicator.controls.Required.setValue(data.data.isrequired);

          if (data.data.havingSubIndicator == true) {
            this.FormIndicator.controls.HavingSubIndicator.setValue(true);
            this.AttachmentList.push({
              inputType:  data.data.subIndicatorListDTOs.type,
              comments: data.data.subIndicatorListDTOs.comments,
              indicatorName: data.data.subIndicatorListDTOs.indicatorName,
              isrequired:data.data.subIndicatorListDTOs.isrequired,
              subIndicatorDependency: data.data.subIndicatorListDTOs.subIndicatorDependency,
               id: data.data.id, parentIndicatorId: data.data.parentIndicatorId,
               optionListToRemove: this.isSubIndicatorChildTypeDifferent ? this.subIndicatorAttachmentListTemp : [],
               optionList: this.InputTypeList.map(a => {

                return <OptionList>{
                  id: a.id,
                  label: a.label,
                  forComments: a.forComments,
                  forSubindicator: a.forSubindicator,
                  parentIndicatorId: a.parentIndicatorId
                }
              })
            })
            this.AttachmentList = data.data.subIndicatorListDTOs.map(a => {
              return {
                inputType: a.inputType, comments: a.comments,isrequired:a.isrequired, optionList:a.optionList,
                indicatorName: a.indicatorName, subIndicatorDependency: a.subIndicatorDependency, id: a.id, parentIndicatorId: a.parentIndicatorId
              };
            })

          } else {
            this.FormIndicator.controls.HavingSubIndicator.setValue(false);
          }
          //this.FormIndicator.controls.Type.setValue(data.data.type);
          this.FormIndicator.controls.FormType.setValue(data.data.formId);
          this.FormIndicatorDto.id = data.data.id;
          this.FormIndicatorDto.subIndicatorListDTOs = data.data.subIndicatorListDTOs;
          this.FormIndicatorDto.optionList = data.data.optionList;

          // this.InputTypeList.push({
          //   label: data.data.optionList.label, forComments: data.data.optionList.forComments, forSubindicator: data.data.optionList.forSubindicator, inputType: data.data.optionList.inputType, id: data.data.id, parentIndicatorId: data.data.parentIndicatorId
          // })
          this.InputTypeList = data.data.optionList.map(a => {
            return {
              forComments: a.forComments, label: a.label, inputType: a.inputType, forSubindicator: a.forSubindicator, id: a.id, parentIndicatorId: a.parentIndicatorId
            };
          })
        },
        (error) => {
          this.error = error;
          this.loading = false;
        }
      )
    );
  }

  subEdit(index) {

    if(this.isEdit==true){
      this.toastr.info("Please Save Edited Record First", "Edit Mode Enabled", { closeButton: true });
      return
    }
    //const index: number = index;
    this.childId = index;
    var currentObject = this.AttachmentList[index];
    this.subEditId = currentObject.id;
    this.subIndicatorChildType = currentObject.inputType;
    this.subIndicatorAttachmentListTemp = currentObject.optionList
    this.isEdit = true;
    
    this.FormIndicator.controls.InnerComments.setValue(this.InnerCommentsList.find(a => a.value === currentObject.comments));

    if (this.subEditId!=0){
      var obj = this.AttachmentList.find(x=> x.id==this.subEditId);
     
      if(obj.inputType=='image'){
        this.FormIndicator.controls.ChildType.setValue("Image");
      }if(obj.inputType=='dropdown'){
        this.FormIndicator.controls.ChildType.setValue("Drop Down");
      }if(obj.inputType=='multipleselection'){
        this.FormIndicator.controls.ChildType.setValue("Multiple Selection");
      }if(obj.inputType=='edittext'){
        this.FormIndicator.controls.ChildType.setValue("Edit Text");
      }if(obj.inputType=='datetime'){
        this.FormIndicator.controls.ChildType.setValue("Date Time");
      }
    }
    
    this.AttachmentList.splice(index, 1)

    this.FormIndicator.controls.InnerIndicatorName.setValue(currentObject.indicatorName);
    if(currentObject.inputType=='image'){
      this.FormIndicator.controls.ChildType.setValue("Image");
    }if(currentObject.inputType=='dropdown'){
      this.FormIndicator.controls.ChildType.setValue("Drop Down");
    }if(currentObject.inputType=='multipleselection'){
      this.FormIndicator.controls.ChildType.setValue("Multiple Selection");
    }if(currentObject.inputType=='edittext'){
      this.FormIndicator.controls.ChildType.setValue("Edit Text");
    }if(currentObject.inputType=='datetime'){
      this.FormIndicator.controls.ChildType.setValue("Date Time");
    }
    this.FormIndicator.controls.InnerSubIndicatorDependancy.setValue(currentObject.subIndicatorDependency);
    this.FormIndicator.controls.InnerRequired.setValue(this.Required.find(a => a.value === currentObject.isrequired));

       this.InputTypeChildList = currentObject.optionList.map(a => {
              return {
                label: a.label, forSubindicator: a.forSubindicator,forComments:a.forComments, inputType:a.inputType,id:a.id,
                parentIndicatorId:a.parentIndicatorId
                 };
            })

    // if(currentObject.optionList.length == 1){
    //   this.FormIndicator.controls.ChildInputLabel.setValue(currentObject.optionList[index].label);
    //   this.FormIndicator.controls.ChildTypeComments.setValue(currentObject.optionList[index].forComments);
    //   this.FormIndicator.controls.ChildIndicator.setValue(currentObject.optionList[index].forSubindicator);
    //   this.FormIndicator.controls.InnerInputType.setValue(currentObject.optionList[index].inputType);
    // }


  }

  subEditOptions(value) {

    if(this.isEditOptions==true){
      this.toastr.info("Please Save Edited Record First", "Edit Mode Enabled", { closeButton: true });
      return
    }
    const id: number = value;
    this.childOptionsId = id;
    var currentObject = this.InputTypeList[id];
    this.subEditOptionsId = currentObject.id;
    this.isEditOptions = true;

    this.InputTypeList.splice(id, 1)
 this.subs.add(this.formindicatorservice.DeleteFormsIndicator(this.subEditOptionsId).subscribe(
            (data) => {

              this.loading = false;
            
            }
          ))

    this.FormIndicator.controls.InputLabel.setValue(currentObject.label);
    this.FormIndicator.controls.Indicator.setValue(this.Indicator.find(a => a.value === currentObject.forSubindicator));
    this.FormIndicator.controls.TypeComments.setValue(this.TypeCommentsOption.find(a => a.value === currentObject.forComments));
    this.FormIndicator.controls.InputType.setValue(currentObject.inputType);
  }

  subEditChild(value) {

    if(this.isEditChild==true){
      this.toastr.info("Please Save Edited Record First", "Edit Mode Enabled", { closeButton: true });
      return
    }
    const id: number = value;
    //this.childOptionsId = id;
    var currentObjectChild = this.InputTypeChildList[id];
    //this.subEditOptionsId = currentObject.id;
    this.isEditChild = true;
    if(currentObjectChild.id !=0){

      //this.onDeleteChild(id)

      this.subs.add(this.formindicatorservice.DeleteFormsIndicatorOptions(id).subscribe(
        (data) => {

          this.loading = false;
           
        }
      ))
    }else{
      this.InputTypeChildList.splice(id, 1)
    }

    this.FormIndicator.controls.ChildInputLabel.setValue(currentObjectChild.label);
    this.FormIndicator.controls.ChildTypeComments.setValue(currentObjectChild.forComments);
    this.FormIndicator.controls.ChildIndicator.setValue(currentObjectChild.forSubindicator);
    this.FormIndicator.controls.InnerInputType.setValue(currentObjectChild.inputType);
  }

  onDelete(id: number) {

    var currentObject = this.AttachmentList[id];
    var subDeleteId = currentObject.id;
    if (subDeleteId != 0) {
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
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: false,
      }).then((result) => {
        if (result.value) {
          this.subs.add(this.formindicatorservice.DeleteFormsIndicator(subDeleteId).subscribe(
            (data) => {

              this.loading = false;
           
              swalWithBootstrapButtons.fire(
                'Deleted!',
                'Your Record has been deleted.',
                'success',
                this.AttachmentList.splice(id, 1)
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
    } else {
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
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: false,
      }).then((result) => {
        if (result.value) {
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your Record has been deleted.',
            'success',
            this.AttachmentList.splice(id, 1)
          )
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
    this.FormIndicator.controls.InnerIndicatorName.setValue("");
    this.FormIndicator.controls.InnerInputType.setValue("");
    this.FormIndicator.controls.InnerComments.setValue("");
    this.FormIndicator.controls.InnerSubIndicatorDependancy.setValue("");
  }

  onDeleteOptions(id: number) {

    var currentObject = this.InputTypeList[id];
    var subDeleteId = currentObject.id;
    if (subDeleteId != 0) {
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
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: false,
      }).then((result) => {
        if (result.value) {
          this.subs.add(this.formindicatorservice.DeleteFormsIndicatorOptions(subDeleteId).subscribe(
            (data) => {

              this.loading = false;
          
              swalWithBootstrapButtons.fire(
                'Deleted!',
                'Your Record has been deleted.',
                'success',
                this.InputTypeList.splice(id, 1)
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
    } else {
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
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: false,
      }).then((result) => {
        if (result.value) {
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your Record has been deleted.',
            'success',
            this.InputTypeList.splice(id, 1)
          )
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
    this.FormIndicator.controls.InputType.setValue("");
    this.FormIndicator.controls.InputTypeLabel.setValue("");
  }

  onDeleteChild(id: number) {

    var currentObjectChild = this.InputTypeChildList[id];
    var subDeleteId = currentObjectChild.id;
    if (subDeleteId != 0) {
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
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: false,
      }).then((result) => {
        if (result.value) {
          this.subs.add(this.formindicatorservice.DeleteFormsIndicatorOptions(subDeleteId).subscribe(
            (data) => {

              this.loading = false;
          
              swalWithBootstrapButtons.fire(
                'Deleted!',
                'Your Record has been deleted.',
                'success',
                this.InputTypeChildList.splice(id, 1)
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
    } else {
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
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: false,
      }).then((result) => {
        if (result.value) {
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your Record has been deleted.',
            'success',

            this.InputTypeChildList.splice(id, 1)
          )
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
    this.FormIndicator.controls.ChildInputLabel.setValue("");
    this.FormIndicator.controls.ChildTypeComments.setValue("");
    this.FormIndicator.controls.ChildIndicator.setValue("");
  }

  public get realRow(): any {
    // return [{type: 'asasa'}]
    return this.InputTypeList.map(a => {
      return { InputLabel: a.label, TypeComments: a.forComments, Indicator: a.forSubindicator, id: a.id, parentIndicatorId: a.parentIndicatorId }

    }
    )
  }

  AddInputType(parentId: number): void {

    this.childSubmittedOption = true;
    if (!this.FormIndicator.controls.InputLabel.value || !this.FormIndicator.controls.TypeComments.value ||
      !this.FormIndicator.controls.Indicator.value ||
      !this.FormIndicator.controls.InputType.value) {
        this.toastr.info("Please Provide All Fields", "Invalid", { closeButton: true });
        return;
    }
    //  else if (this.FormIndicator.invalid) {

    // }

    this.InputTypeList.push({
      label: this.FormIndicator.controls.InputLabel.value, forComments: this.FormIndicator.controls.TypeComments.value.value,
      inputType:this.FormIndicator.controls.InputType.value,forSubindicator: this.FormIndicator.controls.Indicator.value.value, id: 0, parentIndicatorId: parentId
    })
   
    this.FormIndicator.controls.InputLabel.setValue("");
    this.FormIndicator.controls.TypeComments.setValue("");
    this.FormIndicator.controls.Indicator.setValue("");
    this.FormIndicator.controls.InputType.setValue("");
    this.childSubmittedOption = false;
    this.isEditOptions = false
  }

  public get realRowChild(): any {
    // return [{type: 'asasa'}]
    return this.InputTypeChildList.map(a => {
      return { ChildInputLabel: a.label, ChildTypeComments: a.forComments, ChildIndicator: a.forSubindicator, id: a.id, parentIndicatorId: a.parentIndicatorId }
    }
    )
  }

  AddInputTypeChild(parentId: number): void {

    if (this.FormIndicator.controls.ChildInputLabel.value != '' && this.FormIndicator.controls.ChildTypeComments.value != null
    && this.FormIndicator.controls.ChildIndicator.value != null && this.FormIndicator.controls.InnerInputType.value != '' ) {
    }
    else if (this.FormIndicator.invalid) {
      this.toastr.info("Please Provide All Fields", "Invalid", { closeButton: true });
      return;
    }
    this.SubmittedChild = true;

    if(this.subEditId != 0){

      this.subs.add(
        this.formindicatorservice.GetFormsIndicatorById(this.subEditId).subscribe(
          (data) => {

          },
          (error) => {
            this.error = error;
            this.loading = false;
          }
        )
      );
    }
    this.InputTypeChildList.push({
      label: this.FormIndicator.controls.ChildInputLabel.value, forComments: this.FormIndicator.controls.ChildTypeComments.value,
      inputType:this.FormIndicator.controls.InnerInputType.value,forSubindicator: this.FormIndicator.controls.ChildIndicator.value, id: 0, parentIndicatorId: this.subEditId
    })

    this.FormIndicator.controls.ChildInputLabel.setValue("");
    this.FormIndicator.controls.ChildTypeComments.setValue("");
    this.FormIndicator.controls.ChildIndicator.setValue("");
    this.FormIndicator.controls.InnerInputType.setValue("");
    this.SubmittedChild = false;
    this.isEditChild = false
  }

  public onChildTypeChange(val): void {

 
    this.subIndicatorChildTypeSelected = val.toLowerCase().trim().replace(' ', '')

    if (this.subIndicatorChildType.toLowerCase() === this.subIndicatorChildTypeSelected) {
      this.isSubIndicatorChildTypeDifferent = false
      this.InputTypeChildList = this.subIndicatorAttachmentListTemp
      return
    } else {
      this.isSubIndicatorChildTypeDifferent = true
      this.InputTypeChildList = []
    }
  }

  public onParentTypeChange(val): void {

  
    this.parentIndicatorChildTypeSelected = val.toLowerCase().trim().replace(' ', '')

    if (this.parentIndicatorChildType.toLowerCase() === this.parentIndicatorChildTypeSelected) {
      this.isParentIndicatorChildTypeDifferent = false
      this.InputTypeList = this.parentIndicatorAttachmentListTemp
      return
    } else {
      this.isParentIndicatorChildTypeDifferent = true
      this.InputTypeList = []
    }
  }

}

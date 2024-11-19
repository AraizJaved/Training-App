import { Component, ComponentRef, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { IModalDialog, IModalDialogOptions, ModalDialogInstanceService, ModalDialogService } from 'ngx-modal-dialog';
import { CoreService } from 'src/app/Core/core.service';

@Component({
  selector: 'app-registration-compliance',
  templateUrl: './registration-compliance.component.html',
  styleUrls: ['./registration-compliance.component.scss']
})
export class RegistrationComplianceComponent implements OnInit, IModalDialog {

  district: string;
  formName:string
  formFilledDetails:any=[]
  formFilledDetailsDesignationWise:any=[]
  totalFormCount:number = 0
  constructor( private readonly coreService: CoreService   ) { }

  dialogInit: (reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<any>>) => {
  };



  ngOnInit(): void {


    this.district = this.coreService.districtName;
    this.formName=this.coreService.formName;
    this.formFilledDetailsDesignationWise=this.coreService.formFilledDetailsDesignationWise
    this.formFilledDetails=this.coreService.formFilledDetails

    for (var i = 0; i < this.formFilledDetails.formfilled.length; i++) {
      this.totalFormCount+= this.formFilledDetails.formfilled[i].total;
        }

  }


}

import { number, object } from '@amcharts/amcharts4/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { FolderService } from 'src/app/shared/services/FolderService/FolderService';
import { RegisterService } from 'src/app/shared/services/RegisterService/RegisterService';
import { FileDTO } from 'src/app/SharedFolder/FileDTO';
import { ToastrService } from 'ngx-toastr';
import { AddDocumentTypeComponent } from './add-document-type/add-document-type.component';


@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.scss']
})
export class AddDocumentComponent implements OnInit {



  public documentFrom: FormGroup;
  private subs = new Subscription();
  public Trainings: any[] = [];
  public DocumentTypes: any[] = [];
  public loading: boolean = false;

  public fileTypes = [{ Id: 1, Name: 'Single' }, { Id: 2, Name: 'Multiple' }]
  public selectedFiles?: FileList;
  public progressInfos: any[] = [];
  public message: string[] = [];
  public fileInfos?: Observable<any>;
  public title: string = ""
  FileDTO: FileDTO = new FileDTO();
  files: string[] = []
  public TrainingType: any[] = [];
  formData: FormData;
  @Input() selectedFolderId;
  @Input() TrainingId;


  constructor(private modalService: NgbModal, private fb: FormBuilder,
    private readonly registerService: RegisterService,
    private readonly folderService: FolderService,
    private readonly toastr: ToastrService) {
    this.documentFrom = this.fb.group({
      trainingId: [object, Validators.required],
      documentTitle: ["", Validators.required],
      documentType: ["", Validators.required],
      selectionType: ["", Validators.required]
    });
  }

  ngOnInit(): void {

    this.getTrainings()
    this.getDocumentType();
    this.documentFrom.value.fileId
    // this.fileInfos = this.uploadService.getFiles();
  }

  onFileSelect(event) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedFiles = file;
      this.FileDTO.FileAttachments = file;
    }
  }

  onFileChange(event) {
    debugger
    if (this.documentFrom.controls.selectionType.value == 1) {
      this.files = []
      this.selectedFiles = event.target.files[0];
      for (var i = 0; i < event.target.files.length; i++) {
        this.files.push(event.target.files[i]);
      }
    } else {
      this.selectedFiles = event.target.files[0];
      for (var i = 0; i < event.target.files.length; i++) {
        this.files.push(event.target.files[i]);
      }
    }

  }

  Upload() {

    debugger

    if (this.documentFrom.invalid) {
      this.toastr.info("Please Fill all Fields", "Invalid");
      return;
    } else if (this.files.length === 0) {
      this.toastr.info("Please upload file", "Invalid");
      return;
    }
    let data: any = this.Trainings.filter(x => x.id == this.documentFrom.controls.trainingId.value)[0];
    this.formData = new FormData()

    debugger
    for (var i = 0; i < this.files.length; i++) {
      this.formData.append("FileAttachments", this.files[i]);
    }
    this.formData.append('Name', this.documentFrom.controls.documentTitle.value)
    this.formData.append('Description', data.title)
    this.formData.append('TrainingId', data.id)
    this.formData.append('DocumentType', this.documentFrom.controls.documentType.value)
    if (this.selectedFolderId == null) {
      this.formData.append('Fk_Folder', '0')
    } else {
      this.formData.append('Fk_Folder', this.selectedFolderId)
    }






    this.subs.add(
      this.folderService._AddFile(this.formData).subscribe(
        (data: any) => {
          debugger
          this.toastr.success(data.messages, "Success", { closeButton: true });
          this.CloseModal();
        },
        (error) => {
        }
      )
    );

  }


  getTrainings() {

    this.loading = true
    this.subs.add(
      this.registerService.getTrainings().subscribe((data) => {


        this.Trainings = data.data;
        this.loading = false
        console.log('-----------------------------------', data)
        return data;
      },
        (error) => {
          alert(error.message);
        }
      )
    );
  }
  CloseModal() {
    this.modalService.dismissAll();
  }



  getDocumentType() {
    debugger

    this.subs.add(
      this.registerService.getDocumentType().subscribe((data) => {


        this.DocumentTypes = data.data;
        console.log('-----------------------------------', data)
        return data;
      },
        (error) => {
          alert(error.message);
        }
      )
    );
  }
  AddDocumentType() {


    const modalRef = this.modalService.open(AddDocumentTypeComponent, { size: 'lg' });

    modalRef.result.then((data) => {

      this.getDocumentType();
      //this.FilterEvent()

      //this.activeModal.close()
    }, (reason) => {
      // on dismiss
    });
  }

}

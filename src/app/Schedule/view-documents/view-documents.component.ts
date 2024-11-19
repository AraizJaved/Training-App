import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { FolderService } from 'src/app/shared/services/FolderService/FolderService';
import { RegisterService } from 'src/app/shared/services/RegisterService/RegisterService';


@Component({
  selector: 'app-view-documents',
  templateUrl: './view-documents.component.html',
  styleUrls: ['./view-documents.component.scss']
})
export class ViewDocumentsComponent implements OnInit {

  public title: string = '';
  public selectedFolderId = null
  public TrainingId = null
  public temp = [];
  public files = [];
  private subs = new Subscription();
  constructor(private modalService: NgbModal,
    private readonly folderService: FolderService,
    public registerService: RegisterService,
    
    private readonly toastr: ToastrService,) { }

  ngOnInit(): void {
    this.GetFiles();
  }


  onDownloadFile(attachment: any) {
    debugger


    let fileName = attachment.split('/')[2];
    this.registerService.DownloadFile(fileName).subscribe((data) => {
      debugger
      switch (data.type) {
        case HttpEventType.DownloadProgress:
          // this.downloadStatus.emit( {status: ProgressStatusEnum.IN_PROGRESS, percentage: Math.round((data.loaded / data.total) * 100)});
          break;
        case HttpEventType.Response:
          // this.downloadStatus.emit( {status: ProgressStatusEnum.COMPLETE});
          const downloadedFile = new Blob([data.body], { type: data.body.type });
          const a = document.createElement('a');
          a.setAttribute('style', 'display:none;');
          document.body.appendChild(a);
          a.download = 'data';
          a.href = URL.createObjectURL(downloadedFile);
          a.target = '_blank';
          a.click();
          document.body.removeChild(a);
          break;
      }
    },
      error => {
        // this.downloadStatus.emit( {status: ProgressStatusEnum.ERROR});
      }
    );


  }

  GetFiles() {
    debugger
    var id;
    if (this.selectedFolderId == null) {
      id = 0;
    }
    else {
      id = this.selectedFolderId
    }
    let _id = this.TrainingId
    this.subs.add(
      this.folderService.GetFiles(id, this.TrainingId).subscribe(
        (data) => {
          debugger

          this.temp = [...data.result];

          this.files = data.result;
          console.log('=====================================', this.files);

          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }
  CloseModal() {
    this.modalService.dismissAll();
  }

  onDeleteFile(id) {
    debugger

    this.subs.add(this.folderService.deleteFile(id).subscribe((data) => {
      this.toastr.success("File Deleted Successfully",'Success');  
      this.GetFiles();

      }
    ))
  }
}

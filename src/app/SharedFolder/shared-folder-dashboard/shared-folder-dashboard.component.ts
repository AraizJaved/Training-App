import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { FolderService } from 'src/app/shared/services/FolderService/FolderService';
import { AddFileFolderComponent } from '../add-file-folder/add-file-folder.component';
import { FolderDTO,ParentFolder } from '../FolderDto';
declare var require 
const Swal = require('sweetalert2')

@Component({
  selector: 'app-shared-folder-dashboard',
  templateUrl: './shared-folder-dashboard.component.html',
  styleUrls: ['./shared-folder-dashboard.component.scss']
})
export class SharedFolderDashboardComponent implements OnInit {
  FolderDTO: FolderDTO = new FolderDTO();
  ParentFolder: ParentFolder = new ParentFolder();
  private subs = new Subscription();
  error = "";
  loading = false;
  isSharedFolderManager=true;
  selectedFolderId=null
  TrainingId=null
  queryId=null
  AssignTo: any[] = [];
  public id: number = 0;
  breadCrums = [];
  showdeleteOption = false;

  temp: any[];
  rows = [];
  files=[]
  

  constructor(private readonly folderService:FolderService,private modalService: NgbModal,private readonly activatedRoute: ActivatedRoute) {
    this.queryId = this.activatedRoute.snapshot.queryParams.id
   }

  ngOnInit(): void {

    if(this.queryId !=null){
      this.getChildFolders(this.queryId)
      this.GetFiles()
    }
    else{
      this.GetFolders()
      this.GetFiles()
    }

    var a = JSON.parse(localStorage.getItem('currentUser')).userrole.filter(x=> x.name ==' SharedFolderManagement');
    if(a.length =='0' ){
      this.isSharedFolderManager=false
    }
    
  }

  AddFolder(){

    const modalRef = this.modalService.open(AddFileFolderComponent, { size: 'lg' })
    modalRef.componentInstance.selectedFolderId = this.selectedFolderId;
    modalRef.componentInstance.title = "Create Folder";

    modalRef.componentInstance.clickevent.subscribe(($e) => {
      debugger;
      if(this.selectedFolderId == null){
        this.GetFolders()

      }else{
      this.getChildFolders(this.selectedFolderId)

      }
    })
    
  }

  AddFile(){

    const modalRef = this.modalService.open(AddFileFolderComponent, { size: 'lg' })
    modalRef.componentInstance.selectedFolderId = this.selectedFolderId;
    modalRef.componentInstance.title = "Add File";
    modalRef.componentInstance.clickevent.subscribe(($e) => {
      debugger;

      if(this.selectedFolderId == null){
        this.GetFolders()

      }else{
      this.getChildFolders(this.selectedFolderId)

      }
    })
    
  }

  GetFolders(){

    this.subs.add(
      this.folderService.GetAllFolders().subscribe(
        (data) => {
          debugger

          this.temp = [...data.result];

          this.rows = data.result;
          this.GetFiles()
          this.breadCrums = [];
          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }

  getChildFolders(item){
    debugger
  this.selectedFolderId=item;
  if(this.rows.length >0){
    if(this.rows.find(x=> x.id == item)){
      this.breadCrums.push(this.rows.find(x=> x.id == item))
    }
   

  }

    this.subs.add(
      this.folderService.GetChildFolders(item).subscribe(
        (data) => {
          debugger

          this.temp = [...data.result];

          this.rows = data.result;
          this.GetFiles()
          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }

  crumClick(index){
     
    this.subs.add(
      this.folderService.GetChildFolders(this.breadCrums[index].id).subscribe(
        (data) => {
          debugger

          this.temp = [...data.result];

          this.rows = data.result;
          this.GetFiles()
          this.breadCrums.splice(index+1 , this.breadCrums.length)
          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }

  GetFiles(){
    debugger
    var id;
    if(this.selectedFolderId ==null){
      id=0;
    }
    else{
     id=this.selectedFolderId
    }
    this.subs.add(
      this.folderService.GetFiles(id,this.TrainingId).subscribe(
        (data) => {
          debugger

          this.temp = [...data.result];

          this.files = data.result;
          
          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }

  onDownloadFile(attachment:any){
    debugger
      
      setTimeout(()=>{
        //let attachmentName = "http://localhost:56990/"+attachment;
      let attachmentName = "https://dsr.pshealthpunjab.gov.pk/wwwroot/Uploads/"+attachment;
  
      const link = document.createElement('a');
      link.href = attachmentName;
      link.target="_blank";
      link.setAttribute('download', attachmentName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
     
  
      },100)
      
    } 
      deleteFolder(id){
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
    
            this.subs.add(this.folderService.deletefolder(id).subscribe(
              (data) => {
    
                swalWithBootstrapButtons.fire(
                  'Deleted!',
                  'Your Record has been deleted.',
                  'success',
                  this.GetFolders()
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



  onDeleteFile(id){
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
          debugger
          if (result.value) {
    
            this.subs.add(this.folderService.deleteFile(id).subscribe(
              (data) => {
    
                swalWithBootstrapButtons.fire(
                  'Deleted!',
                  'Your Record has been deleted.',
                  'success',
                  this.GetFiles()
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

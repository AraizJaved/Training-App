import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, throwError } from 'rxjs';
import { FolderService } from 'src/app/shared/services/FolderService/FolderService';
import { FolderDTO, ParentFolder } from '../FolderDto';
import { FileDTO } from '../FileDTO';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';


@Component({
  selector: 'app-add-file-folder',
  templateUrl: './add-file-folder.component.html',
  styleUrls: ['./add-file-folder.component.scss']
})
export class AddFileFolderComponent implements OnInit {


        myForm:FormGroup;
        disabled = false;
        ShowFilter = false;
        limitSelection = false;
        cities: any = [];
        selectedItems: any = [];
        dropdownSettings: any = {};
        loading = false;
      
        progress: number;


  RegisterForm: FormGroup;
  private subs = new Subscription();
  FolderDTO: FolderDTO = new FolderDTO();
  FileDTO: FileDTO = new FileDTO();
  ParentFolder: ParentFolder = new ParentFolder();
  formData: FormData;
  files :string[]=[]
  @Input() selectedFolderId;
  @Input() title;
  @Output() clickevent = new EventEmitter<string>();
  constructor(private formBuilder: FormBuilder,private activeModel : NgbActiveModal,
  private readonly folderService:FolderService,private readonly router: Router,
  private http: HttpClient) { }

  ngOnInit(): void {

    this.cities = [
      { item_id: 1, item_text: 'New Delhi' },
      { item_id: 2, item_text: 'Mumbai' },
      { item_id: 3, item_text: 'Bangalore' },
      { item_id: 4, item_text: 'Pune' },
      { item_id: 5, item_text: 'Chennai' },
      { item_id: 6, item_text: 'Navsari' }
  ];
  this.selectedItems = [{ item_id: 4, item_text: 'Pune' }, { item_id: 6, item_text: 'Navsari' }];
  this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: this.ShowFilter
  };
  this.myForm = this.formBuilder.group({
      city: [this.selectedItems]
  });
    
  this.RegisterForm = this.formBuilder.group({
    title: ["", Validators.required],
    description: ["", Validators.required],
    attachment: ["", Validators.required],

  });

  }

  Create(){

    debugger
    this.FolderDTO.Name=this.RegisterForm.controls.title.value;
    this.FolderDTO.Description=this.RegisterForm.controls.description.value;
    
    this.FolderDTO.countFiles=0;
    this.FolderDTO.countFolders=0;

    this.ParentFolder.Id = this.selectedFolderId;
    this.FolderDTO.ParentFolder = this.ParentFolder;
this.loading= true;
    this.subs.add(
      this.folderService.AddFolder(this.FolderDTO).subscribe(
        (data) => {
          debugger
this.loading= false; 
        this.clickevent.emit("teststring");

        this.activeModel.close();
        },
        (error) => {
 
        }
      )
    );

  }

  onFileSelect(event) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.FileDTO.FileAttachments = file;
    }
  }

  onFileChange(event)  {
    debugger
    for  (var i =  0; i <  event.target.files.length; i++)  {  
        this.files.push(event.target.files[i]);
    }
  }

  Upload(){

    this.formData = new FormData()

    debugger
     for  (var i =  0; i <  this.files.length; i++)  {  
      this.formData.append("FileAttachments",  this.files[i]);
  }
     this.formData.append('Name', this.RegisterForm.controls.title.value)
    this.formData.append('Description', this.RegisterForm.controls.description.value)
    if(this.selectedFolderId==null){
      this.formData.append('Fk_Folder', '0')
    }else{
      this.formData.append('Fk_Folder', this.selectedFolderId)
    }

this.loading= true;

    this.subs.add(
      this.folderService.AddFile(this.formData)
       .pipe(
        map((event: any) => {
          if (event.type == HttpEventType.UploadProgress) {
            this.progress = Math.round((100 / event.total) * event.loaded);
            if(this.progress==100){
              var contaxt = this;
              setTimeout(() => {
                debugger
                contaxt.activeModel.close();

              }, 2000);     
              // function fun(){
              //   debugger
              //   contaxt.activeModel.close();
              // }  

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
      ).subscribe(
        
        (data) => {
         
          debugger
this.loading= false; 
          this.clickevent.emit("teststring");
         

        },
        (error) => {
         
        }
      )
    );

  }



  onItemSelect(item: any) {
    console.log('onItemSelect', item);
}
onSelectAll(items: any) {
    console.log('onSelectAll', items);
}
toogleShowFilter() {
    this.ShowFilter = !this.ShowFilter;
    this.dropdownSettings = Object.assign({}, this.dropdownSettings, { allowSearchFilter: this.ShowFilter });
}

handleLimitSelection() {
    if (this.limitSelection) {
        this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: 2 });
    } else {
        this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: null });
    }
}


}

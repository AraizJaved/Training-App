import { state } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { FormIndicatorService } from 'src/app/shared/services/FormIndicatorService/FormIndicatorService';
import { TypeDTO } from '../FormIndicatorDTO';
declare var require
const Swal = require('sweetalert2')

@Component({
  selector: 'app-forms-indicator-list',
  templateUrl: './forms-indicator-list.component.html',
  styleUrls: ['./forms-indicator-list.component.scss']
})
export class FormsIndicatorListComponent implements OnInit {
  private subs = new Subscription();
  error: any;
  @Input() rows = [];

  userData = [];
  temp = [];
  rawEvent: any;
  FormType: TypeDTO[] = [];
  selectedType: any = -1;
  IndicatorCategory: string[] = [
    'Administrative',
    'Technical']
  // @Output()
  // public editOutput: EventEmitter<number> = new EventEmitter<number>()

  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  ColumnMode = ColumnMode;
  loading: boolean;
  constructor(private readonly httpClient: HttpClient, private readonly router: Router,
    private readonly formindicatorservice: FormIndicatorService, private readonly toastr: ToastrService) {

    this.subs.add(
      this.formindicatorservice.getData(state).subscribe(
        (data) => {
       
          this.temp = [...data.result];

          this.rows = data.result;

          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );


  }

  ngOnInit(): void {
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

  onEdit(value) {

    const id: number = value;
    // this.editOutput.emit(id)
    this.router.navigate(['/formsindicator'], { queryParams: { id } })

  }

  FormTypeChange(id: number) {


    let value=(<HTMLSelectElement>document.getElementById('FormCategory')).value;

    this.subs.add(
      this.formindicatorservice.GetFormsTypeById(id , value).subscribe(
        (data) => {
         

          this.temp = [...data.formsIndicatorList];

          this.rows = data.formsIndicatorList;

          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );

  }

  FormCategoryChange(value: any) {


    let id=(<HTMLSelectElement>document.getElementById('FormType')).selectedIndex;
    if(value==0){
      var category ="All"
    }
    if(value==1){
      var category ="Administrative"
    }
    if(value==2){
      var category ="Technical"
    }

    this.subs.add(
      this.formindicatorservice.GetFormsTypeById(id , category).subscribe(
        (data) => {
       

          this.temp = [...data.formsIndicatorList];

          this.rows = data.formsIndicatorList;

          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );

  }

  onDelete(id: number) {


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

        this.subs.add(this.formindicatorservice.DeleteFormsIndicator(id).subscribe(
          (data) => {

            this.loading = false;
        
            swalWithBootstrapButtons.fire(
              'Deleted!',
              'Your Record has been deleted.',
              'success',
              this.subs.add(this.formindicatorservice.getData(state).subscribe(

                (data) => {
                 
                  this.temp = [...data.result];

                  this.rows = data.result;
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

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    ;
    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    ;
    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }




  public onSelect(e): void {
   
  }
  onActivate(event) {
    ;
    if (event.type == "click") {
      
    }
  }
}

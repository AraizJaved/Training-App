import { Component, Input, OnInit } from '@angular/core';

import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaginationInstance } from 'ngx-pagination';
import { ExcelExportService } from '../shared/services/excel-export.service';
@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.scss']
})
export class TrainingsComponent implements OnInit {

  constructor(private modalService: NgbModal,private _excelExport: ExcelExportService) { }
  @Input() EventObj:any
  @Input() id:any
  @Input() title:any
  
  searchText: string;
  public config: PaginationInstance = {
    id: 'advanced',
    itemsPerPage: 10,
    currentPage: 1
  };
  // public title:string=""

  ngOnInit(): void {
    console.log(this.EventObj)
  }




  exportToExcel(exportData:any,fileName:string) {
    this._excelExport.exportAsExcel({
      table: null,
      fileName: fileName,
      sheetName: 'Sheet 1',
      data: exportData,
    })
  }


  onPageChange(number: number) {

    this.config.currentPage = number;
  }

  onPageBoundsCorrection(number: number) {

    this.config.currentPage = number;
  }

  CloseModal() {
    this.modalService.dismissAll();
  }
}

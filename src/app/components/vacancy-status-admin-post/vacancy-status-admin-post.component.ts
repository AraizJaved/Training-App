import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AdminWingChartsComponent } from 'src/app/AdminWing/admin-wing-charts/admin-wing-charts.component';
import { ParameterDTO } from 'src/app/AdminWing/ParameterDTO';
import { AdminWingService } from 'src/app/shared/services/AdminWingService/AdminWingService';
import * as XLSX from 'xlsx';

@Component({
    selector: 'app-vacancy-status-admin-post',
    templateUrl: './vacancy-status-admin-post.component.html',
    styleUrls: ['./vacancy-status-admin-post.component.scss']
})
export class VacancyStatusAdminPostComponent implements OnInit {

    public obj: { id: number, title: string } = {
        id: 0,
        title: ''
    }

    public DGKhan: any = false
    private subs = new Subscription();
    vpList = [];
    parameterDTO: ParameterDTO = new ParameterDTO();
    public searchString: string;
    public loading = false;
    fileName = '.xlsx';

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly adminWingService: AdminWingService, private fb: FormBuilder,
        private modalService: NgbModal
    ) {
        this.obj.id = this.activatedRoute.snapshot.queryParams.id
        this.obj.title = this.activatedRoute.snapshot.queryParams.title
        this.DGKhan = this.activatedRoute.snapshot.queryParams.dgKhan

    }

    ngOnInit(): void {
        this.getVP()
    }

    getVP() {

        this.loading = true;
        debugger

        if (this.DGKhan === "true") {

            this.subs.add(
                this.adminWingService.getVP(this.obj.id).subscribe(
                    (data) => {
                        debugger
                        console.log({ data })
                        this.loading = false;
                        this.vpList = data.data ?? [];

                        this.vpList = this.vpList.filter(x => x.districtName == 'Dera Ghazi Khan')

                        console.log("VP List", this.vpList)
                        return this.vpList;
                    },
                    (error) => {
                        alert(error);
                    }
                )
            );
        }
        else {
            this.subs.add(
                this.adminWingService.getVP(this.obj.id).subscribe(
                    (data) => {
                        debugger
                        console.log({ data })
                        this.loading = false;
                        this.vpList = data.data ?? [];
                        console.log("VP List", this.vpList)
                        return this.vpList;
                    },
                    (error) => {
                        alert(error);
                    }
                )
            );
        }


    }

    exportexcel(): void {
        this.fileName = this.obj.title + ' List.xlsx'
        /* table id is passed over here */
        let element = document.getElementById('reportTable');
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

        /* generate workbook and add the worksheet */
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        /* save to file */
        XLSX.writeFile(wb, this.fileName);

    }
    ViewChart(){

        const modalRef =  this.modalService.open(AdminWingChartsComponent, { size: 'lg' });
      
        modalRef.componentInstance.vpList =  this.vpList;
        
      }
}

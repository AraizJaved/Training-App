import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminWingService } from '../../shared/services/AdminWingService/AdminWingService';
import { ParameterDTO } from '../ParameterDTO';
import * as XLSX from 'XLSX'

@Component({
    selector: 'app-admin-wing-employees-leave-details',
    templateUrl: './admin-wing-employees-leave-details.component.html',
    styleUrls: ['./admin-wing-employees-leave-details.component.scss']
})
export class AdminWingEmployeesLeaveDetailsComponent implements OnInit {
    public obj: { id: string } = {
        id: '',
    }

    private subs = new Subscription();
    employees = [];
    parameterDTO: ParameterDTO = new ParameterDTO();
    public searchString: string;
    public loading = false;
    fileName = '.xlsx';

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly adminWingService: AdminWingService, private fb: FormBuilder
    ) {
        this.obj.id = this.activatedRoute.snapshot.queryParams.id
    }

    ngOnInit(): void {
        // this.getEmployeesOnLeaveSum()
    }

    getEmployeesOnLeaveSum() {
        this.loading = true;
        debugger
        this.subs.add(
            this.adminWingService.getEmployeesOnLeaveSum().subscribe(
                (data) => {
                    debugger
                    console.log({ data })
                    this.loading = false;
                    this.employees = data.data ?? [];
                    console.log("employees List", this.employees)
                    return this.employees;
                },
                (error) => {
                    alert(error);
                }
            )
        );

    }

    exportexcel(): void {
        this.fileName = 'Employee Details List.xlsx'
        /* table id is passed over here */
        let element = document.getElementById('reportTable');
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

        /* generate workbook and add the worksheet */
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        /* save to file */
        XLSX.writeFile(wb, this.fileName);

    }

}

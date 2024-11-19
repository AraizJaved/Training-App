import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-main-card-child',
    templateUrl: './main-card-child.component.html',
    styleUrls: ['./main-card-child.component.scss']
})
export class MainCardChildComponent implements OnInit {

    public adminWingData
    public title: string
    public isDgKhan: boolean = false

    public posts: { id: number, title: string, image: string, width: number, height: number }[] = [
        {
            id: 325,
            title: 'Chief Executive Officer Health',
            image: 'assets/images/main-dashboard/CEO_health.png',
            width: 100,
            height: 130
        },
        {
            id: 8121,
            title: 'Medical Superintendent DHQ',
            image: 'assets/images/main-dashboard/health_supretendent.png',
            width: 100,
            height: 130
        },
        {
            id: 8122,
            title: 'Medical Superintendent THQ',
            image: 'assets/images/main-dashboard/health_supretendent.png',
            width: 100,
            height: 130
        },
        {
            id: 486,
            title: 'District Officer Health (MS)',
            image: 'assets/images/main-dashboard/district_officer_health_ms.png',
            width: 100,
            height: 130
        },
        {
            id: 488,
            title: 'District Officer Health (MIS & HRM)',
            image: 'assets/images/main-dashboard/district_officer_health_MIS.png',
            width: 100,
            height: 110
        },
        {
            id: 489,
            title: 'District Officer Health (Preventive)',
            image: 'assets/images/main-dashboard/District_Officer_Health_preventive.png',
            width: 100,
            height: 110
        },
        {
            id: 446,
            title: 'Deputy District Officer Health',
            image: 'assets/images/main-dashboard/deputy_district_officer_health.png',
            width: 100,
            height: 130
        }
    ]

    public tbPosts: { id: number, title: string, type: string, image: string, width: number, height: number }[] = [
        {
            id: 13994,
            title: 'Vacancy Status',
            type: 'TB',
            image: 'assets/images/main-dashboard/vacancy_status.png',
            width: 100,
            height: 130
        },
        {
            id: 0,
            title: 'Procurement',
            type: 'ProcurementTB',
            image: 'assets/images/main-dashboard/procurement.png',
            width: 120,
            height: 120
        },
        {
            id: 0,
            title: 'Recruitment',
            type: 'RecruitmentTB',
            image: 'assets/images/main-dashboard/Group.png',
            width: 120,
            height: 120
        }

    ]

    public irmnchPosts: { id: number, title: string, type: string, image: string, width: number, height: number }[] = [
        {
            id: 14683,
            title: 'Vacancy Status',
            type: 'IRMNCH',
            image: 'assets/images/main-dashboard/vacancy_status.png',
            width: 100,
            height: 130
        },
        {
            id: 0,
            title: 'Patients',
            type: 'IRMNCHPatients',
            image: 'assets/images/main-dashboard/patients.png',
            width: 120,
            height: 130
        },
        {
            id: 0,
            title: 'Lady Health Supervisor',
            type: 'IRMNCHLHS',
            image: 'assets/images/main-dashboard/lady_health_supervisor.png',
            width: 100,
            height: 130
        },
        {
            id: 0,
            title: 'EMR Daily Situation Report',
            type: 'IRMNCHDSR',
            image: 'assets/images/main-dashboard/daily_situation_report.png',
            width: 120,
            height: 130
        },
        {
            id: 0,
            title: 'Procurement',
            type: 'ProcurementIRMNCH',
            image: 'assets/images/main-dashboard/procurement.png',
            width: 120,
            height: 120
        },
        {
            id: 0,
            title: 'Recruitment',
            type: 'RecruitmentIRMNCH',
            image: 'assets/images/main-dashboard/Group.png',
            width: 120,
            height: 120
        },

    ]

    public ncdPosts: { id: number, title: string, type: string, image: string, width: number, height: number }[] = [
        {
            id: 13995,
            title: 'Vacancy Status',
            type: 'NCD',
            image: 'assets/images/main-dashboard/vacancy_status.png',
            width: 100,
            height: 130
        },
        {
            id: 0,
            title: 'NCD Clinic',
            type: 'NCDClinic',
            image: 'assets/images/main-dashboard/ncd_clinic.png',
            width: 120,
            height: 130
        },
        {
            id: 0,
            title: 'NCD Desk',
            type: 'NCDDesk',
            image: 'assets/images/main-dashboard/NCD_desk.png',
            width: 100,
            height: 130
        },
        {
            id: 0,
            title: 'Procurement',
            type: 'ProcurementNCD',
            image: 'assets/images/main-dashboard/procurement.png',
            width: 120,
            height: 120
        },
        {
            id: 0,
            title: 'Recruitment',
            type: 'RecruitmentNCD',
            image: 'assets/images/main-dashboard/Group.png',
            width: 120,
            height: 120
        },

    ]

    public aidsPosts: { id: number, title: string, type: string, image: string, width: number, height: number }[] = [
        {
            id: 14680,
            title: 'Vacancy Status',
            type: 'PACP',
            image: 'assets/images/main-dashboard/vacancy_status.png',
            width: 100,
            height: 130
        },
        {
            id: 0,
            title: 'AIDS EMR',
            type: 'PACPDailyPatients',
            image: 'assets/images/main-dashboard/aids_patient_daily.png',
            width: 100,
            height: 130
        },
        {
            id: 0,
            title: 'AIDS Lab Status',
            type: 'PACPDailyLabs',
            image: 'assets/images/main-dashboard/aids_lab_daily.png',
            width: 100,
            height: 130
        },
        {
            id: 0,
            title: 'Procurement',
            type: 'ProcurementAIDS',
            image: 'assets/images/main-dashboard/procurement.png',
            width: 120,
            height: 120
        },
        {
            id: 0,
            title: 'Recruitment',
            type: 'RecruitmentAIDS',
            image: 'assets/images/main-dashboard/Group.png',
            width: 120,
            height: 120
        },

    ]

    public hepatitisPosts: { id: number, title: string, type: string, image: string, width: number, height: number }[] = [
        {
            id: 13996,
            title: 'Vacancy Status',
            type: 'HCP',
            image: 'assets/images/main-dashboard/vacancy_status.png',
            width: 100,
            height: 130
        },
        {
            id: 0,
            title: 'EMR',
            type: 'HCPLessThan24Hours',
            image: 'assets/images/main-dashboard/Patient_record.png',
            width: 120,
            height: 120
        },
        {
            id: 0,
            title: 'Procurement',
            type: 'ProcurementHP',
            image: 'assets/images/main-dashboard/procurement.png',
            width: 120,
            height: 120
        },
        {
            id: 0,
            title: 'Recruitment',
            type: 'RecruitmentHP',
            image: 'assets/images/main-dashboard/Group.png',
            width: 120,
            height: 120
        }

    ]

    public procurementsPosts: { title: string, image: string, width: number, height: number }[] = [
        {
            title: 'Units / Vertical Programs',
            image: 'assets/images/main-dashboard/vertical_program.png',
            width: 120,
            height: 130,
        },
        {
            title: 'Districts Procurement',
            image: 'assets/images/main-dashboard/procurement.png',
            width: 120,
            height: 130,
        },
        // {
        //     title: 'Out Sourcing Procurements',
        //     image: 'assets/images/main-dashboard/awaiting_posting.png',
        //     width: 120,
        //     height: 130
        // },
    ]

    public innerVerticalPrograms: { title: string, image: string, width: number, height: number }[] = [

        {
            title: 'Hepatitis Control Program',
            image: 'assets/images/dashboard-main-cards-transparent/hepatitis.png',
            width: 100,
            height: 130
        },
        {
            title: 'Punjab AIDS Control Program',
            image: 'assets/images/dashboard-main-cards-transparent/aids.png',
            width: 100,
            height: 130
        },
        {
            title: 'Prevention and Control of Non Communicable Diseases',
            image: 'assets/images/dashboard-main-cards-transparent/NCD.png',
            width: 100,
            height: 110
        },
        {
            title: 'IRMNCH',
            image: 'assets/images/dashboard-main-cards-transparent/IRMNCH.png',
            width: 100,
            height: 130
        },
        {
            title: 'EPI',
            image: 'assets/images/main-dashboard/patients.png',
            width: 130,
            height: 130
        },
        {
            title: 'TB Control Program',
            image: 'assets/images/dashboard-main-cards-transparent/tb.png',
            width: 100,
            height: 130
        },
    ]

    constructor(
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute
    ) {
        debugger
        this.title = this.activatedRoute.snapshot.queryParams.from

        if (this.activatedRoute.snapshot.queryParams.from == 'DG Khan') {
            this.isDgKhan = true
        }
    }

    ngOnInit(): void {
        debugger
        console.log("History State", history.state);
        this.adminWingData = history.state.adminWingData
    }

    public cb(): void {
        if (this.title === 'IRMNCH') {
            this.adminWingData = history.state.adminWingData
            this.title = this.activatedRoute.snapshot.queryParams.from
            return
        } else if (this.title === 'Prevention and Control of Non Communicable Diseases') {
            this.adminWingData = history.state.adminWingData
            this.title = this.activatedRoute.snapshot.queryParams.from
            return
        } else if (this.title === 'Punjab AIDS Control Program') {
            this.adminWingData = history.state.adminWingData
            this.title = this.activatedRoute.snapshot.queryParams.from
        } else if (this.title === 'Hepatitis Control Program') {
            this.adminWingData = history.state.adminWingData
            this.title = this.activatedRoute.snapshot.queryParams.from
        } else if (this.title === 'TB Control Program') {
            this.adminWingData = history.state.adminWingData
            this.title = this.activatedRoute.snapshot.queryParams.from
        } else if (this.title === 'Procurements') {
            this.adminWingData = history.state.adminWingData
            this.title = this.activatedRoute.snapshot.queryParams.from
        }

        this.adminWingData = history.state.adminWingData
        this.title = this.activatedRoute.snapshot.queryParams.from
    }

    public onTabsOpen(obj): void {
        debugger
        if (obj.id || obj.id === 0) {
            if (obj.title === 'Vacancy Status') {
                this.router.navigate(['admin-wing-vacancy-status'], {
                    queryParams: {
                        id: obj.id,
                        title: obj.title
                    }
                })
                return
            }
            if (obj.id === 0) {

                this.router.navigate(['vertical-program-generic'], {
                    queryParams: {
                        type: obj.type,
                        dgKhan: this.isDgKhan
                    }
                })
                return

            }
            this.router.navigate(['vacancy-status-adminstrative-post-list'], {
                queryParams: {
                    id: obj.id,
                    title: obj.title,
                    dgKhan: this.isDgKhan
                }
            })
            return
        }
        // admin-wing-vacant-report
        if (obj.title) {
            switch (obj.title) {
                case 'PUC Pendency Status':
                    this.router.navigate(['/puc-pendency-status'])
                    break
                case 'Vacancy Status of (P&SHD)':
                    this.router.navigate(['/admin-dept-vacancy-status'], {
                        queryParams: {
                            id: 11606,
                            title: obj.title
                        }
                    })
                    break
                case 'Vacancy Status of Admn Wing':
                    this.router.navigate(['/admin-wing-vacancy-status'], {
                        queryParams: {
                            id: 15229,
                            title: obj.title
                        }
                    })
                    break
                case 'Provincial Vacancy Position':
                    this.router.navigate(['admin-wing-vacant-report'])
                    break
                case 'Employees On Leave':
                    this.router.navigate(['admin-wing-employees-leave'])
                    break
                case 'Awaiting Posting':
                    this.router.navigate(['admin-wing-awaiting-posting'])
                    break
                case 'Leaves Expired':
                    this.router.navigate(['leaves-expired'])
                    break
                case 'Units / Vertical Programs':
                    this.router.navigate(['development-wing-generic'], {
                        queryParams: {
                            type: 'DWUnits'
                        }
                    })
                    break
                case 'Districts Procurement':
                    this.router.navigate(['development-wing-generic'], {
                        queryParams: {
                            type: 'DWDistrictsProcurement'
                        }
                    })
                    break
                case 'Out Sourcing Procurements':
                    this.router.navigate(['development-wing-generic'], {
                        queryParams: {
                            type: 'OutSourcingProcurements'
                        }
                    })
                    break
                case 'Health Council':
                    this.router.navigate(['development-wing-generic'], {
                        queryParams: {
                            type: 'HealthCouncil'
                        }
                    })
                    break
                case 'DWADPScheme':
                    break;
                case 'DTL':
                    this.router.navigate(['drugControlCounts'], {
                        queryParams: {
                            type: 'DTL'
                        }
                    })
                    break
                case 'ADP Scheme':
                    this.router.navigate(['adpSchemes'], {
                        queryParams: {
                            type: 'ADP Scheme'
                        }
                    })
                    break
                case 'Medicine Trace & Track':
                    this.router.navigate(['medicineTraceandTrack'], {
                        queryParams: {
                            type: 'Medicine Trace & Track'
                        }
                    })
                    break
                case 'Vacancy Status Development':
                    this.router.navigate(['vacancyStatusdevelopment'], {
                        queryParams: {
                            id: 15273,
                            title: obj.title,
                            type: 'Vacancy Status Development'
                        }
                    })
                    break
                case 'Vacancy Status Drug Control':
                    this.router.navigate(['vacancyStatusDrugControl'], {
                        queryParams: {
                            id: 15274,
                            title: obj.title,
                            type: 'Vacancy Status Drug Control'
                        }
                    })
                    break
                case 'ProcurementHP':
                    this.router.navigate(['hepatitisProcurement'], {
                        queryParams: {
                            type: 'ProcurementHP'
                        }
                    })
                    break
                case 'ProcurementAIDS':
                    this.router.navigate(['aidsProcurement'], {
                        queryParams: {
                            type: 'ProcurementAIDS'
                        }
                    })
                    break
                case 'ProcurementNCD':
                    this.router.navigate(['ncdProcurement'], {
                        queryParams: {
                            type: 'ProcurementNCD'
                        }
                    })
                    break
                case 'ProcurementIRMNCH':
                    this.router.navigate(['irmnchProcurement'], {
                        queryParams: {
                            type: 'ProcurementIRMNCH'
                        }
                    })
                    break
                case 'ProcurementTB':
                    this.router.navigate(['tbProcurement'], {
                        queryParams: {
                            type: 'ProcurementTB'
                        }
                    })
                    break
                case 'CDSL':
                    this.router.navigate(['cdslData'], {
                        queryParams: {
                            type: 'CDSL'
                        }
                    })
                    break
                case ' Procurement':
                    this.router.navigate(['drugControlProcurement'], {
                        queryParams: {
                            type: ' Procurement'
                        }
                    })
                    break

            }


            if (obj.title === 'Vacancy Position of Administrative Post') {
                this.adminWingData = this.posts
                this.title = 'Vacancy Position of Administrative Post'
                return
            }

            if (obj.title === 'Procurements') {
                this.adminWingData = this.procurementsPosts
                this.title = 'Procurements'
            }

            if (obj.title === 'TB Control Program') {
                this.adminWingData = this.tbPosts
                this.title = 'TB Control Program'
            }

            if (obj.title === ' Vertical Programs') {
                this.isDgKhan = true;
                this.adminWingData = this.innerVerticalPrograms
                this.title = ' Vertical Programs'
            }

            if (obj.title === 'Hepatitis Control Program') {
                this.adminWingData = this.hepatitisPosts
                this.title = 'Hepatitis Control Program'
            }

            if (obj.title === 'Punjab AIDS Control Program') {
                this.adminWingData = this.aidsPosts
                this.title = 'Punjab AIDS Control Program'
            }

            if (obj.title === 'Prevention and Control of Non Communicable Diseases') {
                this.adminWingData = this.ncdPosts
                this.title = 'Prevention and Control of Non Communicable Diseases'
            }

            if (obj.title === 'IRMNCH') {
                this.adminWingData = this.irmnchPosts
                this.title = 'IRMNCH'
            }
        }
    }

}

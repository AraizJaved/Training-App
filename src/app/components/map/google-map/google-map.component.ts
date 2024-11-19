import { Component, OnInit, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { MapService } from "src/app/shared/services/MapService/MapService";
import { ToastrService } from "ngx-toastr";
import { FormIndicatorService } from "src/app/shared/services/FormIndicatorService/FormIndicatorService";
import { DataGridService } from "../../../shared/services/common/data-grid.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CoreService } from "src/app/Core/core.service";
import { RegisterService } from "src/app/shared/services/RegisterService/RegisterService";
import { state } from "@angular/animations";
import { DashboardService } from "src/app/shared/services/DashboardService/DashboardService";
import { AgmMap } from "@agm/core";

declare var google: any;

@Component({
  selector: "app-google-map",
  templateUrl: "./google-map.component.html",
  styleUrls: ["./google-map.component.scss"],
})
export class GoogleMapComponent implements OnInit {
  private subs = new Subscription();
  public isLoading: boolean;
  searchForm: FormGroup;
  Division: any[] = [];
  District: any[] = [];
  Details: any[] = [];
  Tehsil: any[] = [];
  Code = "";
  UC: any[] = [];
  public zoomLevel = 8;

  Compaign: any[] = []

  @ViewChild(AgmMap)

  public map: AgmMap

  //Map2
  public lat_m2: number = 31.1704;
  public lng_m2: number = 72.7097;
  public zoom_m2: number = 7;
  public days: number[] = []
  public selectedDay = 0
  Day: number[] = [
    1, 2, 3, 4, 5]

  error: any;
  userData = [];
  temp = [];
  rawEvent: any;
  FormType: any[] = [];
  DistrictType: any[] = [];
  IndicatorCategory: string[] = [
    'Administrative',
    'Technical',
  ]

  public markers: marker[] = [];

  public formType: string = "";
  public districtType: string = "";
  public FormCategory: string = "";
  public status: string;
  public teamNo: string;
  public DistrictName: string;
  public answer: string;
  public IndicatorName: string;
  public FormName: string;
  public divisionName: string;
  public districtName: string;
  public tehsilName: string;
  public ucNumber: string;
  public dayofwork: string;
  public Location: string;
  public FormId: number;
  public Id: number;
  public polygonPaths: Array<LatLngLiteral>
  public mapFilterDto: MapFilterDTO = new MapFilterDTO()
  public populationTypes: string[] = ['HRMP', 'Non-HRMP']
  public modules: string[] = ['FixedSite', 'Transit', 'ReasonFor', 'Polygon']
  public reasons: { name: string, id: string }[] = [
    {
      name: 'Team Missed The House',
      id: '1'
    },
    {
      name: 'TVBMC',
      id: '2',
    },
    {
      name: 'NA',
      id: '3'
    },
    {
      name: 'Refusals',
      id: '4'
    },
    {
      name: 'Others',
      id: '5'
    },
  ]
  public polyGon: { name: string, id: string }[] = [
    {
      name: 'All Clusters',
      id: '1'
    },
    {
      name: 'MissedArea',
      id: '2',
    },
    {
      name: 'Poorly Covered Area',
      id: '3'
    }
  ]

  constructor(
    private readonly httpClient: HttpClient,
    private readonly coreService: CoreService,
    private readonly registerService: RegisterService,
    private fb: FormBuilder,
    private readonly router: Router,
    private readonly dashboardService: DashboardService,
    private readonly MapService: MapService,
    private readonly formindicatorservice: FormIndicatorService,
    private readonly toastr: ToastrService,
    public readonly dataGridService: DataGridService
  ) {
    this.polygonPaths = [
      // { lat: 35.1, lng: 74.3 },
      // { lat: 35.2, lng: 75.2 },
      // { lat: 36.3, lng: 76.2 },
      // {lat: 36.9, lng: 76.6},
      // {lat: 37.1, lng: 76.9},
      // {lat: 37.8, lng: 77.9},
      // {lat: 36.1, lng: 78.9},
      // {lat: 36.2, lng: 79.9},
      // {lat: 36.3, lng: 80.9},
      // {lat: 36.4, lng: 81.9},
      // {lat: 36.5, lng: 84.9},
    ]
  }

  public markerClicked(marker) {
  }

  public markerClick(m: any) {

    let id = m.id;
    this.router.navigate(['/indicatorDetails'], { queryParams: { id } })
  }

  onDayChange() {
    // this.getMarkers(this.selectedDay)
  }

  getCompaign() {
    this.subs.add(
      this.dashboardService.getCompaign().subscribe(
        (data) => {


          this.temp = [...data.result];

          this.Compaign = data.result;

          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }

  onPolygonChanged(ev) {
    console.log('In OnPolygonChanged')
    console.log(ev);
  }

  // public search(): void {
  //   ;

  //   this.subs.add(
  //     this.MapService.FilterMap(this.districtType, this.formType ,this.FormCategory).subscribe(
  //       (data) => {

  //         ;

  //         this.temp = data.result;

  //          if (this.districtType !== "") {
  //            this.zoom_m2 = 10;
  //            this.lat_m2 = Number((this.temp as any).data[0].lat);
  //            this.lng_m2 = Number((this.temp as any).data[0].long);
  //           }
  //         this.markers = data.result.data;

  //         return this.markers;
  //       },
  //       (error) => {
  //         alert(error);
  //       }
  //     )
  //   );
  // }

  ngOnInit() {

    // this.polygonPaths = []

    // this.polygonPaths.push({lat: 35.1, lng: 74.3 })
    // this.polygonPaths.push({lat: 35.2, lng: 75.2 })
    // this.polygonPaths.push({lat: 36.3, lng: 76.2 })

    this.days = [1, 2, 3]
    this.isLoading = false;
    this.searchForm = this.fb.group({
      division: ["", Validators.required],
      district: ["", Validators.required],
      tehsil: ["", Validators.required],
      uc: ["", Validators.required],
      compaign: ["", Validators.required],
      day: ["", Validators.required],
      FormType: ["", Validators.required],
      module: [null],
      populationType: [null],
      reason: [null],
      polygon: [null]
    });

    this.getCompaign();

    // this.subs.add(
    //   this.registerService.getDivision(state).subscribe(
    //     (data) => {
    //       this.temp = [...data.result];
    //       this.Division = data.result;
    //       return data;
    //     },
    //     (error) => {
    //       alert(error);
    //     }
    //   )
    // );

    if (this.coreService.loginResponse.user.userLVL == 'Division') {
      this.searchForm.controls.division.setValue(this.coreService.loginResponse.user.divisionCode);
      this.getDistricts(this.coreService.loginResponse.user.divisionCode)
      this.searchForm.controls.division.disable()
    }

    if (this.coreService.loginResponse.user.userLVL == 'District') {
      this.searchForm.controls.division.setValue(this.coreService.loginResponse.user.divisionCode);
      this.getDistricts(this.coreService.loginResponse.user.divisionCode)
      this.searchForm.controls.district.setValue(this.coreService.loginResponse.user.districtCode);
      this.searchForm.controls.district.disable()
      this.searchForm.controls.division.disable()
      this.getTehsils(this.coreService.loginResponse.user.districtCode)
    }

    this.getFixedSitePinDrops()

    this.subs.add(
      this.formindicatorservice.getDistrict().subscribe(
        (data) => {
          this.temp = [...data.result];
          this.DistrictType = data.result;
          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );

    //this.search();
    //this.getFormsByLocation();
  }

  // public setPage(event): void {
  //   this.dataGridService.filterObject.pageNumber =
  //     parseInt(event?.offset, 10) + 1;
  //   this.getFormsByLocation();
  // }

  // public resetFilters(): void {
  //   this.dataGridService.filterObject.queryString = "";
  //   this.dataGridService.filterObject.fromDate = null;
  //   this.dataGridService.filterObject.toDate = null;

  //   this.getFormsByLocation();
  // }
  //HouseholdClusterMissedArea
  getFixedSitePinDrops() {
    this.subs.add(
      this.formindicatorservice.getFixedSitePinDrops(this.mapFilterDto).subscribe(
        (data) => {

          // this.temp = [...data.result];

          // this.FormType = data.result;
          this.markers = data.data.formfilled.map(a => {
            return <marker>{
              lat: a.lat,
              long: a.long,
              icon: a.icon,
              formName: a.formName,
              districtName: a.district,
              divisionName: a.division,
              tehsilName: a.tehsil,
              ucNumber: a.uc,
              status: a.status,
              teamNo: a.teamNo,
              dayofwork: a.dayofwork,
            }
          })

          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }

  changeZoomMap(ev) {
    this.zoomLevel = ev;
  }

  getPolygons() {

    if (this.mapFilterDto.polygonType == '1') {
      this.polygonPaths = []
      this.subs.add(
        this.formindicatorservice.getAllHouseHoldClusterPolygons({ ...this.mapFilterDto }).subscribe(
          (data) => {
            debugger
            // this.temp = [...data.result];

            // this.FormType = data.result;

            this.markers = data.data.householdclustermarkers.map(a => {
              return <marker>{
                lat: a.lat,
                long: a.long,
                icon: a.icon,
                formName: a.formName,
                districtName: a.district,
                divisionName: a.division,
                tehsilName: a.tehsil,
                ucNumber: a.uc,
                status: a.status,
                teamNo: a.teamNo,
                dayofwork: a.dayofwork,
              }
            })
            console.log("Markers", this.markers)
            // const tempPolygons = data.data.householdclustermarkers.map(a => { return new google.maps.LatLng(Number(a.lat), Number(a.long)) })

            // this.polygonPaths = [...tempPolygons]

            // console.log("polygonPaths", this.polygonPaths)

            // this.polygonPaths = []

            // this.polygonPaths.push({lat: 35.1, lng: 74.3 })
            // this.polygonPaths.push({lat: 35.2, lng: 75.2 })
            // this.polygonPaths.push({lat: 36.3, lng: 76.2 })

            // this.polygonPaths = [
            //   { lat: 35.1, lng: 74.3 },
            //   { lat: 35.2, lng: 75.2 },
            //   { lat: 36.3, lng: 76.2 },
            //   {lat: 36.9, lng: 76.6},
            //   {lat: 37.1, lng: 76.9},
            //   {lat: 37.8, lng: 77.9},
            //   {lat: 36.1, lng: 78.9},
            //   {lat: 36.2, lng: 79.9},
            //   {lat: 36.3, lng: 80.9},
            //   {lat: 36.4, lng: 81.9},
            //   {lat: 36.5, lng: 84.9},
            //   {lat: 36.6, lng: 83.9},
            //   {lat: 36.7, lng: 85.9},
            //   {lat: 36.8, lng: 86.9},
            //   {lat: 37.0, lng: 87.0},
            //   {lat: 37.2, lng: 87.2},
            // ]
            this.isLoading = false;
            return data;
          },
          (error) => {
            alert(error);
          }
        )
      );
    }
    else if (this.mapFilterDto.polygonType == '2') {
      this.polygonPaths = [];
      this.markers = [];
      this.subs.add(
        this.formindicatorservice.getHouseHoldClusterMissedAreaPolygons({ ...this.mapFilterDto }).subscribe(
          (data) => {
            debugger
            // this.temp = [...data.result];

            // this.FormType = data.result;
            const tempPolygons = data.data.missedarea.map(a => { return { lat: a.lat, lng: a.long } })
            // const tempPolygons = data.data.missedarea.map(a => { return new google.maps.LatLng(Number(a.lat), Number(a.long)) })

            this.polygonPaths = [...tempPolygons]

            console.log("polygonPaths", this.polygonPaths)
            // this.polygonPaths = []

            // this.polygonPaths.push({lat: 35.1, lng: 74.3 })
            // this.polygonPaths.push({lat: 35.2, lng: 75.2 })
            // this.polygonPaths.push({lat: 36.3, lng: 76.2 })

            // this.polygonPaths = [
            //   { lat: 35.1, lng: 74.3 },
            //   { lat: 35.2, lng: 75.2 },
            //   { lat: 36.3, lng: 76.2 },
            //   {lat: 36.9, lng: 76.6},
            //   {lat: 37.1, lng: 76.9},
            //   {lat: 37.8, lng: 77.9},
            //   {lat: 36.1, lng: 78.9},
            //   {lat: 36.2, lng: 79.9},
            //   {lat: 36.3, lng: 80.9},
            //   {lat: 36.4, lng: 81.9},
            //   {lat: 36.5, lng: 84.9},
            //   {lat: 36.6, lng: 83.9},
            //   {lat: 36.7, lng: 85.9},
            //   {lat: 36.8, lng: 86.9},
            //   {lat: 37.0, lng: 87.0},
            //   {lat: 37.2, lng: 87.2},
            // ]
            this.isLoading = false;
            this.lat_m2 = this.polygonPaths[0].lat;
            this.lng_m2 = this.polygonPaths[0].lng
            this.changeZoomMap(18);

            return data;
          },
          (error) => {
            alert(error);
          }
        )
      );
    }
    else if (this.mapFilterDto.polygonType == '3') {
      this.polygonPaths = [];
      this.markers = []
      this.subs.add(
        this.formindicatorservice.getHouseHoldClusterPoorlyCoveredPolygons({ ...this.mapFilterDto }).subscribe(
          (data) => {
            debugger
            // this.temp = [...data.result];

            // this.FormType = data.result;
            this.polygonPaths = data.data.poorlyCoverdArea.map(a => { return { lat: Number(a.lat), lng: Number(a.long) } })

            console.log("polygonPaths", this.polygonPaths)
            // this.polygonPaths = []

            // this.polygonPaths.push({lat: 35.1, lng: 74.3 })
            // this.polygonPaths.push({lat: 35.2, lng: 75.2 })
            // this.polygonPaths.push({lat: 36.3, lng: 76.2 })

            // this.polygonPaths = [
            //   { lat: 35.1, lng: 74.3 },
            //   { lat: 35.2, lng: 75.2 },
            //   { lat: 36.3, lng: 76.2 },
            //   {lat: 36.9, lng: 76.6},
            //   {lat: 37.1, lng: 76.9},
            //   {lat: 37.8, lng: 77.9},
            //   {lat: 36.1, lng: 78.9},
            //   {lat: 36.2, lng: 79.9},
            //   {lat: 36.3, lng: 80.9},
            //   {lat: 36.4, lng: 81.9},
            //   {lat: 36.5, lng: 84.9},
            //   {lat: 36.6, lng: 83.9},
            //   {lat: 36.7, lng: 85.9},
            //   {lat: 36.8, lng: 86.9},
            //   {lat: 37.0, lng: 87.0},
            //   {lat: 37.2, lng: 87.2},
            // ]
            this.isLoading = false;
            this.lat_m2 = this.polygonPaths[0].lat;
            this.lng_m2 = this.polygonPaths[0].lng
            this.changeZoomMap(20);
            return data;
          },
          (error) => {
            alert(error);
          }
        )
      );
    }
    this.isLoading = true
    console.log(this.mapFilterDto);
    debugger
  }

  getTransitPinDrops() {
    this.subs.add(
      this.formindicatorservice.getTransitPinDrops(this.mapFilterDto).subscribe(
        (data) => {

          // this.temp = [...data.result];

          // this.FormType = data.result;
          this.markers = data.data.formfilled.map(a => {
            return <marker>{
              lat: a.lat,
              long: a.long,
              formName: a.formName,
              icon: a.icon,
              districtName: a.district,
              divisionName: a.division,
              tehsilName: a.tehsil,
              ucNumber: a.uc,
              dayofwork: a.dayofwork,
            }
          })

          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }

  getReasonForm() {
    this.subs.add(
      this.formindicatorservice.getReasonForMissedPinDrops(this.mapFilterDto).subscribe(
        (data) => {

          // this.temp = [...data.result];

          // this.FormType = data.result;
          this.markers = data.data.formfilled.map(a => {
            return <marker>{
              lat: a.lat,
              long: a.long,
              icon: a.icon,
              formName: a.formName,
              districtName: a.district,
              divisionName: a.division,
              tehsilName: a.tehsil,
              ucNumber: a.uc,
              dayofwork: a.dayofwork,
            }
          })

          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }

  onSubmit() {
    debugger
    if (this.searchForm.controls.module.value == null) {

      this.toastr.info("Please Select Module ", "Invalid", { closeButton: true });
      return
    }

    if (this.searchForm.controls.division.value == '') {

      this.toastr.info("Please Select Division ", "Invalid", { closeButton: true });
      return
    }

    if (this.searchForm.controls.district.value == '') {

      this.toastr.info("Please Select District ", "Invalid", { closeButton: true });
      return
    }

    if (this.searchForm.controls.tehsil.value == '') {

      this.toastr.info("Please Select Tehsil ", "Invalid", { closeButton: true });
      return
    }

    if (this.searchForm.controls.uc.value == '') {

      this.toastr.info("Please Select UC ", "Invalid", { closeButton: true });
      return
    }

    const localFilterDto: any = {}
    if (this.searchForm.controls.division.value == '') {
      localFilterDto.Code = "0";
      localFilterDto.filterLvl = 'Division';
    }
    if (this.searchForm.controls.division.value != '' && this.searchForm.controls.district.value == '') {
      localFilterDto.Code = this.searchForm.controls.division.value;
      localFilterDto.filterLvl = 'Division';
    }
    if (this.searchForm.controls.division.value != '' && this.searchForm.controls.district.value != ''
      && this.searchForm.controls.tehsil.value == '') {

      localFilterDto.Code = this.searchForm.controls.district.value;
      localFilterDto.filterLvl = 'Tehsil';
    }
    if (this.searchForm.controls.division.value != '' && this.searchForm.controls.district.value != ''
      && this.searchForm.controls.tehsil.value != '' && this.searchForm.controls.uc.value == '') {

      localFilterDto.Code = this.searchForm.controls.tehsil.value;
      localFilterDto.filterLvl = 'UC';
    }
    if (this.searchForm.controls.division.value != '' && this.searchForm.controls.district.value != ''
      && this.searchForm.controls.tehsil.value != '' && this.searchForm.controls.uc.value != '') {

      localFilterDto.Code = this.searchForm.controls.uc.value;
      localFilterDto.filterLvl = 'UC';
    }

    if (this.searchForm.controls.compaign.value == '') {
      localFilterDto.CampaignId = (this.Compaign[0].currentCampaignId);
      this.searchForm.controls.compaign.setValue(this.Compaign[0].currentCampaignId);
    } else {
      localFilterDto.campaignId = this.searchForm.controls.compaign.value;
    }

    if (this.searchForm.controls.day.value == '') {
      localFilterDto.day = null;
    } else {
      localFilterDto.day = this.searchForm.controls.day.value;
    }

    this.mapFilterDto.filterLvl = localFilterDto.filterLvl
    this.mapFilterDto.code = localFilterDto.Code
    this.mapFilterDto.campaignId = localFilterDto.campaignId
    this.mapFilterDto.day = localFilterDto.day
    this.mapFilterDto.moduleWise = this.searchForm.controls.module.value
    this.mapFilterDto.populationType = this.searchForm.controls.populationType.value

    if (this.searchForm.controls.module.value === 'ReasonFor' && this.searchForm.controls.reason.value == null) {

      this.toastr.info("Please Select Reason ", "Invalid", { closeButton: true });
      return
    } else {
      this.mapFilterDto.reasonForMissedType = this.searchForm.controls.reason.value
    }

    if (this.searchForm.controls.module.value === 'Polygon' && this.searchForm.controls.polygon.value == null) {

      this.toastr.info("Please Select Polygon Type ", "Invalid", { closeButton: true });
      return
    } else {
      this.mapFilterDto.polygonType = this.searchForm.controls.polygon.value
    }

    if (this.mapFilterDto.moduleWise === 'FixedSite') {
      this.getFixedSitePinDrops()
    }

    if (this.mapFilterDto.moduleWise === 'Transit') {
      this.getTransitPinDrops()
    }
    debugger
    if (this.mapFilterDto.moduleWise === 'ReasonFor') {
      this.getReasonForm()
    }
    if (this.mapFilterDto.moduleWise === 'Polygon') {
      this.getPolygons()
    }
  }
  onChangeModule() {
    debugger
    this.searchForm.controls.polygon.setValue('');
    this.searchForm.controls.reason.setValue('');
  }
  getDistricts(Division: any) {

    this.subs.add(
      this.registerService.getDistrict(Division).subscribe(
        (data) => {

          this.temp = [...data.result];

          this.District = data.result;

          if (this.coreService.loginResponse.user.userLVL == 'District') {

            this.searchForm.controls.division.setValue(this.coreService.loginResponse.user.divisionCode);

            this.searchForm.controls.district.setValue(this.coreService.loginResponse.user.districtCode);

            this.searchForm.controls.district.disable()
            this.searchForm.controls.division.disable()
            this.getTehsils(this.coreService.loginResponse.user.districtCode)

          }
          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }

  getTehsils(District: any) {

    this.subs.add(
      this.registerService.getTehsil(District).subscribe(
        (data) => {

          this.temp = [...data.result];

          this.Tehsil = data.result;

          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }

  getUCs(Tehsil: any) {

    this.subs.add(
      this.registerService.getUCs(Tehsil).subscribe(
        (data) => {


          this.temp = [...data.result];

          this.UC = data.result;

          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }

  onChange(Code: string) {

    if (Code.length == 3) {
      this.District = [];
      this.Tehsil = [];
      this.UC = [];
      this.getDistricts(Code);
    }
    if (Code.length == 6) {
      this.Tehsil = [];
      this.UC = [];
      this.getTehsils(Code);
    }
    if (Code.length == 9) {
      this.UC = [];
      this.getUCs(Code);
    }
  }

  public onMouseOver(infoWindow, marker): void {

    this.FormName = marker.formName;
    this.IndicatorName = marker.indicatorName;
    this.answer = marker.answer;
    this.Location = marker.Location;

    this.Location = marker.Location;
    this.status = marker.status;
    this.teamNo = marker.teamNo;
    this.divisionName = marker.divisionName,
      this.districtName = marker.districtName,
      this.tehsilName = marker.tehsilName,
      this.ucNumber = marker.ucNumber,
      this.dayofwork = marker.dayofwork
    infoWindow.open();
  }

  public onMouseOut(infoWindow, marker): void {
    this.FormName = marker.formName;
    infoWindow.close();
  }

  // public getFormsByLocation(): void {
  //
  //   this.isLoading = true;

  //   this.dataGridService.getFormsByLocation(this.districtType, this.formType)
  //     .then((response) => {

  //       // this.dataGridService.dataList = response.data.data;
  //       // this.dataGridService.filterObject.pageCount = response.data.pageCount;
  //       // this.dataGridService.filterObject.pageNumber = response.data.pageNumber;
  //       // this.dataGridService.filterObject.size = response.data.size;
  //       // this.dataGridService.filterObject.totalRecords =
  //       //   response.data.totalRecords;
  //       if (this.districtType !== "") {
  //         this.zoom_m2 = 10;
  //         this.lat_m2 = Number(this.dataGridService.dataList[0].lat);
  //         this.lng_m2 = Number(this.dataGridService.dataList[0].long);
  //       }
  //       this.markers = this.dataGridService.dataList;
  //       this.temp = this.dataGridService.dataList;

  //       this.isLoading = false;
  //     })
  //     .catch((error) => {
  //       alert(error);
  //     })
  //     .finally(() => {
  //       this.isLoading = false;
  //     });
  // }
}


interface marker {
  lat: string;
  long: string;
  formName: string;
  icon: string;
  divisionName: string;
  districtName: string;
  tehsilName: string;
  ucNumber: string;
  dayofwork: string;
  status: string,
  teamNo: string,

}

class MapFilterDTO {
  filterLvl: string = 'Division'
  code: string = '0'
  campaignId: number = 17
  day: string = null
  organization: null
  designation: null
  populationType: null
  moduleWise: null
  reasonForMissedType?: string = '2'
  polygonType?: string = '1'
}


interface LatLngLiteral {
  lat: number;
  lng: number;
}

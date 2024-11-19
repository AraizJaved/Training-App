import { Component, OnInit } from "@angular/core";
import { MouseEvent } from "@agm/core";
import { Subscription } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { MapService } from "src/app/shared/services/MapService/MapService";
import { ToastrService } from "ngx-toastr";
import { state } from "@angular/animations";
import { FormIndicatorService } from "src/app/shared/services/FormIndicatorService/FormIndicatorService";
import { DataGridService } from "../../../shared/services/common/data-grid.service";

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
})
 export class DefaultComponent implements OnInit {
//   private subs = new Subscription();
//   public isLoading: boolean;

//   //Map2
//   public lat_m2: number = 31.1704;
//   public lng_m2: number = 72.7097;
//   public zoom_m2: number = 7;

//   error: any;
//   userData = [];
//   temp = [];
//   rawEvent: any;
//   FormType: any[] = [];
//   DistrictType: any[] = [];

//   public markers: marker[] = [];

//   public formType: string = "";
//   public districtType: string = "";

//   public DistrictName: string;
//   public answer : string;
//   public IndicatorName: string;
//   public FormName: string;
//   public Location: string;

//   constructor(
//     private readonly httpClient: HttpClient,
//     private readonly router: Router,
//     private readonly MapService: MapService,
//     private readonly formindicatorservice: FormIndicatorService,
//     private readonly toastr: ToastrService,
//     public readonly dataGridService: DataGridService
//   ) {}

//   public markerClicked(e) {
//     ;
//     this.FormName = e.formName;
//   }

//   public search(): void {
//     ;

//     this.subs.add(
//       this.MapService.FilterMap(this.districtType, this.formType).subscribe(
//         (data) => {



//           this.temp = data.result;
//           if (this.districtType !== "") {
//             this.zoom_m2 = 10;
//             this.lat_m2 = Number(this.temp[0].lat);
//             this.lng_m2 = Number(this.temp[0].long);
//           }
//           this.markers = data.result;

//           return this.markers;
//         },
//         (error) => {
//           alert(error);
//         }
//       )
//     );
//   }

  ngOnInit() {
//     ;
//     this.isLoading = false;
//     this.subs.add(
//       this.formindicatorservice.getForms(state).subscribe(
//         (data) => {



//           this.temp = [...data.result];

//           this.FormType = data.result;

//           return data;
//         },
//         (error) => {
//           alert(error);
//         }
//       )
//     );

//     this.subs.add(
//       this.formindicatorservice.getDistrict(state).subscribe(
//         (data) => {


//           this.temp = [...data.result];

//           this.DistrictType = data.result;

//           return data;
//         },
//         (error) => {
//           alert(error);
//         }
//       )
//     );

//     // this.search();
//     this.getFormsByLocation();
//   }

//   public setPage(event): void {
//     this.dataGridService.filterObject.pageNumber =
//       parseInt(event?.offset, 10) + 1;
//     this.getFormsByLocation();
   }

//   public resetFilters(): void {
//     this.dataGridService.filterObject.queryString = "";
//     this.dataGridService.filterObject.fromDate = null;
//     this.dataGridService.filterObject.toDate = null;

//     this.getFormsByLocation();
//   }

//   public onMouseOver(infoWindow,marker): void {
//     this.FormName = marker.formName;
//     this.IndicatorName=marker.indicatorName;
//     this.answer = marker.answer;
//     this.Location = marker.Location;
//     infoWindow.open();
//   }

//   public onMouseOut(infoWindow,marker): void {
//     this.FormName = marker.formName;
//     infoWindow.close();
//   }

//   public getFormsByLocation(): void {
//     this.isLoading = true;
//     this.dataGridService
//       .getFormsByLocation(this.districtType, this.formType)
//       .then((response) => {

//         this.dataGridService.dataList = response.data.data;
//         this.dataGridService.filterObject.pageCount = response.data.pageCount;
//         this.dataGridService.filterObject.pageNumber = response.data.pageNumber;
//         this.dataGridService.filterObject.size = response.data.size;
//         this.dataGridService.filterObject.totalRecords =
//           response.data.totalRecords;
//         if (this.districtType !== "") {
//           this.zoom_m2 = 10;
//           this.lat_m2 = Number(this.dataGridService.dataList[0].lat);
//           this.lng_m2 = Number(this.dataGridService.dataList[0].long);
//         }
//         this.markers = this.dataGridService.dataList;
//         this.temp = this.dataGridService.dataList;

//         this.isLoading = false;
//       })
//       .catch((error) => {
//         alert(error);
//       })
//       .finally(() => {
//         this.isLoading = false;
//       });
//   }
// }

// interface marker {
//   lat: string;
//   long: string;
//   formName: string;
//   icon: string;
// }

// interface LatLngLiteral {
//   lat: number;
//   lng: number;
}

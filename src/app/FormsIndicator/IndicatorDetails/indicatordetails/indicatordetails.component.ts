import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { MapService } from "src/app/shared/services/MapService/MapService";

@Component({
  selector: "app-indicatordetails",
  templateUrl: "./indicatordetails.component.html",
  styleUrls: ["./indicatordetails.component.scss"],
})
export class IndicatordetailsComponent implements OnInit {
  formId: any;
  private subs = new Subscription();
  public isLoading: boolean

  public fID: any =[];

  constructor(
    private readonly MapService: MapService,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isLoading = true
    this.formId = this.activatedRoute.snapshot.queryParams.id;

    this.subs.add(
      this.MapService.GetIndicatorDetail(this.formId).subscribe(
        (data) => {
          ;
          this.fID = data.result;

        
          this.isLoading = false
          return this.fID;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }
}

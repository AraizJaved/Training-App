import {AfterViewInit, Component, Inject, Input, NgZone, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import * as am4charts from "@amcharts/amcharts4/charts";
import {DashboardService} from "../../../shared/services/DashboardService/DashboardService";
import {isPlatformBrowser} from "@angular/common";
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import {FilterDTO} from "../../filterDto";

@Component({
  selector: 'app-comp-registration-compliance-district-level',
  templateUrl: './comp-registration-compliance-district-level.component.html',
})
export class CompRegistrationComplianceDistrictLevelComponent implements OnInit {

  public registrationCompliance: any[] = []
  public isLoading: boolean
  public isData:boolean=true
  @Input() filterDto: Observable<FilterDTO>
  private subs: Subscription = new Subscription()
  private chart: am4charts.XYChart

  constructor(
    private readonly dashboardService: DashboardService,
    @Inject(PLATFORM_ID) private platformId,
    private ngZone: NgZone
  ) {
  }

  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.ngZone.runOutsideAngular(() => {
        f()
      })
    }
  }

  ngOnInit(): void {
    this.subs.add(this.filterDto.subscribe(async (filterDto: FilterDTO) => {
       
      await this.getRegistrationComplianceDistrictlevel(filterDto)
      this.generateChart()
    }))
  }

  private generateChart(){
    this.browserOnly(() => {

        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        const chart = am4core.create("complianceRegistration3", am4charts.XYChart);

        // Add data
        chart.data = this.registrationCompliance.map(tusd => {
          return {
            category: tusd.name,
            value1: tusd.io,
            value2: tusd.dhcso,
            value3: tusd.dso,
            value4: tusd.dho,
            value5: tusd.ceo
          }
        })
     

        // Create axes
        const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "category";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 20;

        const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.inside = true;
        valueAxis.renderer.labels.template.disabled = true;
        valueAxis.min = 0;

        chart.colors.list = [
          //am4core.color("#2776BD"),
          am4core.color("#00A1D0"),
          am4core.color("#00C195"),
          am4core.color("#7ED321"),
          am4core.color("#A8C600"),
          am4core.color("#C9B600"),
          am4core.color("#E3A600"),
          am4core.color("#F7941E"),
          am4core.color("#FC7149")
        ];
// Create series

        this.createSeries("value1", "IO", chart);
        this.createSeries("value2", "DHCSO", chart);
        this.createSeries("value3", "DSO", chart);
        this.createSeries("value4", "DHO", chart);
        this.createSeries("value5", "CEO", chart);

// Legend

        let label = chart.chartAndLegendContainer.createChild(am4core.Label);
        label.text = "District Level Registration Compliance";
        label.align = "center";
        label.fontWeight = 'bold'
        label.marginTop = 10

        chart.legend = new am4charts.Legend();
        chart.maskBullets = false;

        this.chart = chart
      }
    )
  }
  async ngAfterViewInit(): Promise<void> {

    //await this.getSuperVisorTrainedUnTrainedStaff()
  }

  createSeries(field, name, chart) {

    // Set up series
    const series = chart.series.push(new am4charts.ColumnSeries());
    series.name = name;
    series.dataFields.valueY = field;
    series.dataFields.categoryX = "category";
    series.sequencedInterpolation = true;

    // Make it stacked
    series.stacked = true;

    // Configure columns
    series.columns.template.width = am4core.percent(60);
    series.columns.template.tooltipText = "[bold]{name}[/]\n[font-size:14px]{categoryX}: {valueY}";

    // Add label

    const labelBullet = series.bullets.push(new am4charts.LabelBullet());
    labelBullet.label.text = "[bold][background-color: white, font-size: 13px]{valueY}";
    labelBullet.locationY = 0.5;
    labelBullet.label.fill = am4core.color("#fff");
    labelBullet.label.hideOversized = true;



    return series;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
    this.browserOnly(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }


  private async getRegistrationComplianceDistrictlevel(filterDto: FilterDTO): Promise<void> {
    const data = await this.dashboardService.getRegistrationComplianceDistrictlevel(filterDto).toPromise()
    this.registrationCompliance = data?.data?.formfilled ?? []

    if(this.registrationCompliance.length==0){
      debugger
     this.isData = false
    }

  }

}

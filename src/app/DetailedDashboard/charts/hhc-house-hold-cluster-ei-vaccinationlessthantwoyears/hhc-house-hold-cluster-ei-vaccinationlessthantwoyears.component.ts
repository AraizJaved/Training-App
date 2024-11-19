import {AfterViewInit, Component, Inject, Input, NgZone, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {FilterDTO} from "../../filterDto";
import * as am4charts from "@amcharts/amcharts4/charts";
import {DashboardService} from "../../../shared/services/DashboardService/DashboardService";
import {isPlatformBrowser} from "@angular/common";
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

@Component({
  selector: 'app-hhc-house-hold-cluster-ei-vaccinationlessthantwoyears',
  templateUrl: './hhc-house-hold-cluster-ei-vaccinationlessthantwoyears.component.html',
  styleUrls: ['./hhc-house-hold-cluster-ei-vaccinationlessthantwoyears.component.scss']
})
export class HhcHouseHoldClusterEIVaccinationlessthantwoyearsComponent implements OnInit , OnDestroy ,AfterViewInit {

  public hhcEIVaccination: any[] = []
  public isLoading: boolean
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
       
      await this.getHHCHouseHoldClusterEIVaccinationlessthantwoyears(filterDto)
      this.generateChart()
    }))
  }

  private generateChart(){
    this.browserOnly(() => {

        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        const chart = am4core.create("chartdivHHCEI2Years", am4charts.XYChart);

        // Add data
        chart.data = this.hhcEIVaccination.map(tusd => {
          return {
            category: tusd.name,
            value1: tusd.totalChildrenslessthantwoyears,
            value2: tusd.zeroDoselessthentwoyears
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
          //am4core.color("#00A1D0"),
          am4core.color("#00C195"),
          am4core.color("#7ED321"),
          am4core.color("#A8C600"),
          am4core.color("#C9B600"),
          am4core.color("#E3A600"),
          am4core.color("#F7941E"),
          am4core.color("#FC7149")
        ];
// Create series

        this.createSeries("value1", "Total Children < 2 Years", chart);
        this.createSeries("value2", "Zero Dose < 2 Years", chart);

// Legend

        let label = chart.chartAndLegendContainer.createChild(am4core.Label);
        label.text = "EI Vaccination < 2 Years";
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
    labelBullet.label.text = "[bold][background-color: white, font-size: 12px]{valueY}";
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

  private async getHHCHouseHoldClusterEIVaccinationlessthantwoyears(filterDto :FilterDTO): Promise<void> {
    const data = await this.dashboardService.getHHCHouseHoldClusterEIVaccinationlessthantwoyears(filterDto).toPromise()
    this.hhcEIVaccination = data?.data?.formfilled ?? []
  }

}

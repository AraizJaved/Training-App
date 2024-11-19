import {AfterViewInit, Component, Inject, Input, NgZone, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import * as am4charts from "@amcharts/amcharts4/charts";
import {Observable, Subscription} from "rxjs";
import {DashboardService} from "../../../shared/services/DashboardService/DashboardService";
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_spiritedaway from "@amcharts/amcharts4/themes/spiritedaway";
import {isPlatformBrowser} from "@angular/common";
import {FilterDTO} from "../../filterDto";

@Component({
  selector: 'app-comp-supervisor-monitoring-ucmoand-aic-complaince',
  templateUrl: './comp-supervisor-monitoring-ucmoand-aic-complaince.component.html',
})
export class CompSupervisorMonitoringUCMOandAICComplainceComponent implements OnInit , OnDestroy ,AfterViewInit{

  public Data: any[] = []
  public isLoading: boolean
  @Input() filterDto: Observable<FilterDTO>
  private chart: am4charts.XYChart
  private subs: Subscription = new Subscription()

  constructor(
    private readonly dashboardService: DashboardService,
    @Inject(PLATFORM_ID) private platformId,
    private ngZone: NgZone
  ) {
  }

  ngOnInit(): void {
    this.subs.add(this.filterDto.subscribe(async (filterDto: FilterDTO) => {
       
      await this.getSupervisormonitoringUCMOandAICComplaince(filterDto)
      this.generateChart()
    }))
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
    this.browserOnly(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }


  private generateChart(){
    this.browserOnly(() => {

      am4core.useTheme(am4themes_spiritedaway);
    
      const chart = am4core.create("compliance3", am4charts.XYChart);

      chart.data = this.Data.map(tusd => {
        return {
          category: tusd.name,
          value1: tusd.ucmo,
          value2: tusd.aic,
        }
      })

  
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
      // Create axes
      const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "category";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 20;

      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.renderer.inside = true;
      valueAxis.renderer.labels.template.disabled = true;
      valueAxis.min = 0;

// Create series

    this.createSeries("value1", "UCMO", chart);
    this.createSeries("value2", "AIC", chart);
    
// Legend

      let label = chart.chartAndLegendContainer.createChild(am4core.Label);
      label.text = "Supervisor Monitoring UCMO & AIC Compliance";
      label.align = "center";
      label.fontWeight = 'bold'
      label.marginTop = 10

      chart.legend = new am4charts.Legend();
      chart.maskBullets = false;

      this.chart = chart
    }
  )
  }

  createSeries(field, name, chart) {

    // Set up series
    const series = chart.series.push(new am4charts.ColumnSeries());
    series.name = name;
    series.dataFields.valueY = field;
    series.dataFields.categoryX = "category";
    series.sequencedInterpolation = true;
    series.customA = name;
    // Make it stacked
    series.stacked = true;

    // Configure columns
    series.columns.template.width = am4core.percent(60);
   
    series.columns.template.tooltipText = "[bold]{category}[/]\n\n[font-size:14px]{name}: {valueY}";

    // Add label

    const labelBullet = series.bullets.push(new am4charts.LabelBullet());
    labelBullet.label.text = "[bold][background-color: white, font-size: 13px]{valueY}";

    labelBullet.locationY = 0.5;
    labelBullet.label.fill = am4core.color("#fff");
    labelBullet.label.hideOversized = true;
    return series;
  }

  async ngAfterViewInit(): Promise<void> {
  
  }

  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.ngZone.runOutsideAngular(() => {
        f()
      })
    }
  }

  private async getSupervisormonitoringUCMOandAICComplaince(filterDto :FilterDTO): Promise<void> {
     
    const data = await this.dashboardService.getSupervisormonitoringUCMOandAICComplaince(filterDto).toPromise()
    this.Data = data?.data?.formfilled ?? []

  }
}

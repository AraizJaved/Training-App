import {AfterViewInit, Component, Inject, Input, NgZone, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import * as am4charts from "@amcharts/amcharts4/charts";
import {Observable, Subscription} from "rxjs";
import {DashboardService} from "../../../shared/services/DashboardService/DashboardService";
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_frozen from "@amcharts/amcharts4/themes/frozen";
import {isPlatformBrowser} from "@angular/common";
import {FilterDTO} from "../../filterDto";

@Component({
  selector: 'app-catchup-house-hold-checked',
  templateUrl: './catchup-house-hold-checked.component.html',
})
export class CatchupHouseHoldCheckedComponent implements OnInit ,AfterViewInit,OnDestroy{

  public catchUpData: any[] = []
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
       
      await this.getCatchupHouseHoldChecked(filterDto)
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

      am4core.useTheme(am4themes_frozen)

      // Create chart instance
      const chart = am4core.create("catchUpDiv2", am4charts.XYChart);

      // Add data
      chart.data = this.catchUpData.map(tusd => {
        return {
          category: tusd.name,
          value1: tusd.zeroByzero,
          value2: tusd.lock,
          value3: tusd.ref,
          value4: tusd.na
        }
      })

      chart.colors.list = [
        am4core.color("#2776BD"),
        am4core.color("#00A1D0"),
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

    this.createSeries("value1", "Zero by Zero", chart);
    this.createSeries("value2", "Lock", chart);
    this.createSeries("value3", "Ref", chart);
    this.createSeries("value4", "NA", chart);
    
// Legend

      let label = chart.chartAndLegendContainer.createChild(am4core.Label);
      label.text = "CatchUp House Hold Checked ";
      label.align = "center";
      label.fontWeight = 'bold'
      label.marginTop = 15

      chart.legend = new am4charts.Legend();
      chart.maskBullets = false;

      this.chart = chart
    }
  )
  }

  async ngAfterViewInit(): Promise<void> {
    //await this.getHouseHoldClusterZeroDoseEIChildren()

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
    //series.columns.template.tooltipText = "[bold][font-size:14px] {category}: {valueY}";
    series.columns.template.tooltipText = "[bold]{category}[/]\n[font-size:14px]{name}: {valueY}";

    const labelBullet = series.bullets.push(new am4charts.LabelBullet());
    //labelBullet.label.text = `${Number(p).toFixed(1)}%`;
    labelBullet.label.text = "[bold][background-color: white, font-size: 13px]{valueY}";
    labelBullet.locationY = 0.5;
    labelBullet.label.fill = am4core.color("#fff");
    labelBullet.label.hideOversized = true;
    return series;
  }

  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.ngZone.runOutsideAngular(() => {
        f()
      })
    }
  }

  private async getCatchupHouseHoldChecked(filterDto : FilterDTO): Promise<void> {
    const data = await this.dashboardService.getCatchupHouseHoldChecked(filterDto).toPromise()
  
    this.catchUpData = data?.data?.formfilled ?? []
  }

}

import { AfterViewInit, Component, Inject, Input, NgZone, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { Observable, Subscription } from "rxjs";
import * as am4charts from "@amcharts/amcharts4/charts";
import { DashboardService } from "../../../shared/services/DashboardService/DashboardService";
import { isPlatformBrowser } from "@angular/common";
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/dataviz";
import { FilterDTO } from "../../filterDto";

@Component({
  selector: 'app-transit-team-monitoring-leas-support',
  templateUrl: './transit-team-monitoring-leas-support.component.html',
  styleUrls: ['./transit-team-monitoring-leas-support.component.scss']
})
export class TransitTeamMonitoringLEAsSupportComponent implements OnInit, OnDestroy, AfterViewInit {

  public TTMLeasSupport: any[] = []
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

  findByKey(raw, allowed) {
    return raw.map(r => {
      return Object.keys(r)
        .filter(key => allowed.includes(key))
        .reduce((obj, key) => {
          obj[key] = r[key];
          return obj;
        }, {});
    })
  }

  ngOnInit(): void {
    this.subs.add(this.filterDto.subscribe(async (filterDto: FilterDTO) => {
       
      await this.getTransitTeamMonitoringLEAsSupport(filterDto)
      this.generateChart()
    }))
  }

  private generateChart() {

    this.browserOnly(() => {

      am4core.useTheme(am4themes_animated);
      // Themes end

      // Create chart instance
      const chart = am4core.create("chartdivttm4", am4charts.XYChart);
    
      // Add data
      chart.data = this.TTMLeasSupport.map(ttm => {
        return {
          category: ttm.name,
          value1: ttm.present,
          value2: ttm.helping,
          value3: ttm.denominator
        }
      })
     
      const tempFirstData = chart.data

     
      const parallelPercentages: number[] = chart.data.map(c => {
        return c.value3
      })

       
      const tempData = chart.data.map((mobileTeamMonitoring, i) => {
        return {
          category: mobileTeamMonitoring.category,

          value1: ((mobileTeamMonitoring.value1 / parallelPercentages[i]) * 100).toFixed(0),
          value2: ((mobileTeamMonitoring.value2 / parallelPercentages[i]) * 100).toFixed(0),
        }
      })


      chart.data = chart.data.map((mobileTeamMonitoring, i) => {
        return {
          category: mobileTeamMonitoring.category,
          // f: tempFirstData[i],
          [`value1`]: ((mobileTeamMonitoring.value1 / parallelPercentages[i]) * 100).toFixed(0),
          [`value2`]: ((mobileTeamMonitoring.value2 / parallelPercentages[i]) * 100).toFixed(0),

          // category: mobileTeamMonitoring.category,
          // value1: 100,
          // value2: 100,

        }
      })
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

      this.createSeries("value1", "Present", chart, tempData[0].value1, this.findByKey(tempFirstData, ['value1', 'category']), tempFirstData.length);
      this.createSeries("value2", "Helping", chart, tempData[0].value2, this.findByKey(tempFirstData, ['value2', 'category']), tempFirstData.length);


      // Legend

      let label = chart.chartAndLegendContainer.createChild(am4core.Label);
      label.text = "LEA's Support";
      label.align = "center";
      label.fontWeight = 'bold'
      label.marginTop = 10
      label.truncate = true;
      chart.legend = new am4charts.Legend();
      chart.maskBullets = false;

      this.chart = chart
    }
    )
  }

  async ngAfterViewInit(): Promise<void> {

    //await this.getTransitTeamMonitoringLEAsSupport()

  }

  createSeries(field, name, chart, p, tempData, len) {

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
    
    let tooltipString = ''
    let sum = 0
    tooltipString += `${name}\n\n`
    // series.columns.template.tooltipText =
    for (let i = 0; i < len; ++i) {
      tooltipString += `${tempData[i].category}: ${tempData[i][field]}\n`
      sum += tempData[i][field]
    }
    //tooltipString += `\n\nTotal: ${sum}`
    series.columns.template.tooltipText = tooltipString

    // Add label

    const labelBullet = series.bullets.push(new am4charts.LabelBullet());
    // labelBullet.label.text = `${Number(p).toFixed(1)}%`;
    labelBullet.label.text = '{valueY}%'
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

    am4core.unuseTheme(am4themes_animated)
  }

  private async getTransitTeamMonitoringLEAsSupport(filterDto: FilterDTO): Promise<void> {
    const data = await this.dashboardService.getTransitTeamMonitoringLEAsSupport(filterDto).toPromise()
    this.TTMLeasSupport = data?.data?.formfilled ?? []
  }


}

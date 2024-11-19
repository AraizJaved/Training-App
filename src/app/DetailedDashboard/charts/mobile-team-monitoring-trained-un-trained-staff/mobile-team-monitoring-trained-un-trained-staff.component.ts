import { AfterViewInit, Component, Inject, Input, NgZone, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { DashboardService } from "../../../shared/services/DashboardService/DashboardService";
import * as am4core from "@amcharts/amcharts4/core";
import am4animated from "@amcharts/amcharts4/themes/frozen";
import * as am4charts from "@amcharts/amcharts4/charts";
import { FilterDTO } from "../../filterDto";
import { Observable, Subscription } from "rxjs";
import { isPlatformBrowser } from "@angular/common";

@Component({
  selector: 'app-mobile-team-monitoring-trained-un-trained-staff',
  templateUrl: './mobile-team-monitoring-trained-un-trained-staff.component.html',
  styleUrls: ['./mobile-team-monitoring-trained-un-trained-staff.component.scss']
})
export class MobileTeamMonitoringTrainedUnTrainedStaffComponent implements OnInit, OnDestroy, AfterViewInit {

  public MTMTrainedUntrained: any[] = [];
  @Input() filterDto: Observable<FilterDTO>
  private chart: am4charts.XYChart
  private subs: Subscription = new Subscription()

  constructor(private readonly dashboardService: DashboardService,
    @Inject(PLATFORM_ID) private platformId,
    private ngZone: NgZone) {
  }

  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.ngZone.runOutsideAngular(() => {
        f()
      })
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
    this.browserOnly(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });

    am4core.unuseTheme(am4animated)
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

  async ngOnInit(): Promise<void> {
    this.subs.add(this.filterDto.subscribe(async (filterDto: FilterDTO) => {
       
      await this.getMobileTeamMonitoringTrainedUnTrainedStaff(filterDto)
      this.generateChart()
    }))

    //await this.getMobileTeamMonitoringTrainedUnTrainedStaff()
  }

  /* Define a custom theme */
  // am4themes_myTheme(target) {
  // 

  //   if (target instanceof am4core.ColorSet) {
  //     target.list = [
  //       am4core.color("#FFC78"),
  //       am4core.color("green"),
  //       am4core.color("blue")
  //     ];
  //   }
  // }

  private generateChart() {
    am4core.useTheme(am4animated);
    // Themes end

    // Create chart instance
    const chart = am4core.create("chartdivChart2", am4charts.XYChart);


    chart.data = this.MTMTrainedUntrained.map(mobileTeamMonitoring => {
      return {
        category: mobileTeamMonitoring.name,

        value1: mobileTeamMonitoring.trained,
        value2: mobileTeamMonitoring.unTrained,
        value3: mobileTeamMonitoring.denominator

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

        value1: ((mobileTeamMonitoring.value1 / parallelPercentages[i]) * 100).toFixed(0),
        value2: ((mobileTeamMonitoring.value2 / parallelPercentages[i]) * 100).toFixed(0),

        // category: mobileTeamMonitoring.category,

        // value1: 100,
        // value2: 100,
      }
    })

    


    //------------
    chart.legend = new am4charts.Legend();
    chart.legend.position = "right";

    chart.colors.list = [
     
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
    const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.grid.template.opacity = 0;
    categoryAxis.renderer.minGridDistance = 20;

    const valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.labels.template.disabled = true;
    //valueAxis.numberFormatter = new am4core.NumberFormatter();
    //valueAxis.numberFormatter.numberFormat = "#.#";
    valueAxis.min = 0;
    valueAxis.renderer.grid.template.opacity = 0;
    valueAxis.renderer.ticks.template.strokeOpacity = 0.5;
    valueAxis.renderer.ticks.template.stroke = am4core.color("#495C43");
    valueAxis.renderer.ticks.template.length = 10;
    valueAxis.renderer.baseGrid.disabled = true;
    valueAxis.renderer.minGridDistance = 40;


    this.createSeries("value1", "Both Trained", chart, tempData[0].value1, this.findByKey(tempFirstData, ['value1', 'category']), tempFirstData.length);
    this.createSeries("value2", "Both Un-Trained", chart, tempData[0].value2, this.findByKey(tempFirstData, ['value2', 'category']), tempFirstData.length);

    this.chart = chart

  }

  ngAfterViewInit(): void {

  }

  createSeries(field, name, chart,  t1, tempData, len) {
  
    const series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueX = field;
    series.dataFields.categoryY = "category";
    series.stacked = true;
    series.sequencedInterpolation = true;
    series.name = name;
    // series.calculatePercent = true;
   
    // series.columns.template.tooltipText = 
    // `${name}\n\n${tempData[0].category}: ${tempData[0][field]}
    // ${tempData[1].category}: ${tempData[1][field]}\n\n Total: ${tempData[0][field] + tempData[1][field]}`;

    let tooltipString = ''
    let sum = 0

    tooltipString += `${name}\n\n`
    // series.columns.template.tooltipText =
    for (let i = 0; i < len; ++i) {
      tooltipString += `${tempData[i].category}: ${tempData[i][field]}\n`
      sum += tempData[i][field]
    }
    
   // tooltipString += `\n\nTotal: ${sum}`
    series.columns.template.tooltipText = tooltipString
    
    const labelBullet = series.bullets.push(new am4charts.LabelBullet());
   
    labelBullet.locationX = 0.5;
    labelBullet.fontSize = 15
   // labelBullet.label.text = "[bold][background-color: white, font-size: 10px]{valueY}";
  
    // labelBullet.label.text = `${Number(t1).toFixed(1)}%`;
    labelBullet.label.text = '{valueX}%'
    labelBullet.label.fill = am4core.color("#fff");

    series.columns.template.width = am4core.percent(100);
  }

  private async getMobileTeamMonitoringTrainedUnTrainedStaff(filterDto: FilterDTO): Promise<void> {
    const data = await this.dashboardService.getMobileTeamMonitoringTrainedUnTrainedStaff(filterDto).toPromise()
    this.MTMTrainedUntrained = data?.data?.formfilled ?? []
  }


}

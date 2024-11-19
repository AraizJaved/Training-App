import { AfterViewInit, Component, Inject, Input, NgZone, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { DashboardService } from "../../../shared/services/DashboardService/DashboardService";
import * as am4core from "@amcharts/amcharts4/core";
import am4animated from "@amcharts/amcharts4/themes/frozen";
import * as am4charts from "@amcharts/amcharts4/charts";
import { FilterDTO } from "../../filterDto";
import { Observable, Subscription } from "rxjs";
import { isPlatformBrowser } from "@angular/common";

@Component({
  selector: 'app-house-hold-cluster-reason-for-missed',
  templateUrl: './house-hold-cluster-reason-for-missed.component.html',
  styleUrls: ['./house-hold-cluster-reason-for-missed.component.scss']
})
export class HouseHoldClusterReasonForMissedComponent implements OnInit, OnDestroy, AfterViewInit {

  public hhcReasonForMissed: any[] = [];
  @Input() filterDto: Observable<FilterDTO>
  private chart: am4charts.XYChart
  private subs: Subscription = new Subscription()

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

  ngOnDestroy(): void {
    this.subs.unsubscribe()
    this.browserOnly(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

  async ngOnInit(): Promise<void> {
    this.subs.add(this.filterDto.subscribe(async (filterDto: FilterDTO) => {

      await this.getHouseHoldClusterreasonformissed(filterDto)
      this.generateChart()
    }))

    //await this.getHouseHoldClusterreasonformissed()
  }

  private generateChart() {
    am4core.useTheme(am4animated);
    // Themes end

    // Create chart instance
    const chart = am4core.create("householdReason", am4charts.XYChart);


    chart.data = this.hhcReasonForMissed.map(hhc => {
      return {
        category: hhc.name,
        value1: hhc.teamMissedthehouse,
        value2: hhc.tvbmc,
        value3: hhc.na,
        value4: hhc.ref,
        value5: hhc.other,
        value6: hhc.denominator
      }
    })


    const tempFirstData = chart.data


    const parallelPercentages: number[] = chart.data.map(c => {
      return c.value6
    })


    const tempData = chart.data.map((mobileTeamMonitoring, i) => {
      return {
        category: mobileTeamMonitoring.category,

        value1: ((mobileTeamMonitoring.value1 / parallelPercentages[i]) * 100).toFixed(0),
        value2: ((mobileTeamMonitoring.value2 / parallelPercentages[i]) * 100).toFixed(0),
        value3: ((mobileTeamMonitoring.value3 / parallelPercentages[i]) * 100).toFixed(0),
        value4: ((mobileTeamMonitoring.value4 / parallelPercentages[i]) * 100).toFixed(0),
        value5: ((mobileTeamMonitoring.value5 / parallelPercentages[i]) * 100).toFixed(0),

      }

    })
    // tempData.sort((a,b)=> (a.category > b.category ? 1 : -1))
    chart.data = tempData
    //------------



    chart.legend = new am4charts.Legend();
    chart.legend.position = "right";
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


    chart.legend = new am4charts.Legend();
    chart.legend.position = "right";

    // Create axes
    const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.grid.template.opacity = 0;
    categoryAxis.renderer.minGridDistance = 20;

    const valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.labels.template.disabled = true;
    valueAxis.min = 0;
    valueAxis.renderer.grid.template.opacity = 0;
    valueAxis.renderer.ticks.template.strokeOpacity = 0.5;
    valueAxis.renderer.ticks.template.stroke = am4core.color("#495C43");
    valueAxis.renderer.ticks.template.length = 10;
    valueAxis.renderer.baseGrid.disabled = true;
    valueAxis.renderer.minGridDistance = 40;


    this.createSeries("value1", "Team Missed the House", chart, tempData[0].value1, this.findByKey(tempFirstData, ['value1', 'category']), tempFirstData.length),// tempFirstData[0].value2 , tempFirstData[0].value3, tempFirstData[0].value4);
      this.createSeries("value2", "Team Visit but Missed the Child", chart, tempData[0].value2, this.findByKey(tempFirstData, ['value2', 'category']), tempFirstData.length);
    this.createSeries("value3", "Not Available", chart, tempData[0].value3, this.findByKey(tempFirstData, ['value3', 'category']), tempFirstData.length);
    this.createSeries("value4", "Refusal", chart, tempData[0].value4, this.findByKey(tempFirstData, ['value4', 'category']), tempFirstData.length);
    this.createSeries("value5", "Other", chart, tempData[0].value5, this.findByKey(tempFirstData, ['value5', 'category']), tempFirstData.length),// tempFirstData[0].value2 , tempFirstData[0].value3, tempFirstData[0].value4);

      this.chart = chart
  }

  ngAfterViewInit(): void {

  }

  createSeries(field, name, chart, t1, tempData, len) {
    ;
    const series = chart.series.push(new am4charts.ColumnSeries());
    series.calculatePercent = true;

    series.dataFields.valueX = field;

    series.dataFields.categoryY = "category";

    series.stacked = true;
    series.name = name;

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
    const labelBullet = series.bullets.push(new am4charts.LabelBullet());
    labelBullet.locationX = 0.5;
    // labelBullet.label.text = `${Number(t1).toFixed(1)}%`;
    labelBullet.label.text = '{valueX}%'
    labelBullet.label.fill = am4core.color("#fff");

  }

  private async getHouseHoldClusterreasonformissed(filterDto: FilterDTO): Promise<void> {
    const data = await this.dashboardService.getHouseHoldClusterreasonformissed(filterDto).toPromise()
    this.hhcReasonForMissed = data?.data?.formfilled ?? []
  }

}

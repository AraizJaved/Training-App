import { AfterViewInit, Component, Inject, Input, NgZone, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import am4animated from "@amcharts/amcharts4/themes/frozen";
import * as am4charts from "@amcharts/amcharts4/charts";
import { DashboardService } from "../../../shared/services/DashboardService/DashboardService";
import { FilterDTO } from "../../filterDto";
import { Observable, Subscription } from "rxjs";
import { isPlatformBrowser } from "@angular/common";
import { FormIndicatorService } from 'src/app/shared/services/FormIndicatorService/FormIndicatorService';

@Component({
  selector: 'app-mobile-team-monitoring-neap-composition',
  templateUrl: './mobile-team-monitoring-neap-composition.component.html',
  styleUrls: ['./mobile-team-monitoring-neap-composition.component.scss']
})
export class MobileTeamMonitoringNeapCompositionComponent implements OnInit, OnDestroy, AfterViewInit {
  public MTMNeapComposition: any[] = [];
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
       
      await this.getMobileTeamMonitoringNeapComposition(filterDto)
      this.generateChart()
    }))
    //await this.getMobileTeamMonitoringNeapComposition()

  }

  private generateChart() {
    am4core.useTheme(am4animated);
    // Themes end

    // Create chart instance
    const chart = am4core.create("chartdivChart", am4charts.XYChart);

    chart.data = this.MTMNeapComposition.map(mobileTeamMonitoring => {
      return {
        category: mobileTeamMonitoring.name,
        value1: mobileTeamMonitoring.bothAdult,
        value2: mobileTeamMonitoring.local,
        value3: mobileTeamMonitoring.government,
        value4: mobileTeamMonitoring.female,
        value5: mobileTeamMonitoring.denominator
      }
    })




    const tempFirstData = chart.data
   
    const parallelPercentages: number[] = chart.data.map(c => {
      return c.value5
    })
   
     
    const tempData = chart.data.map((mobileTeamMonitoring, i) => {
      return {
        category: mobileTeamMonitoring.category,

        value1: ((mobileTeamMonitoring.value1 / parallelPercentages[i]) * 100).toFixed(0),
        value2: ((mobileTeamMonitoring.value2 / parallelPercentages[i]) * 100).toFixed(0),
        value3: ((mobileTeamMonitoring.value3 / parallelPercentages[i]) * 100).toFixed(0),
        value4: ((mobileTeamMonitoring.value4 / parallelPercentages[i]) * 100).toFixed(0),
      }
    })
    chart.data = chart.data.map((mobileTeamMonitoring, i) => {
      return {
        category: mobileTeamMonitoring.category,
        // f: tempFirstData[i],
        [`value1`]: ((mobileTeamMonitoring.value1 / parallelPercentages[i]) * 100).toFixed(0),
        [`value2`]: ((mobileTeamMonitoring.value2 / parallelPercentages[i]) * 100).toFixed(0),
        [`value3`]: ((mobileTeamMonitoring.value3 / parallelPercentages[i]) * 100).toFixed(0),
        [`value4`]: ((mobileTeamMonitoring.value4 / parallelPercentages[i]) * 100).toFixed(0),

        // category: mobileTeamMonitoring.category,
        // value1: 100,
        // value2: 100,

      }
    })
  
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
    // Create axes
    const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.grid.template.opacity = 0;
    categoryAxis.renderer.minGridDistance = 20;
    // categoryAxis.disabled = true
    
    const valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.labels.template.disabled = true;
    // valueAxis.disabled = true
    // valueAxis.adapter.add("getTooltipText", function (text, target, key) {
    //   alert(text + "---" + target + "---" + key);
    //   return ">>> " + text + " <<<";
    // });
    valueAxis.min = 0;
    valueAxis.renderer.grid.template.opacity = 0;
    valueAxis.renderer.ticks.template.strokeOpacity = 0.5;
    valueAxis.renderer.ticks.template.stroke = am4core.color("#495C43");
    valueAxis.renderer.ticks.template.length = 10;
   
    valueAxis.renderer.baseGrid.disabled = true;
    valueAxis.renderer.minGridDistance = 40;

    
   

    chart.data

    this.createSeries("value1", "Both Adult", chart, tempData[0].value1, this.findByKey(tempFirstData, ['value1', 'category']), tempFirstData.length),// tempFirstData[0].value2 , tempFirstData[0].value3, tempFirstData[0].value4);
    this.createSeries("value2", "Local", chart, tempData[0].value2, this.findByKey(tempFirstData, ['value2', 'category']), tempFirstData.length);
    this.createSeries("value3", "Government", chart, tempData[0].value3, this.findByKey(tempFirstData, ['value3', 'category']), tempFirstData.length);
    this.createSeries("value4", "Female", chart, tempData[0].value4, this.findByKey(tempFirstData, ['value4', 'category']), tempFirstData.length);

    // this.createSeries("value2", "Local", chart, tempData[1].value2, tempFirstData[1].value1, tempFirstData[1].value2, tempFirstData[1].value3, tempFirstData[1].value4);
    // this.createSeries("value3", "Government", chart, tempData[2].value2, tempFirstData[1].value1, tempFirstData[1].value2, tempFirstData[2].value3, tempFirstData[2].value4);
    // this.createSeries("value4", "Female", chart, tempData[3].value2, tempFirstData[1].value1, tempFirstData[1].value2, tempFirstData[3].value3, tempFirstData[3].value4);


    this.chart = chart

 
    // categoryAxis.adapter.add('getTooltipText', text => {
    //    

    //   console.table(text)
    //   alert(text)
    //   return `${text}: ABC`
    // })
  }

  ngAfterViewInit(): void {

  }

  createSeries(field, name, chart, t1, tempData, len) {

     ;
    // chart.numberFormatter.numberFormat = "#.0";
    const series = chart.series.push(new am4charts.ColumnSeries());

    series.dataFields.valueX = field;

    series.dataFields.categoryY = "category";
    series.stacked = true;
    series.sequencedInterpolation = true;
    series.name = name;

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
    // labelBullet.label.text = `${Number(t1).toFixed(1)}%`;
    labelBullet.label.text = '{valueX}%'
    labelBullet.label.fill = am4core.color("#fff");

    
  }

  private async getMobileTeamMonitoringNeapComposition(filterDto: FilterDTO): Promise<void> {
    const data = await this.dashboardService.getMobileTeamMonitoringNeapComposition(filterDto).toPromise()
    this.MTMNeapComposition = data?.data?.formfilled ?? []
  }

}





import {Component, Inject, Input, NgZone, OnInit, PLATFORM_ID} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import * as am4charts from "@amcharts/amcharts4/charts";
import {DashboardService} from "../../../shared/services/DashboardService/DashboardService";
import {isPlatformBrowser} from "@angular/common";
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import {FilterDTO} from "../../filterDto";

@Component({
  selector: 'app-house-hold-cluster-vaccinatedand-un-vaccinated-age-wise',
  templateUrl: './house-hold-cluster-vaccinatedand-un-vaccinated-age-wise.component.html',
  styleUrls: ['./house-hold-cluster-vaccinatedand-un-vaccinated-age-wise.component.scss']
})
export class HouseHoldClusterVaccinatedandUnVaccinatedAgeWiseComponent implements OnInit {

  public HHCVaccinatedAgeWise: any[] = []
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
       
      await this.getHouseHoldClusterVaccinatedandUnVaccinatedAgeWise(filterDto)
      this.generateChart()
    }))
  }

  private generateChart(){


    this.browserOnly(() => {

        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        const chart = am4core.create("chartdivhhc1", am4charts.XYChart);

        // Add data
        chart.data = this.HHCVaccinatedAgeWise.map(ttm => {
          return {
            category: ttm.name,
            value1: ttm.zeroto11Mvaccinated,
            value2: ttm.zeroto11Munvaccinated,
            value3: ttm.eleventto59vaccinated,
            value4: ttm.eleventto59unvaccinated,
            value5: ttm.eleventto59MChecked,
            value6: ttm.zeroto11MChecked

          }
        })
    
       
        const tempFirstData = chart.data

      // Calculate %
    
      const parallelPercentages1: number[] = chart.data.map(c => {
        return c.value6
      })

      const parallelPercentages2: number[] = chart.data.map(c => {
        return c.value5
      })

       
      const tempData = chart.data.map((mobileTeamMonitoring, i) => {
        return {
          category: mobileTeamMonitoring.category,

          value1: ((mobileTeamMonitoring.value1 / parallelPercentages1[i]) * 100).toFixed(0),
          value2: ((mobileTeamMonitoring.value2 / parallelPercentages1[i]) * 100).toFixed(0),
          value3: ((mobileTeamMonitoring.value3 / parallelPercentages2[i]) * 100).toFixed(0),
          value4: ((mobileTeamMonitoring.value4 / parallelPercentages2[i]) * 100).toFixed(0),
    
        }
      })

   

      chart.data = chart.data.map((mobileTeamMonitoring, i) => {
        return {
          category: mobileTeamMonitoring.category,
          // f: tempFirstData[i],
          [`value1`]: ((mobileTeamMonitoring.value1 / parallelPercentages1[i]) * 100).toFixed(0),
          [`value2`]: ((mobileTeamMonitoring.value2 / parallelPercentages1[i]) * 100).toFixed(0),
          [`value3`]: ((mobileTeamMonitoring.value3 / parallelPercentages2[i]) * 100).toFixed(0),
          [`value4`]: ((mobileTeamMonitoring.value4 / parallelPercentages2[i]) * 100).toFixed(0),
       

          // category: mobileTeamMonitoring.category,
          // value1: 100,
          // value2: 100,

        }
      })

      // var cellSize = 100;
      // chart.events.on("datavalidated", function(ev) {
        
      //   // Get objects of interest
      //   var chart = ev.target;
      //   var categoryAxis = chart.yAxes.getIndex(0);
        
      //   // Calculate how we need to adjust chart height
      //   var adjustHeight = chart.data.length * cellSize - categoryAxis.pixelHeight;
      
      //   // get current chart height
      //   var targetHeight = chart.pixelHeight + adjustHeight;
      
      //   // Set it on chart's container
      //   chart.svgContainer.htmlElement.style.height = targetHeight + "px";
      // });
      
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

        this.createSeries("value1", "0-11 Month Vaccinated", chart, tempData[0].value1, this.findByKey(tempFirstData, ['value1', 'category']), tempFirstData.length);
        this.createSeries("value2", "0-11 Month Un-Vaccinated", chart, tempData[0].value2, this.findByKey(tempFirstData, ['value2', 'category']), tempFirstData.length);
        this.createSeries("value3", "12-59 Month Vaccinated", chart, tempData[0].value3, this.findByKey(tempFirstData, ['value3', 'category']), tempFirstData.length);
        this.createSeries("value4", "12-59 Month Un-Vaccinated", chart, tempData[0].value4, this.findByKey(tempFirstData, ['value4', 'category']), tempFirstData.length);
       
// Legend

        let label = chart.chartAndLegendContainer.createChild(am4core.Label);
        label.text = "Vaccinated & Not-Vaccinated Age Wise";
        label.align = "center";
        label.fontWeight = 'bold'
        label.marginTop = 10
        label.marginBottom=10
        label.truncate = true;
        chart.legend = new am4charts.Legend();
        // chart.legend.maxHeight = 80;
        // chart.legend.scrollable = true;
        // chart.legend.maxWidth = 50;

        chart.legend.align = 'center';
        chart.maskBullets = false;
      

        this.chart = chart
      }
    )
  }
  async ngAfterViewInit(): Promise<void> {

    //await this.getHouseHoldClusterVaccinatedandUnVaccinatedAgeWise()

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
  }

  private async getHouseHoldClusterVaccinatedandUnVaccinatedAgeWise(filterDto:FilterDTO): Promise<void> {
    const data = await this.dashboardService.getHouseHoldClusterVaccinatedandUnVaccinatedAgeWise(filterDto).toPromise()
    this.HHCVaccinatedAgeWise = data?.data?.formfilled ?? []
  }

}

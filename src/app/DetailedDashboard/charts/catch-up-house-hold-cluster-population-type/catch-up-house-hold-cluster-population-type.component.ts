import {AfterViewInit, Component, Inject, Input, NgZone, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import * as am4charts from "@amcharts/amcharts4/charts";
import {DashboardService} from "../../../shared/services/DashboardService/DashboardService";
import {isPlatformBrowser} from "@angular/common";
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import {FilterDTO} from "../../filterDto";

@Component({
  selector: 'app-catch-up-house-hold-cluster-population-type',
  templateUrl: './catch-up-house-hold-cluster-population-type.component.html',
})
export class CatchUpHouseHoldClusterPopulationTypeComponent implements OnInit , AfterViewInit ,OnDestroy{

  public CatchUpClusterData: any[] = []
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
       
      await this.getCatchUpHouseHoldClusterPopulationType(filterDto)
      this.generateChart()
    }))
  }

  private generateChart() {
  

    this.browserOnly(() => {

        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        const chart = am4core.create("catchUpDiv1", am4charts.XYChart);

        const cityWise: any[] = []
        this.CatchUpClusterData.forEach(rcd => {
          if (cityWise.find(cw => cw.name === rcd.name)) {
            return
          }

          const cityGrouped = this.CatchUpClusterData.filter(a => a.name === rcd.name)
          const hrmpObject = cityGrouped.find(a => a.populationType === 'HRMP')
          const nonHrmpObject = cityGrouped.find(a => a.populationType === 'Non-HRMP')

          
          cityWise.push({
            name: rcd.name,
            totalHRMP: hrmpObject?.total ?? 0,
            totalNonHRMP: nonHrmpObject?.total ?? 0,
          })
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
        chart.data = cityWise

        // Create axes
        const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "name";
        categoryAxis.renderer.grid.template.location = 0;


        const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.inside = true;
        valueAxis.renderer.labels.template.disabled = true;
        valueAxis.min = 0;

// Create series

        this.createSeries("totalHRMP", "Total HRMP", chart);
        this.createSeries("totalNonHRMP", "Total Non HRMP", chart);
       
// Legend

        let label = chart.chartAndLegendContainer.createChild(am4core.Label);
        label.text = "Population";
        label.align = "center";
        label.fontWeight = 'bold'
        label.marginTop = 10
        label.marginBottom = 10
        label.truncate = true;
        chart.legend = new am4charts.Legend();
        chart.maskBullets = false;

        this.chart = chart
      }
    )
  }

  async ngAfterViewInit(): Promise<void> {

    //await this.getHouseHoldClusterPopulationType()
  }

  createSeries(field, name, chart) {

    // Set up series
    const series = chart.series.push(new am4charts.ColumnSeries());
    series.name = name;

    series.dataFields.valueY = field;
    series.dataFields.categoryX = "name";
    series.sequencedInterpolation = true;
    series.customA = name;
    // Make it stacked
    series.stacked = true;

    // Configure columns
    series.columns.template.width = am4core.percent(60);
    series.columns.template.tooltipText = "[bold]{name}[/]\n[font-size:14px]{customA}: {valueY}";

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

  private async getCatchUpHouseHoldClusterPopulationType(filterDto: FilterDTO): Promise<void> {
    const data = await this.dashboardService.getCatchUpHouseHoldClusterPopulationType(filterDto).toPromise()
    this.CatchUpClusterData = data?.data?.formfilled ?? []

  }


}

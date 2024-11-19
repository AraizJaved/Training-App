import {AfterViewInit, Component, Inject, NgZone, OnDestroy, OnInit, PLATFORM_ID} from "@angular/core";
import {DashboardService} from "../../shared/services/DashboardService/DashboardService";
import {Subscription} from "rxjs";

// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import {isPlatformBrowser} from "@angular/common";
import {FilterDTO} from "../filterDto";

@Component({
  selector: 'app-dashboard-charts',
  templateUrl: './dashboard-charts.component.html',
  styleUrls: ['./dashboard-charts.component.scss'],
})
export class DashboardChartsComponent implements OnInit, OnDestroy, AfterViewInit {
  public registerComplianceData: any[] = []
  public isLoading: boolean
  filterDto: FilterDTO = new FilterDTO();
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

  }

  async ngAfterViewInit(): Promise<void> {
    await this.getRegisterCompliance()
    this.browserOnly(() => {
        am4core.useTheme(am4themes_animated);

        const chart = am4core.create('chartdiv', am4charts.XYChart);

        // chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

        chart.data = this.registerComplianceData.map(rcd => {
          return {
            category: rcd.name,
            value1: rcd.total,
            value2: rcd.totalRegistered
          }
        })

        const cityWise: any[] = []
        this.registerComplianceData.forEach(rcd => {
          if (cityWise.find(cw => cw.name === rcd.name)) {
            return
          }

          const cityGrouped = this.registerComplianceData.filter(a => a.name === rcd.name)
          const aicObject = cityGrouped.find(a => a.designation === 'AIC')
          const ucmoObject = cityGrouped.find(a => a.designation === 'UCMO')
          cityWise.push({
            name: rcd.name,
            totalAIC: aicObject.total,
            registeredAIC: aicObject.totalRegistered,
            totalUCMO: ucmoObject.total,
            registeredUCMO: ucmoObject.totalRegistered
          })
        })
   
        chart.data = cityWise

        const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "name";
        // categoryAxis.title.text = "Register Compliance";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 20;
        categoryAxis.renderer.cellStartLocation = 0.1;
        categoryAxis.renderer.cellEndLocation = 0.9;

        const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.min = 0;
        valueAxis.title.text = "Expenditure (M)";

        DashboardChartsComponent.createSeries("totalAIC", "Total AIC", true, chart);
        DashboardChartsComponent.createSeries("registeredAIC", "Registered AIC", true, chart);
        DashboardChartsComponent.createSeries("totalUCMO", "Total UCMO", false, chart);
        DashboardChartsComponent.createSeries("registeredUCMO", "Registered UCMO", true, chart);

        chart.legend = new am4charts.Legend();
        chart.scrollbarX = new am4core.Scrollbar();

        chart.legend.paddingTop = 40

        this.chart = chart
      }
    )
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
    this.browserOnly(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

  private async getRegisterCompliance(): Promise<void> {
    const data = await this.dashboardService.getRegisterCompliance(this.filterDto).toPromise()
    this.registerComplianceData = data?.data?.formfilled ?? []
  }

  private static createSeries(field, name, stacked, chart) {
    const series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = field;
    series.dataFields.categoryX = "name";
    series.name = name;
    series.customA = name;
    // series.columns.template.tooltipText = "{name}: [bold]{valueY}[/]";
    series.columns.template.tooltipText = "[bold][font-size:14px] {customA}: {valueY}";
    // Add label
    const labelBullet = series.bullets.push(new am4charts.LabelBullet());
    labelBullet.label.text = "[bold][background-color: white, font-size: 10px]{valueY}";
    labelBullet.locationY = 0.5;
    labelBullet.label.fill = am4core.color("#fff");
    labelBullet.label.hideOversized = true;
    series.stacked = stacked;
    series.columns.template.width = am4core.percent(95);
  }
}

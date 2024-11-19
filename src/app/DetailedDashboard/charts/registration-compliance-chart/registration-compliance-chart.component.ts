import {AfterViewInit, Component, Inject, Input, NgZone, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import * as am4charts from "@amcharts/amcharts4/charts";
import {DashboardService} from "../../../shared/services/DashboardService/DashboardService";
import {isPlatformBrowser} from "@angular/common";
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import {FilterDTO} from "../../filterDto";

@Component({
  selector: 'app-registration-compliance-chart',
  templateUrl: './registration-compliance-chart.component.html',
  styleUrls: ['./registration-compliance-chart.component.scss']
})
export class RegistrationComplianceChartComponent implements OnInit, OnDestroy, AfterViewInit {

  public registerComplianceData: any[] = []
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
debugger

    this.subs.add(this.filterDto.subscribe(async (filterDto: FilterDTO) => {
       
      await this.getRegisterCompliance(filterDto)
      this.generateChart()
    }))

  }

  async ngAfterViewInit(): Promise<void> {
    // await this.getRegisterCompliance()
  }

  private generateChart(): void {

    this.browserOnly(() => {
        am4core.useTheme(am4themes_animated);

        const chart = am4core.create('chartdiv', am4charts.XYChart);

        chart.responsive.enabled = true;

        // chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
        debugger
        chart.data = this.registerComplianceData.map(rcd => {
          return {
            category: rcd.name,
            value1: rcd.total,
            value2: rcd.totalRegistered
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


        const cityWise: any[] = []
        this.registerComplianceData.forEach(rcd => {

          if (cityWise.find(cw => cw.name === rcd.name)) {
            return
          }

          debugger

          const cityGrouped = this.registerComplianceData.filter(a => a.name === rcd.name)
          const aicObject = cityGrouped.find(a => a.designation === 'AIC')
          const ucmoObject = cityGrouped.find(a => a.designation === 'UCMO')

          debugger
          
          cityWise.push({
            name: rcd.name,
            totalAIC: aicObject?.total ?? 0,
            registeredAIC: aicObject?.totalRegistered ?? 0,
            totalUCMO: ucmoObject?.total ?? 0,
            registeredUCMO: ucmoObject?.totalRegistered ?? 0
          })
        })
        
     
        chart.data = cityWise

        const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "name";
        categoryAxis.title.text ="Registration Compliance UCMO & AIC Wise";
        categoryAxis.title.fontWeight = 'bold'
        categoryAxis.title.paddingTop = 30
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 20;
        categoryAxis.renderer.cellStartLocation = 0.1;
        categoryAxis.renderer.cellEndLocation = 0.9;
        const label = categoryAxis.renderer.labels.template;
        // label.maxWidth = 200
        label.truncate = true;
        label.tooltipText = "{name}";

        // categoryAxis.events.on("sizechanged", function (ev) {
        //   let axis = ev.target;
        //   let cellWidth = axis.pixelWidth / (axis.endIndex - axis.startIndex);
        //   axis.renderer.labels.template.maxWidth = cellWidth;
        // });


        // categoryAxis.events.on("startendchanged", function (ev) {
        //   let axis = ev.target;
        //   let cellWidth = axis.pixelWidth / (axis.endIndex - axis.startIndex);
        //   axis.renderer.labels.template.maxWidth = cellWidth;
        // });

        const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.labels.template.disabled = true;
        valueAxis.min = 0;
        //valueAxis.title.text = "Expenditure (M)";

        RegistrationComplianceChartComponent.createSeries("totalAIC", "Total AIC", true, chart);
        RegistrationComplianceChartComponent.createSeries("registeredAIC", "Registered AIC", true, chart);
        RegistrationComplianceChartComponent.createSeries("totalUCMO", "Total UCMO", false, chart);
        RegistrationComplianceChartComponent.createSeries("registeredUCMO", "Registered UCMO", true, chart);

        chart.legend = new am4charts.Legend();
       // chart.scrollbarX = new am4core.Scrollbar();
        chart.legend.paddingTop = 20

        // chart.exporting.menu = new am4core.ExportMenu();

        // chart.exporting.menu.defaultStyles = true
        // chart.exporting.menu.align = "left";
        // chart.exporting.menu.verticalAlign = "top";
       
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

  private async getRegisterCompliance(filterDto: FilterDTO): Promise<void> {
debugger
    const data = await this.dashboardService.getRegisterCompliance(filterDto).toPromise()
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
    labelBullet.label.text = "[bold][background-color: white, font-size: 13px]{valueY}";
    labelBullet.locationY = 0.5;
    labelBullet.label.fill = am4core.color("#fff");
    labelBullet.label.hideOversized = true;
    series.stacked = stacked;
    series.columns.template.width = am4core.percent(95);
  }
}

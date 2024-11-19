import {AfterViewInit, Component, Inject, Input, NgZone, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {FilterDTO} from "../../filterDto";
import * as am4charts from "@amcharts/amcharts4/charts";
import {DashboardService} from "../../../shared/services/DashboardService/DashboardService";
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_spiritedaway from "@amcharts/amcharts4/themes/spiritedaway";
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'app-fsm-fixed-site-monitoring-functional-sia',
  templateUrl: './fsm-fixed-site-monitoring-functional-sia.component.html',
  styleUrls: ['./fsm-fixed-site-monitoring-functional-sia.component.scss']
})
export class FsmFixedSiteMonitoringFunctionalSiaComponent implements OnInit, OnDestroy, AfterViewInit {


  public fixedSiteMonitoringFunctionalData: any[] = []
  public isLoading: boolean
  @Input() filterDto: Observable<FilterDTO>
  private chart: am4charts.PieChart
  private subs: Subscription = new Subscription()

  constructor(
    private readonly dashboardService: DashboardService,
    @Inject(PLATFORM_ID) private platformId,
    private ngZone: NgZone
  ) {
  }

  ngOnInit(): void {
    this.subs.add(this.filterDto.subscribe(async (filterDto: FilterDTO) => {
       
      await this.getFSMFixedSiteMonitoringFunctionalSIAFixedSite(filterDto)
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
    // Themes begin
    am4core.useTheme(am4themes_spiritedaway);
    // Themes end

    // Create chart instance
    const chart = am4core.create("fsmchartdivsia", am4charts.PieChart);
    chart.responsive.enabled = true;

    // Add data
    chart.data = this.fixedSiteMonitoringFunctionalData

    // Set inner radius
    chart.innerRadius = am4core.percent(20);

    chart.legend = new am4charts.Legend()
    // chart.legend.labels.template.text = "Series: [bold {color}]{name}[/]";
    chart.legend.labels.template.text = "['']{name}[/]";
    //chart.title.text = "Registration Compliance Designation Wise";

    // Add and configure Series
    const pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "total";
    pieSeries.dataFields.category = "name";
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;

// This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;

    pieSeries.ticks.template.disabled = true;
    pieSeries.alignLabels = false;
    // pieSeries.labels.template.text = "{value.percent.formatNumber('#.0')}%";
    pieSeries.labels.template.text = "{value}";
    pieSeries.labels.template.radius = am4core.percent(-45);
    pieSeries.labels.template.fill = am4core.color("white");

    let label = chart.chartAndLegendContainer.createChild(am4core.Label);
    label.text = "Fixed Site Monitoring Functional SIA ";
    label.align = "center";
    label.fontWeight = 'bold'
    label.marginTop = 15

    this.chart = chart
  }

  async ngAfterViewInit(): Promise<void> {
    //await this.getFixedSiteMonitoringFunctionalSIAFixedSite()

  }

  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.ngZone.runOutsideAngular(() => {
        f()
      })
    }
  }

  private async getFSMFixedSiteMonitoringFunctionalSIAFixedSite(filterDto : FilterDTO): Promise<void> {
    const data = await this.dashboardService.getFSMFixedSiteMonitoringFunctionalSIAFixedSite(filterDto).toPromise()

    this.fixedSiteMonitoringFunctionalData = data?.data?.formfilled ?? []
   
  }


}

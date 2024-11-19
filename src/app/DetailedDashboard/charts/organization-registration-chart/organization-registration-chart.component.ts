import {AfterViewInit, Component, Inject, Input, NgZone, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {DashboardService} from "../../../shared/services/DashboardService/DashboardService";
import {isPlatformBrowser} from "@angular/common";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_dataviz from "@amcharts/amcharts4/themes/dataviz";
import {FilterDTO} from "../../filterDto";

@Component({
  selector: 'app-organization-registration-chart',
  templateUrl: './organization-registration-chart.component.html',
  styleUrls: ['./organization-registration-chart.component.scss']
})
export class OrganizationRegistrationChartComponent implements OnInit, OnDestroy, AfterViewInit {

  public organizationRegistrationData: any[] = []
  public isLoading: boolean
  @Input() filterDto: Observable<FilterDTO>
  private chart: am4charts.PieChart
  private subs: Subscription = new Subscription()

  constructor(private readonly dashboardService: DashboardService,
              @Inject(PLATFORM_ID) private platformId,
              private ngZone: NgZone) {
  }

  ngOnInit(): void {
    this.subs.add(this.filterDto.subscribe(async (filterDto: FilterDTO) => {
       
      await this.getOrganizationRegistrationData(filterDto)
      this.generateChart()
    }))
  }

  private generateChart(){
    // Themes begin
    am4core.useTheme(am4themes_dataviz);
    // Themes end
    const chart = am4core.create("chartdivaa", am4charts.PieChart);
    
    // Create chart instance
    
    chart.responsive.enabled = true;
   
    // Add data
    chart.data = this.organizationRegistrationData
    
    // Set inner radius
    chart.innerRadius = am4core.percent(50);

    chart.legend = new am4charts.Legend()
    chart.legend.valueLabels.template.disabled = true;
    // chart.legend.labels.template.text = "Series: [bold {color}]{name}[/]";
    chart.legend.labels.template.text = "['']{name}[/]";
    //chart.title.text = "Registration Compliance Designation Wise";
  
    // Add and configure Series
    const pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "total";
    pieSeries.dataFields.category = "organizationName";
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;
    pieSeries.colors.list = [
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
// This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;

    pieSeries.ticks.template.disabled = true;
    pieSeries.alignLabels = false;
    // pieSeries.labels.template.text = "{value.percent.formatNumber('#.0')}%";
    pieSeries.labels.template.text = "{value}";
    pieSeries.labels.template.radius = am4core.percent(-15);
    pieSeries.labels.template.fill = am4core.color("white");

    let label = chart.chartAndLegendContainer.createChild(am4core.Label);
    label.text = "Organization wise Compliance";
    label.align = "center";
    label.fontWeight = 'bold'
    label.marginTop = 15
   
    this.chart = chart

  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
    this.browserOnly(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

  async ngAfterViewInit(): Promise<void> {
    //await this.getOrganizationRegistrationData()
  }

  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.ngZone.runOutsideAngular(() => {
        f()
      })
    }
  }

  private async getOrganizationRegistrationData(filterDto :FilterDTO): Promise<void> {
    const data = await this.dashboardService.getRegistrationOrganizationWise(filterDto).toPromise()
    this.organizationRegistrationData = data?.data?.formfilled ?? []
  }

}

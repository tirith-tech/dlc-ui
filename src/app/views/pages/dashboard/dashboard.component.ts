import { Component, OnInit } from '@angular/core';

import { ApexAxisChartSeries, ApexGrid, ApexChart, ApexXAxis, ApexYAxis, ApexMarkers, ApexStroke, ApexLegend, ApexResponsive, ApexTooltip, ApexFill, ApexDataLabels, ApexPlotOptions, ApexTitleSubtitle, ApexTheme } from 'ng-apexcharts';

import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

import { DataService, DataSource, Publication, RPoint, PubKey } from 'src/app/data.service';

export type apexChartOptions = {
  series: ApexAxisChartSeries;
  colors: string[];
  grid: ApexGrid;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  markers: ApexMarkers,
  stroke: ApexStroke,
  legend: ApexLegend,
  responsive: ApexResponsive[],
  tooltip: ApexTooltip,
  fill: ApexFill
  dataLabels: ApexDataLabels,
  plotOptions: ApexPlotOptions,
  labels: string[],
  title: ApexTitleSubtitle,
  theme: ApexTheme
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  preserveWhitespaces: true
})
export class DashboardComponent implements OnInit {

  /**
   * Apex chart
   */
  public apexChartOptions: Partial<apexChartOptions>;

  /**
   * NgbDatepicker
   */
  pubDate: NgbDateStruct;
  rPointDate: NgbDateStruct;
  lastPublicationDate: NgbDateStruct;

  dataSources: DataSource[];
  public publications = {};
  public rPoints = {};
  public collapsed = {};
  public pubKey: string;

  constructor(
    private calendar: NgbCalendar,
    private dataService: DataService
  ) {
    /**
     * ApexChart options
     */
    this.apexChartOptions = {
      chart: {
        type: "line",
        height: 200,
        toolbar: {
          show: true
        }
      },
      stroke: {
        width: 2,
        curve: "smooth"
      },
      markers: {
        size: 0
      },
      grid: {
        borderColor: "rgba(77, 138, 240, .1)",
        padding: {
          bottom: -10
        }
      },
      xaxis: {
        type: 'datetime',
        labels: {
          style: {
            colors: '#686868',
            fontSize: '13px',
            fontFamily: 'Overpass, sans-serif',
            fontWeight: 400,
          },
        },
        axisBorder: {
          show: false
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: '#686868',
            fontSize: '11px',
            fontFamily: 'Overpass, sans-serif',
            fontWeight: 400,
          },
        },
      },
      colors: ["#727cf5"],
      tooltip: {
        fixed: {
          enabled: !1
        },
        x: {
          show: !1
        },
        y: {
          title: {
            formatter: function(e) {
              return ""
            }
          }
        },
        marker: {
          show: !1
        }
      },
      theme: {
        mode: 'dark'
      }
    };
  }

  ngOnInit(): void {
    this.pubDate = this.calendar.getToday();
    this.rPointDate = this.calendar.getToday();
    this.lastPublicationDate = this.pubDate;

    this.dataService
      .getDataSources()
      .subscribe((data: DataSource[]) => {
        console.log(data);
        this.dataSources = data;
        for (let i = 0; i < data.length; i++) {
          this.publications[i] = null;
          this.rPoints[i] = null;
        }
      });

    this.dataService
      .getPubKey()
      .subscribe((data: PubKey) => {
        console.log(data);
        this.pubKey = data.Key;
      })

  }

  timestampFromDate(date: NgbDateStruct) {
    return new Date(date.year, date.month - 1, date.day).getTime()/1000;
  }

  ngbDateFromTimestamp(ts: number) {
    var date = new Date(ts * 1000);
    return { day: date.getUTCDay(), month: date.getUTCMonth(), year: date.getUTCFullYear()};
  }

  getPublication(name: string, id: number) {
    this.dataService
      .getPublicationByNameAndTimestamp(name, this.timestampFromDate(this.pubDate))
      .subscribe((data: Publication) => {
        this.publications[id] = data;
      })
   }

  getRPoint(id: number) {
    this.dataService
      .getRPoint(id + 1, this.timestampFromDate(this.rPointDate))
      .subscribe((data: RPoint) => {
        this.rPoints[id] = data;
      })
  }

}

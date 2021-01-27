import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApexAxisChartSeries } from 'ng-apexcharts';

export interface Publication {
  value: number;
  signature: string;
  timestamp: number;
  name: string;
}

export interface DataSource {
  name: string;
  description: string;
  id: number;
  currentValue: number;
  series: ApexAxisChartSeries;
}

export interface RPoint {
  R: string;
}

export interface PubKey {
  Key: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private REST_API_SERVER = "http://api.tirith.io/api";

  constructor(private httpClient: HttpClient) { }

  public getPublications(pair: string): Observable<Publication[]> {
    return this.httpClient.get<Publication[]>(
      this.REST_API_SERVER + '/publications/tradepair/' + pair,
      {responseType: 'json'}
    );
  }

  public getDataSources(): Observable<DataSource[]> {
    return this.httpClient.get<DataSource[]>(
      this.REST_API_SERVER + '/datasources',
      {responseType: 'json'}
    );
  }
  
  public getPublicationByNameAndTimestamp(pair: string, timestamp: number): Observable<Publication> {
    return this.httpClient.get<Publication>(
      this.REST_API_SERVER + '/pub/tradepair/' + pair + '/' + timestamp,
      {responseType: 'json'}
    );
  }

  public getRPoint(id: number, timestamp: number): Observable<RPoint> {
    return this.httpClient.get<RPoint>(
      this.REST_API_SERVER + '/rpoint/' + id + '/' + timestamp,
      {responseType: 'json'}
    )
  }

  public getPubKey() {
    return this.httpClient.get<PubKey>(
      this.REST_API_SERVER + '/pubkey',
      {responseType: 'json'}
    )
  }
}

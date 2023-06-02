import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { GridConfiguration } from '../models/grid-configuration';
import { environment } from 'src/environments/environment';
import { ServiceResponse } from '../core/service-response';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GridConfigurationService {
  private url = 'GridConfiguration';

  private activeConfigurationSubject =
    new BehaviorSubject<GridConfiguration | null>(null);
  $activeConfiguration = this.activeConfigurationSubject.asObservable();

  constructor(private http: HttpClient) {}

  public getGridConfiguration(): Observable<ServiceResponse> {
    return this.http.get<ServiceResponse>(`${environment.apiUrl}/${this.url}`);
  }

  public deleteGridConfiguration(name: string) {
    return this.http.delete<ServiceResponse>(
      `${environment.apiUrl}/${this.url}/${name}`
    );
  }

  public createGridConfiguration(grid: GridConfiguration) {
    return this.http
      .post<ServiceResponse>(`${environment.apiUrl}/${this.url}`, grid)
      .subscribe((response) => {
        console.log(response);
      });
  }

  public setActiveConfiguration(configuration: GridConfiguration) {
    this.activeConfigurationSubject.next(configuration);
  }
}

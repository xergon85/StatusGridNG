import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { GridConfiguration } from '../models/grid-configuration';
import { environment } from 'src/environments/environment';
import { ServiceResponse } from '../core/service-response';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GridConfigurationService {
  private url = 'GridConfiguration';

  private activeConfigurationSubject =
    new BehaviorSubject<GridConfiguration | null>(null);
  $activeConfiguration = this.activeConfigurationSubject.asObservable();

  private configurationsSubject = new BehaviorSubject<GridConfiguration[]>([]);
  $configurations = this.configurationsSubject.asObservable();

  constructor(private http: HttpClient) {}

  public getGridConfigurations(): Observable<ServiceResponse> {
    return this.http
      .get<ServiceResponse>(`${environment.apiUrl}/${this.url}`)
      .pipe(
        tap((response) => {
          this.configurationsSubject.next(response.data as GridConfiguration[]);
        })
      );
  }

  public deleteGridConfiguration(name: string) {
    return this.http
      .delete<ServiceResponse>(`${environment.apiUrl}/${this.url}/${name}`)
      .pipe(
        tap((response) => {
          this.configurationsSubject.next(response.data as GridConfiguration[]);
        })
      );
  }

  public createGridConfiguration(grid: GridConfiguration) {
    return this.http
      .post<ServiceResponse>(`${environment.apiUrl}/${this.url}`, grid)
      .subscribe((response) => {
        this.configurationsSubject.next(response.data as GridConfiguration[]);
      });
  }

  public setActiveConfiguration(name: string) {
    let configuration = this.configurationsSubject.value.find(
      (conf) => conf.name === name
    );
    if (!configuration) {
      console.error(`Configuration with name ${name} not found.`);
      return;
    }

    return this.http
      .get<ServiceResponse>(`${environment.apiUrl}/${this.url}/${name}`)
      .subscribe((response) => {
        this.activeConfigurationSubject.next(
          response.data as GridConfiguration
        );
      });
  }
}

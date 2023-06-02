import { Component } from '@angular/core';
import { GridConfiguration } from 'src/app/models/grid-configuration';
import { ServiceResponse } from 'src/app/core/service-response';
import { GridConfigurationService } from 'src/app/services/grid-configuration.service';

@Component({
  selector: 'configuration-list',
  templateUrl: './configuration-list.component.html',
  styleUrls: ['./configuration-list.component.css'],
})
export class ConfigurationListComponent {
  title = 'StatusGridNG';
  configurations: GridConfiguration[] = [];

  constructor(private gridConfigurationService: GridConfigurationService) {}

  ngOnInit(): void {
    this.gridConfigurationService
      .getGridConfiguration()
      .subscribe((result: ServiceResponse) => {
        this.configurations = result.data as GridConfiguration[];
        console.log(result);
      });
  }

  deleteConfiguration(name: string) {
    this.gridConfigurationService
      .deleteGridConfiguration(name)
      .subscribe((result: ServiceResponse) => {
        this.configurations = result.data as GridConfiguration[];
      });
  }
  activateConfiguration(name: string) {
    let config = this.configurations.find((conf) => conf.name === name);
    if (!config) {
      console.error(`Configuration with name ${name} not found.`);
      return;
    }
    this.gridConfigurationService.setActiveConfiguration(config);
  }
}

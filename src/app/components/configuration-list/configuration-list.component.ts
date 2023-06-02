import { Component, OnDestroy, OnInit } from '@angular/core';
import { GridConfiguration } from 'src/app/models/grid-configuration';
import { ServiceResponse } from 'src/app/core/service-response';
import { GridConfigurationService } from 'src/app/services/grid-configuration.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'configuration-list',
  templateUrl: './configuration-list.component.html',
  styleUrls: ['./configuration-list.component.css'],
})
export class ConfigurationListComponent implements OnInit, OnDestroy {
  title = 'StatusGridNG';
  private subscription: Subscription = new Subscription();
  configurations: GridConfiguration[] = [];

  constructor(private gridConfigurationService: GridConfigurationService) {}

  ngOnInit(): void {
    this.subscription = this.gridConfigurationService.$configurations.subscribe(
      (configurations) => {
        this.configurations = configurations;
        console.log(
          'ConfigurationListComponent.ngOnInit(), configurations: ',
          configurations
        );
      }
    );

    this.gridConfigurationService.getGridConfigurations().subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  deleteConfiguration(name: string) {
    this.gridConfigurationService.deleteGridConfiguration(name).subscribe();
  }

  activateConfiguration(name: string) {
    this.gridConfigurationService.setActiveConfiguration(name);
  }
}

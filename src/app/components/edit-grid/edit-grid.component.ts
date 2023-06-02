import { Component, OnDestroy, OnInit } from '@angular/core';
import { GridConfiguration } from 'src/app/models/grid-configuration';
import { GridStatus } from 'src/app/models/grid-status';
import { GridConfigurationService } from 'src/app/services/grid-configuration.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'edit-grid',
  templateUrl: './edit-grid.component.html',
  styleUrls: ['./edit-grid.component.css'],
})
export class EditGridComponent implements OnInit, OnDestroy {
  title = 'StatusGridNG';
  grid: GridStatus[][] = [];
  private subscription: Subscription = new Subscription();

  // create two dimentional grid 6x6 to store grid-statuses

  constructor(private service: GridConfigurationService) {
    const width = 6;
    const height = 6;

    // initialize grid
    for (let i = 0; i < width; i++) {
      this.grid[i] = [];
      for (let j = 0; j < height; j++) {
        this.grid[i][j] = new GridStatus();
        this.grid[i][j].x = j;
        this.grid[i][j].y = i;
      }
    }
  }

  ngOnInit(): void {
    this.subscription = this.service.$activeConfiguration.subscribe(
      (config) => {
        if (!config) {
          return;
        }
        this.loadGrid(config);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSubmit(form: NgForm) {
    var gridConfiguration = new GridConfiguration(
      form.value.name,
      this.grid.flat()
    );

    this.service.createGridConfiguration(gridConfiguration);

    // save grid to database
    console.log(gridConfiguration);
  }

  loadGrid(config: GridConfiguration) {
    config.statuses.forEach((status) => {
      this.grid[status.y][status.x] = status;
    });
  }
}

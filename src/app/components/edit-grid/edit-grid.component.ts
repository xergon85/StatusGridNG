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
  name: string = '';
  private subscription: Subscription = new Subscription();

  constructor(private service: GridConfigurationService) {
    this.initializeGrid();
    this.name = '';
  }

  ngOnInit(): void {
    this.subscription = this.service.$activeConfiguration.subscribe(
      (config) => {
        if (!config) {
          console.log('EditGridComponent.ngOnInit(), no active configuration');
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
    var gridConfiguration = new GridConfiguration(this.name, this.grid.flat());

    this.service.createGridConfiguration(gridConfiguration);

    this.initializeGrid();
    this.name = '';
  }

  initializeGrid() {
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

  loadGrid(config: GridConfiguration) {
    console.log('EditGridComponent.loadGrid(), config: ', config);
    config.statuses.forEach((status) => {
      this.grid[status.y][status.x] = status;
    });
    this.name = config.name;
  }

  getGridElements(): GridStatus[] {
    return this.grid.flat();
  }
}

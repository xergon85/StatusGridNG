import { Component, OnInit } from '@angular/core';
import { GridConfiguration } from './models/grid-configuration';
import { GridConfigurationService } from './services/grid-configuration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'StatusGridNG';

  constructor(private gridConfigurationService: GridConfigurationService) {}

  ngOnInit(): void {}
}

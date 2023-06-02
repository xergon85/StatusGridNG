import { GridStatus } from './grid-status';

export class GridConfiguration {
  id?: number;
  name: string = '';
  statuses: GridStatus[] = [];

  constructor(name: string, statuses: GridStatus[]) {
    this.name = name;
    this.statuses = statuses;
  }
}

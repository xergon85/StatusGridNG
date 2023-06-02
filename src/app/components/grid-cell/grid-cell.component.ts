import { Component, Input } from '@angular/core';
import { StatusCode } from 'src/app/core/status-code';
import { GridStatus } from 'src/app/models/grid-status';

@Component({
  selector: 'grid-cell',
  templateUrl: './grid-cell.component.html',
  styleUrls: ['./grid-cell.component.css'],
})
export class GridCellComponent {
  @Input('gridStatus') gridStatus: GridStatus = new GridStatus();

  nextStatus() {
    switch (this.gridStatus.statusCode) {
      case StatusCode.Untouched:
        this.gridStatus.statusCode = StatusCode.Ok;
        break;
      case StatusCode.Ok:
        this.gridStatus.statusCode = StatusCode.Error;
        break;
      case StatusCode.Error:
        this.gridStatus.statusCode = StatusCode.Untouched;
        break;
      default:
        break;
    }

    console.log('GridCellComponent.nextStatus()');
  }

  getStatusClass(): string {
    let cell = 'grid-cell-';
    switch (this.gridStatus.statusCode) {
      case StatusCode.Untouched:
        return cell + 'untouched';
      case StatusCode.Ok:
        return cell + 'ok';
      case StatusCode.Error:
        return cell + 'error';
      default:
        return '';
    }
  }
}

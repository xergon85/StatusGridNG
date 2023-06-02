import { StatusCode } from './status-code';

export class GridStatus {
  id?: number;
  x: number = 0;
  y: number = 0;
  statusCode: StatusCode = StatusCode.Untouched;
}

import { GridConfiguration } from '../models/grid-configuration';

export interface ServiceResponse {
  data: GridConfiguration[] | GridConfiguration;
  message: string;
  success: boolean;
}

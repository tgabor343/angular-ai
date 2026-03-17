export * from './authentication.service';
import { AuthenticationService } from './authentication.service';
export * from './items.service';
import { ItemsService } from './items.service';
export const APIS = [AuthenticationService, ItemsService];

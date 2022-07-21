import { BehaviorSubject } from 'rxjs';

import { Org } from './models';

export class AppState {
  static readonly org$ = new BehaviorSubject<Org | null>(null);
}

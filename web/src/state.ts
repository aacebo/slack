import { BehaviorSubject } from 'rxjs';

import { SlackSettings } from '../../settings';
import { Channel, Org } from './models';

export class AppState {
  static readonly org$ = new BehaviorSubject<Org | null>(null);
  static readonly channels$ = new BehaviorSubject<Channel[]>([ ]);
  static readonly settings$ = new BehaviorSubject<SlackSettings | null>(null);
}

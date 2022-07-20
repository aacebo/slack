import { BehaviorSubject } from 'rxjs';

export class ContextService {
  static readonly context$ = new BehaviorSubject<any>({ });
}

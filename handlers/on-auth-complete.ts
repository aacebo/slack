import { InstallURLOptions } from '@slack/oauth';
import { IncomingMessage, ServerResponse } from 'http';

import { getCookie } from '../utils';

export function onAuthComplete() {
  return async (options: InstallURLOptions, req: IncomingMessage, _res: ServerResponse) => {
    options.metadata = getCookie('orgId', req.headers.cookie);
    return true;
  };
}

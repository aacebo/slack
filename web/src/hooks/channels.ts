import { useEffect, useState } from 'react';

import { AppState } from '../state';

export function useChannels() {
  const [value] = useState(AppState.channels$.value);

  useEffect(() => {
    window.Kustomer.command.run(
      'slack.app.slack--get-team-channels',
      { body: { } },
      (_err: Error | null, res: any) => {
        if (res.responseBody) {
          AppState.channels$.next(res.responseBody.channels);
        }
      });
  }, []);

  return value;
}

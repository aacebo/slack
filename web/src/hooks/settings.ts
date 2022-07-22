import { useEffect, useState } from 'react';

import { AppState } from '../state';

export function useSettings() {
  const [value, setValue] = useState(AppState.settings$.value);

  useEffect(() => {
    window.Kustomer.command.run(
      'slack.app.slack--get-settings',
      { body: { } },
      (_err: Error | null, res: any) => {
        if (res.responseBody) {
          AppState.settings$.next(res.responseBody);
        }
      });
  }, []);

  useEffect(() => {
    window.Kustomer.command.run(
      'slack.app.slack--set-settings',
      { body: { } },
      (err: Error | null, res: any) => {
        if (err) throw err;

        AppState.settings$.next(value);
      });
  }, [value]);

  return { value, setValue };
}

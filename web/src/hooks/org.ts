import { useEffect, useState } from 'react';

import { AppState } from '../state';

export function useOrg() {
  const [value, setValue] = useState(AppState.org$.value);

  useEffect(() => {
    window.Kustomer.request({
      method: 'get',
      url: '/v1/orgs/current'
    }, (err: Error | null, data: any) => {
      if (err) throw err;

      setValue({
        id: data.id,
        ...data.attributes
      });
    });
  }, []);

  useEffect(() => {
    AppState.org$.next(value);
  }, [value]);

  return { value, setValue };
}

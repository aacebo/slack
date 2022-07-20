import { useEffect, useState } from 'react';

import { ContextService } from '../services';

export function useContext() {
  const [value, setValue] = useState(ContextService.context$.value);

  useEffect(() => {
    ContextService.context$.next(value);
  }, [value]);

  return { value, setValue };
};

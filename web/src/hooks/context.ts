import { useState } from 'react';

export function useContext(ctx?: any) {
  const [value, setValue] = useState(ctx);
  return { value, setValue };
};

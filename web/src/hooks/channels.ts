import { useEffect, useState } from 'react';

export function useChannels() {
  const [value] = useState([ ]);

  useEffect(() => {
    window.Kustomer.command.run(
      'slack.app.slack--get-team-channels',
      { body: null },
      (_err: Error | null, res: any) => {
        console.log(res);
      });
  }, []);

  return value;
}

import { Event, KApp } from '@kustomer/apps-server-sdk';

export function onConversationUpdate(app: KApp) {
  return async (e: Event<any>) => {
    app.log.info(JSON.stringify(e, undefined, 2));
  };
}

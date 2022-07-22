import { KApp } from '@kustomer/apps-server-sdk';
import { App as SApp } from '@slack/bolt';

import { SlackAuthStore } from '../auth-store';
import { SlackSettings } from '../settings';

export function onSetSettings(kapp: KApp, sapp: SApp, auth: SlackAuthStore) {
  return async (orgId: string, _userId: string, data: SlackSettings) => {
    const session = auth.get(orgId);

    if (!session || !session.bot) {
      return kapp.log.warn('auth session not found, sign in to your slack workplace');
    }

    if (data.default.channelId) {
      try {
        await sapp.client.conversations.join({
          token: session.bot.token,
          channel: data.default.channelId
        });
      } catch (err) {
        kapp.log.error(err);
      }
    }

    return kapp.in(orgId).settings.set(data);
  };
}

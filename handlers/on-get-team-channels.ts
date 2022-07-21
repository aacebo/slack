import { App as SApp } from '@slack/bolt';

import { SlackAuthStore } from '../auth-store';

export function onGetTeamChannels(sapp: SApp, auth: SlackAuthStore) {
  return async (orgId: string) => {
    const session = auth.get(orgId);

    if (!session || !session.bot) return;

    return sapp.client.conversations.list({ token: session.bot.token });
  };
}

import { Conversation, Event, KApp } from '@kustomer/apps-server-sdk';
import { App as SApp } from '@slack/bolt';

import { SlackAuthStore } from '../auth-store';
import { SlackSettings } from '../settings';

export function onConversationUpdate(
  kapp: KApp<SlackSettings>,
  _sapp: SApp,
  auth: SlackAuthStore
) {
  return async (e: Event<Conversation>) => {
    if (!e.data.attributes.lastMessageIn) return;

    kapp.log.info(e.data.attributes.lastMessageIn);

    const settings = await kapp.in(e.orgId).settings.get();

    if (!settings) return;

    const session = auth.get(settings.teamId);

    if (!session) return;

    // await sapp.client.chat.postMessage({
    //   channel: settings.channelId,
    //   text:
    // });
  };
}

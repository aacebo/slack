import { Conversation, Event, KApp } from '@kustomer/apps-server-sdk';
import { App as SApp } from '@slack/bolt';

import { SlackAuthStore } from '../auth-store';
import { SlackSettings } from '../settings';

export function onConversationUpdate(
  kapp: KApp<SlackSettings>,
  sapp: SApp,
  auth: SlackAuthStore
) {
  return async (e: Event<Conversation>) => {
    if (!e.data.attributes.lastMessageIn) return;

    const message = await kapp.in(e.orgId).messages.getById(
      e.data.attributes.lastMessageIn.id
    );

    if (!message) return;

    const settings = await kapp.in(e.orgId).settings.get();

    if (!settings) return;

    const session = auth.get(settings.teamId);

    if (!session) return;

    await sapp.client.chat.postMessage({
      channel: settings.channelId,
      text: message.preview
    });
  };
}

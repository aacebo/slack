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
    if (!e.data.attributes.lastMessageIn) {
      return kapp.log.info('ignoring due to lack of lastMessageIn');
    }

    const message = await kapp.in(e.orgId).messages.getById(
      e.data.attributes.lastMessageIn.id
    );

    if (!message) {
      return kapp.log.warn('message not found');
    }

    const session = auth.get(e.orgId);

    if (!session || !session.bot) {
      return kapp.log.warn('auth session not found, sign in to your slack workplace');
    }

    const settings = await kapp.in(e.orgId).settings.get();

    if (!settings || !settings.default?.channelId) {
      return kapp.log.warn('a channel has not been selected in app settings');
    }

    kapp.log.info(await sapp.client.chat.postMessage({
      token: session.bot.token,
      channel: settings.default.channelId,
      text: message.preview
    }));
  };
}

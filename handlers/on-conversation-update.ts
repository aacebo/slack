import { Conversation, Event, KApp } from '@kustomer/apps-server-sdk';
import { App as SApp } from '@slack/bolt';

import { SlackAuthStore } from '../auth-store';
import { SlackSettings } from '../settings';

const MESSAGES_SENT: { [id: string]: boolean | undefined; } = { };

export function onConversationUpdate(
  kapp: KApp<SlackSettings>,
  sapp: SApp,
  auth: SlackAuthStore
) {
  return async (e: Event<Conversation>) => {
    kapp.log.info('inbound conversation.update event');
    kapp.log.info(JSON.stringify(e.data.relationships, undefined, 2));

    if (!e.data.attributes.lastMessageIn) {
      return kapp.log.info('ignoring due to lack of lastMessageIn');
    }

    if (MESSAGES_SENT[e.data.attributes.lastMessageIn.id]) {
      return kapp.log.warn('message already sent, ignoring');
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

    kapp.log.info('sending message to slack...');

    try {
      await sapp.client.chat.postMessage({
        token: session.bot.token,
        channel: settings.default.channelId,
        text: message.preview,
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `*Status:* ${e.data.attributes.status}`
            },
            accessory: {
              type: 'button',
              url: `https://aacebo.helpsimply.com/app/customers/${e.data.relationships?.customer?.data?.id}`,
              text: {
                type: 'plain_text',
                text: 'View',
                emoji: true
              }
            }
          }
        ]
      });

      MESSAGES_SENT[message.id] = true;
      kapp.log.info('complete');
    } catch (err) {
      kapp.log.error(err);
    }
  };
}

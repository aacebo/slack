import 'dotenv/config';
import { KApp } from '@kustomer/apps-server-sdk';
import { App as SApp, ExpressReceiver } from '@slack/bolt';
import { InstallProvider } from '@slack/oauth';
import fs from 'fs';
import path from 'path';
import express from 'express';

import pkg from './package.json';
import changelog from './changelog.json';
import { SlackSettings } from './settings';
import { SlackAuthStore } from './auth-store';
import * as handlers from './handlers';

if (!process.env.BASE_URL) {
  throw new Error('baseUrl is required');
}

if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET) {
  throw new Error('clientId and clientSecret are required');
}

if (!process.env.SLACK_CLIENT_ID || !process.env.SLACK_CLIENT_SECRET || !process.env.SLACK_SIGNING_SECRET) {
  throw new Error('slack must be properly configured');
}

const port = +(process.env.PORT || 3000);
const authStore = new SlackAuthStore();
const receiver = new ExpressReceiver({
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  installationStore: authStore,
  stateSecret: 'my-state-secret',
  scopes: [
    'channels:read',
    'chat:write',
    'groups:read',
    'im:read',
    'mpim:read'
  ]
});

const installer = new InstallProvider({
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  stateSecret: 'my-state-secret'
});

const sapp = new SApp({ receiver});
const kapp = new KApp<SlackSettings>({
  app: pkg.name,
  version: pkg.version,
  title: 'Slack',
  visibility: 'public',
  description: fs.readFileSync(path.join(__dirname, 'description.md')).toString(),
  dependencies: [],
  default: false,
  system: false,
  url: process.env.BASE_URL,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  iconUrl: `${process.env.BASE_URL}/assets/icon.png`,
  env: 'qa',
  changelog,
  roles: [
    'org.user.customer.read',
    'org.user.customer.write',
    'org.user.message.read',
    'org.permission.customer.read',
    'org.permission.customer.create',
    'org.permission.customer.update',
    'org.permission.message.read'
  ],
  appDetails: {
    appDeveloper: {
      name: 'Kustomer',
      website: 'https://kustomer.com',
      supportEmail: 'support@kustomer.com',
    },
    externalPlatform: {
      name: 'Slack',
      website: 'https://slack.com',
    },
  },
  screenshots: [],
  settings: {
    default: {
      teamId: {
        type: 'string',
        hidden: false,
        defaultValue: '',
        description: 'the slack organization you belong to',
        required: false
      },
      channelId: {
        type: 'string',
        hidden: false,
        defaultValue: '',
        description: 'the slack channel where notifications will be sent',
        required: false
      }
    }
  }
});

kapp.useCustomSettings('Slack', '', '/web/build');
kapp.on('conversation', 'update', handlers.onConversationUpdate(kapp, sapp, authStore));
kapp.onCommand('get-settings', handlers.onGetSettings(kapp));
kapp.onCommand('set-settings', handlers.onSetSettings(kapp));
kapp.onCommand('get-team-channels', handlers.onGetTeamChannels(sapp, authStore));
kapp.onAuth(handlers.onSlackInstall(installer));
kapp.app.use(receiver.app);
kapp.app.use(
  '/views',
  express.static(path.join(process.cwd(), '/web/build'))
);

(async () => {
  try {
    await kapp.start(port, process.env.NODE_ENV === 'local');

    // kapp.log.info(await kapp.in('aacebo').getToken());
  } catch (err) {
    kapp.log.error(JSON.stringify(err, undefined, 2));
  }
})();

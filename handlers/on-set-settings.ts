import { KApp } from '@kustomer/apps-server-sdk';
import { SlackSettings } from '../settings';

export function onSetSettings(kapp: KApp) {
  return (orgId: string, _userId: string, data: SlackSettings) => {
    return kapp.in(orgId).settings.set(data);
  };
}

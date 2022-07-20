import { KApp } from '@kustomer/apps-server-sdk';

export function onGetSettings(kapp: KApp) {
  return (orgId: string, _userId: string) => {
    return kapp.in(orgId).settings.get();
  };
}

import { Installation, InstallationQuery, InstallationStore } from '@slack/oauth';

export class SlackAuthStore implements InstallationStore {
  private readonly _orgInstalls: { [orgId: string]: Installation; } = { };
  private readonly _teamInstalls: { [teamId: string]: Installation; } = { };

  has(orgId: string) {
    return !!this._orgInstalls[orgId];
  }

  get(orgId: string) {
    return this._orgInstalls[orgId];
  }

  async storeInstallation<AuthVersion extends 'v1' | 'v2'>(install: Installation<AuthVersion, boolean>) {
    console.log(install);

    if (install.metadata) {
      this._orgInstalls[install.metadata] = install;
    }

    if (install.team) {
      this._teamInstalls[install.team.id] = install;
    }
  }

  async fetchInstallation(query: InstallationQuery<boolean>) {
    if (query.teamId && this._teamInstalls[query.teamId]) {
      return this._teamInstalls[query.teamId];
    }

    throw new Error('install not found');
  }

  async deleteInstallation(query: InstallationQuery<boolean>) {
    if (query.teamId && this._teamInstalls[query.teamId]) {
      delete this._teamInstalls[query.teamId];
    }
  }
}

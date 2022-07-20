import { Installation, InstallationQuery, InstallationStore } from '@slack/oauth';

export class SlackAuthStore implements InstallationStore {
  private readonly _installs: { [teamId: string]: Installation; } = { };

  has(teamId: string) {
    return !!this._installs[teamId];
  }

  get(teamId: string) {
    return this._installs[teamId];
  }

  async storeInstallation<AuthVersion extends 'v1' | 'v2'>(install: Installation<AuthVersion, boolean>) {
    console.log(install);

    if (install.team) {
      this._installs[install.team.id] = install;
    }
  }

  async fetchInstallation(query: InstallationQuery<boolean>) {
    if (query.teamId && this._installs[query.teamId]) {
      return this._installs[query.teamId];
    }

    throw new Error('install not found');
  }

  async deleteInstallation(query: InstallationQuery<boolean>) {
    if (query.teamId && this._installs[query.teamId]) {
      delete this._installs[query.teamId];
    }
  }
}

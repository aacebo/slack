import { BadRequestError } from '@kustomer/apps-server-sdk';
import { InstallProvider } from '@slack/oauth';
import express from 'express';

export function onSlackInstall(installer: InstallProvider) {
  return async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (!req.query.orgId) {
      return next(new BadRequestError('orgId is required'));
    }

    res.redirect(await installer.generateInstallUrl({
      metadata: req.query.orgId.toString(),
      scopes: [
        'channels:read',
        'chat:write',
        'groups:read',
        'im:read',
        'mpim:read'
      ]
    }));
  };
}

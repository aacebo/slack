import { BadRequestError } from '@kustomer/apps-server-sdk';
import { InstallProvider, InstallURLOptions } from '@slack/oauth';
import express from 'express';

export function onAuth(installer: InstallProvider) {
  return async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (!req.query.orgId) {
      return next(new BadRequestError('orgId is required'));
    }

    const options: InstallURLOptions = {
      metadata: req.query.orgId.toString(),
      redirectUri: `${process.env.BASE_URL}/auth/redirect`,
      scopes: [
        'channels:read',
        'chat:write',
        'groups:read',
        'im:read',
        'mpim:read'
      ]
    };

    res.setHeader('x-kustomer-org-id', req.query.orgId.toString());
    const url = await installer.generateInstallUrl(options, false);

    res.redirect(url);
  };
}

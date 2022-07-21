import { BadRequestError } from '@kustomer/apps-server-sdk';
import { InstallProvider, InstallURLOptions } from '@slack/oauth';
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

    const options: InstallURLOptions = {
      metadata: req.query.orgId.toString(),
      redirectUri: `${process.env.BASE_URL}/slack/oauth_redirect?orgId=${req.query.orgId}`,
      scopes: [
        'channels:read',
        'chat:write',
        'groups:read',
        'im:read',
        'mpim:read'
      ]
    };

    // const state = await installer.stateStore?.generateStateParam(options, new Date());
    const url = await installer.generateInstallUrl(options);

    res.redirect(url);
  };
}

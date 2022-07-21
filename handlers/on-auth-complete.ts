import { InstallProvider } from '@slack/oauth';
import express from 'express';

export function onAuthComplete(installer: InstallProvider) {
  return async (
    req: express.Request,
    res: express.Response
  ) => {
    await installer.handleCallback(req, res);
  };
}

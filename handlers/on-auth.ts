import { IncomingMessage, ServerResponse } from 'http';
import url from 'url';

export function onAuth() {
  return async (req: IncomingMessage, res: ServerResponse) => {
    if (!req.url) return false;

    const query = url.parse(req.url, true).query;

    if (!query.orgId) return false;

    res.setHeader('Set-Cookie', [`orgId=${query.orgId}; Secure; HttpOnly; Path=/; Max-Age=600`]);
    return true;
  };
}

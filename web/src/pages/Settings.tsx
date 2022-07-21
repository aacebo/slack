import { Button } from '@mui/material';

import { useChannels, useOrg } from '../hooks';

export default function Settings() {
  useChannels();
  const org = useOrg();
  const url = new URL(process.env.PUBLIC_URL);

  if (!org) {
    return <></>;
  }

  return (
    <Button
      variant='contained'
      onClick={() => {
        window.Kustomer.showModal({
          type: 'redirect',
          content: {
            title: 'INSTALL IN SLACK',
            iconUrl: `${url.protocol}//${url.host}/assets/icon.png`,
            description: 'You will need to go to Slack and install the Kustomer app.\nClick "Install In Slack" below.',
            primaryDataKt: 'goToSlack',
            secondaryDataKt: 'cancelAddSlack',
            showCancelButton: true,
            actionButton: {
              text: 'Install In Slack',
              linkUrl: `${url.protocol}//${url.host}/slack/install?orgId=${org?.id}`,
            }
          }
        }, () => {

        });
      }}
    >
      <img
        src={`${url.protocol}//${url.host}/assets/icon.png`}
        width='20px'
        style={{ marginRight: '5px' }}
      />
      Install In Slack
    </Button>
  );
}

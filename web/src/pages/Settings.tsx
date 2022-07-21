import { Button } from '@mui/material';

import { useOrg } from '../hooks';

export default function Settings() {
  const org = useOrg();
  const url = new URL(process.env.PUBLIC_URL);

  if (!org.value) {
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
            description: 'You will need to go to Slack and install the Kustomer app.\nClick Go to Slack below.',
            primaryDataKt: 'goToSlack',
            secondaryDataKt: 'cancelAddSlack',
            showCancelButton: true,
            actionButton: {
              text: 'Install In Slack',
              linkUrl: `${url.protocol}//${url.host}/auth?orgId=${org.value?.id}`,
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

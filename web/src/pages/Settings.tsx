import { Button } from '@mui/material';

import { useContext } from '../hooks';

export default function Settings() {
  const ctx = useContext();
  const url = new URL(process.env.PUBLIC_URL);

  return (
    <Button
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
              linkUrl: `${url.protocol}//${url.host}/auth?orgId=`,
            }
          }
        }, () => {

        });
      }}
    >
      <img src={`${url.protocol}//${url.host}/assets/icon.png`} />
      Install In Slack
    </Button>
  );
}

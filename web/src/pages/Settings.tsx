import { Button } from '@mui/material';

import { useContext } from '../hooks';

export default function Settings() {
  const ctx = useContext();
  const url = new URL(process.env.PUBLIC_URL);

  console.log(ctx.value);

  return (
    <Button
      onClick={() => {
        window.Kustomer.showModal({
          type: 'redirect',
          content: {
            title: 'ADD STORE',
            iconUrl: `${url.protocol}//${url.host}/assets/icon2.png`,
            description: 'You will need to go to Shopify to add a store.\nClick Go to Shopify below.',
            primaryDataKt: 'goToShopify',
            secondaryDataKt: 'cancelAddStore',
            showCancelButton: true,
            actionButton: {
              text: 'Go to Shopify',
              linkUrl: `${url.protocol}//${url.host}/auth?orgId=`,
            },
            alertTagText: 'To connect a new store, make sure you sign out of all other stores in Shopify.',
            alertTagType: 'warning',
          }
        }, () => {

        });
      }}
    >
      <img src='assets/icon.png' />
      Add To Slack
    </Button>
  );
}

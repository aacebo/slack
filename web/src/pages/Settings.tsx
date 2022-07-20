import { Button } from '@mui/material';

export default function Settings() {
  return (
    <Button
      onClick={() => {
        window.location.href = `${process.env.BASE_URL}/install?orgId=`;
      }}
    >
      <img src={`${process.env.BASE_URL}/assets/icon.png`} />
      Add To Slack
    </Button>
  );
}

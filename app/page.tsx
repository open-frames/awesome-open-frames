import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';

const frameMetadata = getFrameMetadata({
  buttons: [
      {label: 'Click to unlock', action: 'post_redirect'}
  ],
  image: 'https://redirect-frame.vercel.app/video.png',
  post_url: 'https://redirect-frame.vercel.app/api/frame',
});

export const metadata: Metadata = {
  title: 'Redirect frame',
  description: 'LFG',
  openGraph: {
    title: 'Redirect frame',
    description: 'LFG',
    images: ['https://redirect-frame.vercel.app/video.png'],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <img src={'/video.png'}/>
    </>
  );
}

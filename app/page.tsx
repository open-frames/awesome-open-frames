import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';

const frameMetadata = getFrameMetadata({
  buttons: ['Click to unlock'],
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
    'fc:frame:button:1:action': 'post_redirect',
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

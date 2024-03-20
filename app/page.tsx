import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'Read more',
      action: 'post_redirect',
      target: `${NEXT_PUBLIC_URL}/api/frame/action1`,
    },
    {
      label: 'Go to bounty',
      action: 'post_redirect',
      target: `${NEXT_PUBLIC_URL}/api/frame/action2`,
    },
  ],
  image: `${NEXT_PUBLIC_URL}/picture2.png`,
});

export const metadata: Metadata = {
  title: 'Awesome Open Frame',
  description: 'Interoperable Frames',
  openGraph: {
    title: 'Awesome Open Frame',
    description: 'Interoperable Frames',
    images: [`${NEXT_PUBLIC_URL}/picture2.png`],
  },
  other: {
    ...frameMetadata,
    'of:accepts:xmtp': '2024-02-01',
  },
};

export default function Page() {
  return (
    <>
      <img src={'/picture2.png'} />
    </>
  );
}

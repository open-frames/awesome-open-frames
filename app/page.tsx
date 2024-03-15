import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';

const frameMetadata = getFrameMetadata({
  buttons: [
      {label: 'Go to bounty', action: 'post_redirect'}
  ],
  image: 'https://awesome-open-frames.vercel.app/picture.png',
  post_url: 'https://awesome-open-frames.vercel.app/api/frame',
});

export const metadata: Metadata = {
  title: 'Awesome Open Frame',
  description: 'Interoperable Frames',
  openGraph: {
    title: 'Awesome Open Frame',
    description: 'Interoperable Frames',
    images: ['https://awesome-open-frames.vercel.app/picture.png'],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <img src={'/picture.png'}/>
    </>
  );
}

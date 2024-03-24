import type { Metadata } from 'next';
import { getFrameMetadata } from "./utils/framesUtils";

const frameMetadata = getFrameMetadata({
  buttons: ['Begin quiz'],
  image: 'https://woodwork-main.vercel.app/titleImage.jpg', // must be absolute path
  post_url: 'https://woodwork-main.vercel.app/api/question?n=1',
});

export const metadata: Metadata = {
  title: 'quiz frame',
  description: 'Woodwork Fantasy',
  openGraph: {
    title: 'quiz frame',
    description: 'Woodwork Fantasy',
    images: ['https://woodwork-main.vercel.app/titleImage.jpg']
  },
  other: {
    ...frameMetadata,
  },
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm lg:flex">
          <h1>Woodwork Fantasy</h1>
        </div>
      </div>
    </main>
  );
}

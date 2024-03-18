'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RedirectPage() {
  const router = useRouter();

  useEffect(() => {
    const redirect = 'https://github.com/open-frames/awesome-open-frames/blob/main/BOUNTY.md';
    window.location.href = redirect;
  }, [router]);

  return (
    <div>
      <p>Redirecting...</p>
    </div>
  );
}

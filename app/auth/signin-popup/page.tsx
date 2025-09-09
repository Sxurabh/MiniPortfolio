// sxurabh/miniportfolio/MiniPortfolio-ExperimentalBranch/app/auth/signin-popup/page.tsx
"use client";

import React, { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Loader2 } from 'lucide-react';

// This component acts as an intermediary to correctly initiate the NextAuth sign-in flow.
function SignInComponent() {
  const searchParams = useSearchParams();
  const provider = searchParams.get('provider');

  useEffect(() => {
    // When the component mounts, check for a provider in the URL.
    if (provider === 'google' || provider === 'github') {
      // Use the official `signIn` function from NextAuth.js.
      // This handles the CSRF token and POST request correctly,
      // ensuring a direct redirect to the OAuth provider.
      signIn(provider, {
        callbackUrl: '/auth-popup-close', // On success, redirect to our closing page.
      });
    }
  }, [provider]);

  // Display a loading message while the redirect happens.
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      fontFamily: 'sans-serif',
      backgroundColor: 'oklch(0.145 0 0)',
      color: 'oklch(0.985 0 0)'
    }}>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      <Loader2 style={{ width: '2rem', height: '2rem', animation: 'spin 1s linear infinite' }} />
      <p style={{ marginTop: '1rem' }}>Redirecting to sign-in...</p>
    </div>
  );
}

// Wrap the component in Suspense because `useSearchParams` requires it.
export default function SignInPopupPage() {
  return (
    <Suspense>
      <SignInComponent />
    </Suspense>
  );
}